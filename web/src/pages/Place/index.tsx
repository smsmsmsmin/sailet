import React from "react";
import PlaceInfo from "../../components/PlaceInfo";
import { RouteComponentProps } from "react-router";
import "./style.css";

interface MatchParams {
  id: string;
}

const Place = (props: RouteComponentProps<MatchParams>) => {
  const { id } = props.match.params;
  return (
    <div id="place">
      <div className="container">
        <PlaceInfo id={id} print={false} />
      </div>
    </div>
  );
};

export default Place;
