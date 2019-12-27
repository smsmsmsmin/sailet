import React from "react";
import Good from "../../assets/marker/good.png";
import Unknown from "../../assets/marker/unknown.png";
import Bad from "../../assets/marker/bad.png";
import "./style.css";

const MarkerSet = () => {
  return (
    <div className="body">
      <img className="marker" src={Good} />
      <img className="marker" src={Unknown} />
      <img className="marker" src={Bad} />
    </div>
  );
};

export default MarkerSet;
