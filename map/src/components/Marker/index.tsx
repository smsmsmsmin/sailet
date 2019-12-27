import { useContext, useEffect } from 'react';
import { MapContext } from '../KakaoMap';

const { kakao } = window;

interface IProps {
  lat: number | null | undefined;
  lng: number | null | undefined;
  image?: any;
  onClick?: () => void;
}

const Marker = (props: IProps) => {
  const { lat, lng, image, onClick } = props;
  const map: any = useContext(MapContext);

  const marker = new kakao.maps.Marker({
    map,
    position: new kakao.maps.LatLng(lat, lng), // 마커의 위치
    image,
  });

  kakao.maps.event.addListener(marker, 'click', onClick);

  useEffect(()=>{
    return () => {
      marker.setMap(null);
      kakao.maps.event.removeListener(marker, 'click', onClick);
    };
  });

  return null;
};

export default Marker;
