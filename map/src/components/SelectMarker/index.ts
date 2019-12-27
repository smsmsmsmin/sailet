/* eslint-disable import/prefer-default-export */

const { kakao } = window;

interface IMarker {
  [key: string]: typeof kakao.maps.MarkerImage;
}

export const goodMarker = new kakao.maps.MarkerImage(
    require('../../assets/marker/good.png'),
    // 'https://cdn.sailet.app/assets/marker/good.png',
    new kakao.maps.Size(50, 80),
    { offset: new kakao.maps.Point(25, 40) },
);

export const unknownMarker = new kakao.maps.MarkerImage(
    require('../../assets/marker/unknown.png'),
    // 'https://cdn.sailet.app/assets/marker/dontknow.png',
    new kakao.maps.Size(50, 80),
    { offset: new kakao.maps.Point(25, 40) },
);

export const badMarker = new kakao.maps.MarkerImage(
    require('../../assets/marker/bad.png'),
    // 'https://cdn.sailet.app/assets/marker/dontknow.png',
    new kakao.maps.Size(50, 80),
  { offset: new kakao.maps.Point(25, 40) },
);

export const gpsMarker = new kakao.maps.MarkerImage(
  'https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_marker.png',
  new kakao.maps.Size(30, 30),
  { offset: new kakao.maps.Point(15, 15) },
);

export const marker: IMarker = {
  bad: badMarker,
  default: unknownMarker,
  dontknow: unknownMarker,
  good: goodMarker,
};

