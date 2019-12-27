import React from "react";
import { RouteComponentProps } from "react-router";
import Distance from "../components/Distance";
import Address from "../components/Address";

interface MatchParams {
  lat: string;
  lng: string;
  mylat: string;
  mylng: string;
}

const ForPlaceDistance = (props: RouteComponentProps<MatchParams>) => {
  const { lat, lng, mylat, mylng } = props.match.params;
  return (
    <>
      <Address lat={Number(lat)} lng={Number(lng)} />
      <Distance
        lat1={Number(lat)}
        lng1={Number(lng)}
        lat2={Number(mylat)}
        lng2={Number(mylng)}
      />
    </>
  );
};

export default ForPlaceDistance;
