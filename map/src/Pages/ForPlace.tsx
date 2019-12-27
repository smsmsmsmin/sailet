import React from "react";
import KakaoMap from "../components/KakaoMap";
import Marker from "../components/Marker";
import {
  badMarker,
  unknownMarker,
  goodMarker
} from "../components/SelectMarker";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  lat: string;
  lng: string;
  status: "good" | "unknown" | "bad";
}

const ForPlace = (props: RouteComponentProps<MatchParams>) => {
  const { lat, lng, status } = props.match.params;
  const markerSelector = {
    good: goodMarker,
    unknown: unknownMarker,
    bad: badMarker
  };

  return (
    <KakaoMap
      lat={Number(lat)}
      lng={Number(lng)}
      level={3}
      height="100vh"
      disableControl={true}
      disableZoom={true}
    >
      <Marker
        lat={Number(lat)}
        lng={Number(lng)}
        image={markerSelector[status]}
      />
    </KakaoMap>
  );
};

export default ForPlace;
