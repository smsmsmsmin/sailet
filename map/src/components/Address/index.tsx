import webview from "../../utils/webview";

const { kakao } = window;
const geocoder = new kakao.maps.services.Geocoder();

interface IProps {
  lat: number | null | undefined;
  lng: number | null | undefined;
}

const Address = (props: IProps) => {
  const { lat, lng } = props;
  geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      webview.data(
        "address",
        result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address_name
      );
    }
  });

  return null;
};

export default Address;
