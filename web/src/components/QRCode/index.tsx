import React from "react";
import QRCodeModule from "qrcode.react";
import "./style.css";

interface IProps {
  uri: string;
}

const QRCode = (props: IProps) => {
  return (
    <div className="qrcode">
      <QRCodeModule value={props.uri} size={450} />
    </div>
  );
};

export default QRCode;
