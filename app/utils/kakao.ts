import axios from 'axios';
import env from '../env.json';

export const searchKeyword = (keyword: string) => {
  return axios.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
    {
      headers: {
        Authorization: `KakaoAK ${env.KakaoAPIKey}`,
      },
    },
  );
};

export const _getAddress = async (lat: number, lng: number) => {
  return await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lat}&y=${lng}`,
    {
      headers: {
        Authorization: `KakaoAK ${env.KakaoAPIKey}`,
      },
    },
  );
};
