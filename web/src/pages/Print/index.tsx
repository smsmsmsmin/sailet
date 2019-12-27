import React, { useEffect, useState } from "react";
import "./style.css";
import { RouteComponentProps } from "react-router";
import PlaceInfo from "../../components/PlaceInfo";

interface MatchParams {
  id: string;
}

const Print = (props: RouteComponentProps<MatchParams>) => {
  const { id } = props.match.params;
  return (
    <div id="print">
      <div className="container">
        <PlaceInfo id={id} print={true}/>
      </div>
    </div>
  );
};

export default Print;
