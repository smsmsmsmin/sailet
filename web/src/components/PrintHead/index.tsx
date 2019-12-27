import React from "react";
import './style.css';

const PrintHead = ({name} : {name: string}) => {
  return (
    <div className="head">
      <p>
        지금 바로 <span>SAILET</span>에서
      </p>
      <p>
        <span>{name}</span> 화장실이
      </p>
      <p>안전한지 확인해보세요!</p>
    </div>
  );
};

export default PrintHead;
