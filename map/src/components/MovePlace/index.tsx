import { useCallback, useContext, useEffect } from "react";
import { MapContext } from "../KakaoMap";

const { kakao } = window;

const MovePlace = () => {
  const map: any = useContext(MapContext);
  const handleEvent = useCallback(
    (event: { data: string }) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "MoveMapCenter":
          map.setCenter(new kakao.maps.LatLng(data.data.lat, data.data.lng));
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
  return null;
};

export default MovePlace;
