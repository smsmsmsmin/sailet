import React from "react";
import Logo from "../../assets/logo.png";
import "./style.css";

const LogoInfoSet = () => {
  return (
    <div className="foot">
      <div className="notice">
        <p>앱이 설치되지 않은 경우</p>
        <p>플레이스토어 또는 앱스토어로 이동합니다.</p>
      </div>
      <img className="icon" src={Logo} />
    </div>
  );
};

export default LogoInfoSet;
