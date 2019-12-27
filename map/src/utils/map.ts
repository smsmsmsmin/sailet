const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

interface IUtil {
  getRegionCode(lat: number, lng: number, callback: (result: any[], status: string)=>any): void;
}

const MapUtil: IUtil = {
  getRegionCode(lat, lng, callback){
    geocoder.coord2RegionCode(lat, lng, callback);
  }
}


export default MapUtil;