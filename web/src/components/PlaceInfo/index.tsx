import PrintHead from "../PrintHead";
import MarkerSet from "../MarkerSet";
import LogoInfoSet from "../LogoInfoSet";
import PlaceQRCode from "../PlaceQRCode";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./style.css";

const GET_PLACE_INFO = gql`
  query($id: ID!) {
    place(id: $id) {
      id
      name
    }
  }
`;

const PlaceInfo = (props: { id: string; print: boolean }) => {
  const { id, print } = props;
  const { data, loading, error } = useQuery(GET_PLACE_INFO, {
    variables: { id }
  });
  const [uriLoading, setUriLoading] = useState<boolean>(false);

  useEffect(() => {
    if (print && !loading && uriLoading) return window.print();
  }, [loading, uriLoading]);

  useEffect(() => {
    if (error) return alert("에러가 발생했습니다.");
  }, [error]);

  return (
    <>
      <div className="wrap">
        <PrintHead name={data?.place?.name} />
        <MarkerSet />
        <LogoInfoSet />
      </div>
      <div className="wrap black">
        <PlaceQRCode id={id} loading={uriLoading} setLoading={setUriLoading} />
      </div>
    </>
  );
};

export default PlaceInfo;
