import React, {
  createContext,
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from "react";

const { kakao } = window;

interface IProps {
  lat: number;
  lng: number;
  idleChange?: () => void;
  height: string;
  children?: React.ReactNode;
  level: number;
  maxLevel?: number;
  disableControl?: boolean;
  disableZoom?: boolean;
}

// @ts-ignore
export const MapContext = createContext();

const KakaoMap = (props: IProps) => {
  const { lat, lng, idleChange, level, maxLevel, height, children } = props;
  const [map, setMap] = useState<any>();
  const [isMapRender, setIsMapRender] = useState<boolean>(false);
  const MapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const container = MapRef.current;
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: level || 3,
      maxLevel: maxLevel || 9
    };
    const tempMap = new kakao.maps.Map(container, options);
    // tempMap.setCopyrightPosition(
    //   kakao.maps.CopyrightPosition.BOTTOMRIGHT,
    //   true
    // );
    setMap(tempMap);

    if (idleChange !== undefined) {
      kakao.maps.event.addListener(tempMap, "idle", idleChange);
    }
    if (props.disableControl) {
      tempMap.setDraggable(false);
    }
    if (props.disableZoom) {
      tempMap.setZoomable(false);
    }
    setIsMapRender(true);
  }, [
    MapRef,
    idleChange,
    lat,
    level,
    lng,
    maxLevel,
    props.disableControl,
    props.disableZoom
  ]);

  return (
    <MapContext.Provider value={map}>
      {isMapRender ? children : null}
      <div id="map" ref={MapRef} style={{ width: "100%", height }} />
    </MapContext.Provider>
  );
};

export default KakaoMap;
