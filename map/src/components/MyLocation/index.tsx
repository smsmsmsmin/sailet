import React, { useCallback, useContext, useEffect, useState } from "react";
import { MapContext } from "../KakaoMap";
import Marker from "../Marker";
import { gpsMarker } from "../SelectMarker";

const { kakao } = window;

const MyLocation = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const map: any = useContext(MapContext);
  const handleEvent = useCallback(
    (event: { data: string }) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "myLocation":
          if (data.data.lat !== 0 && data.data.lng !== 0) {
            setLocation({ lat: data.data.lat, lng: data.data.lng });
            map.setCenter(new kakao.maps.LatLng(data.data.lat, data.data.lng));
          }
          break;
      }
    },
    [map]
  );

  useEffect(() => {
    document.addEventListener(
      "message",
      (event: any) => handleEvent(event),
      false
    );
    window.addEventListener(
      "message",
      (event: any) => handleEvent(event),
      false
    );
    return () => {
      document.removeEventListener(
        "message",
        (event: any) => handleEvent(event),
        false
      );
      window.removeEventListener(
        "message",
        (event: any) => handleEvent(event),
        false
      );
    };
  }, [map, handleEvent]);

  return <Marker lat={location.lat} lng={location.lng} image={gpsMarker} />;
};

export default MyLocation;
