import webview from "../../utils/webview";

const { kakao } = window;

interface IProps {
    lat1: number | null | undefined;
    lng1: number | null | undefined;
    lat2: number | null | undefined;
    lng2: number | null | undefined;
}

const Distance = (props: IProps) => {
    const { lat1, lat2, lng1, lng2 } = props;

    const polyline = new kakao.maps.Polyline({
        map: null,
        path: [
            new kakao.maps.LatLng(lat1, lng1),
            new kakao.maps.LatLng(lat2, lng2)
        ]
    });

    webview.data('distance', polyline.getLength().toFixed(0))

    return null;
};

export default Distance;
