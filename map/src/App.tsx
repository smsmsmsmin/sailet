import React, {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import KakaoMap from "./components/KakaoMap";
import Marker from "./components/Marker";
import {goodMarker} from "./components/SelectMarker";
import webview from "./utils/webview";
import LoadPlaces from "./components/LoadPlaces";

const App: React.FC = () => {

  return (
    <KakaoMap
      lat={37.5662952}
      lng={126.97794509999994}
      level={3}
      height="100vh"
    >
      <LoadPlaces/>
      {/*<Marker lat={37.5662952} lng={126.97794509999994} image={goodMarker} onClick={() => webview.place('Login')}/>*/}
    </KakaoMap>
  );
};

export default App;
