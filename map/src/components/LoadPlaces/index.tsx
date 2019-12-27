import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { MapContext } from "../KakaoMap";
import Marker from "../Marker";
import { marker } from "../SelectMarker";
import webview from "../../utils/webview";
import { unionBy } from "lodash";

const { kakao } = window;

const LOAD_PLACES_QUERY = gql`
  query($swlat: Float!, $swlng: Float!, $nelat: Float!, $nelng: Float!) {
    loadPlaces(swlat: $swlat, swlng: $swlng, nelat: $nelat, nelng: $nelng) {
      id
      lat
      lng
      status
    }
  }
`;

interface IBound {
  swlat: number;
  swlng: number;
  nelat: number;
  nelng: number;
}

const LoadPlaces = () => {
  const map: any = useContext(MapContext);
  const [bounds, setBounds] = useState<IBound>({
    swlat: 0,
    swlng: 0,
    nelat: 0,
    nelng: 0
  });
  const { data } = useQuery(LOAD_PLACES_QUERY, {
    variables: {
      swlat: bounds.swlat,
      swlng: bounds.swlng,
      nelat: bounds.nelat,
      nelng: bounds.nelng
    }
  });

  const [placeData, setPlaceData] = useState([]);

  const handleIdle = useCallback(() => {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    setBounds({
      swlat: swLatLng.getLat(),
      nelat: neLatLng.getLat(),
      swlng: swLatLng.getLng(),
      nelng: neLatLng.getLng()
    });
  }, [map]);

  useEffect(() => {
    handleIdle();

    kakao.maps.event.addListener(map, "idle", handleIdle);

    return () => kakao.maps.event.removeListener(map, "idle", handleIdle);
  }, [handleIdle, map]);

  useEffect(() => {
    if (data) {
      setPlaceData(state => unionBy([...state], data.loadPlaces, "id"));
    }
  }, [data]);

  return (
    <>
      {placeData.map((place: any) => {
        const markerImg = marker[place.status] || marker.default;
        return (
          <Marker
            key={place.id}
            lat={place.lat}
            lng={place.lng}
            image={markerImg}
            onClick={() => {
              webview.place(place.id);
            }}
          />
        );
      })}
    </>
  );
};

export default LoadPlaces;
