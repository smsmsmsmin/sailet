import React, {Dispatch, useEffect, useState} from "react";
import { placeShortLink } from "../../utils/firebase";
import QRCode from "qrcode.react";
import "./style.css";

interface IProps {
  id: string;
  loading: boolean;
  setLoading: Dispatch<any>;
}

const PlaceQRCode = (props: IProps) => {
  const { id, loading, setLoading } = props;
  const [uri, setUri] = useState<string>("");

  const getShortUri = async () => {
    const uri = await placeShortLink(id);
    console.log(uri);
    setLoading(true);
    return setUri(uri);
  };

  useEffect(() => {
    getShortUri();
  }, []);

  return (
    <div className="qrcode">
      {loading ? <QRCode value={uri} size={450} /> : null}
    </div>
  );
};

export default PlaceQRCode;
