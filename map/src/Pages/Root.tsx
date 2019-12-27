import React from "react";
import KakaoMap from "../components/KakaoMap";
import LoadPlaces from "../components/LoadPlaces";
import MovePlace from "../components/MovePlace";
import MyLocation from "../components/MyLocation";

const Root: React.FC = () => {
  return (
    <>
      <KakaoMap
        lat={37.5662952}
        lng={126.97794509999994}
        level={3}
        maxLevel={3}
        height="100vh"
      >
        <LoadPlaces />
        <MovePlace />
        <MyLocation/>
      </KakaoMap>
    </>
  );
};

export default Root;
