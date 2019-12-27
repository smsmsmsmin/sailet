import MarkerSet from "../MarkerSet";
import LogoInfoSet from "../LogoInfoSet";
import QRCodeComp from "../PlaceQRCode";
import React from "react";
import "./style.css";
import RootHead from "../RootHead";
import QRCode from "../QRCode";

const RootInfo = () => {
  return (
    <>
      <div className="wrap">
        <RootHead />
        <MarkerSet />
        <LogoInfoSet />
      </div>
      <div className="wrap black">
        <QRCode uri='https://link.sailet.app/APP'/>
      </div>
    </>
  );
};

export default RootInfo;
