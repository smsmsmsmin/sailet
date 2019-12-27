import 'react-native-gesture-handler';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import webview from '../utils/webview';
import MapHeader from '../components/MapHeader';
import Geolocation from '@react-native-community/geolocation';
import MapContainer from '../components/MapContainer';
import GPSButton from '../components/GPSButton';
import {ScreenConfig, ScreenProps} from '../types';
import {NavigationEventPayload} from 'react-navigation';

const Map = (props: ScreenProps) => {
  const [gpsError, setGpsError] = useState<boolean>(false);
  const WebViewRef = useRef() as RefObject<WebView>;
  const [myLocation, setMyLocation] = useState({lat: 0, lng: 0});

  useEffect(() => {
    props.navigation.setParams({
      isSearch: false,
      searchData: [],
      WebView: WebViewRef,
    });
    props.navigation.addListener(
      'didFocus',
      (payload: NavigationEventPayload) => {
        const data = payload?.state?.params?.goToPlace;
        if (data) {
          webview.goToPlace(WebViewRef, data.x, data.y);
          props.navigation.setParams({goToPlace: null});
        }
      },
    );
  }, []);

  useEffect(() => {
    if (!gpsError) {
      webview.myLocation(WebViewRef, myLocation.lng, myLocation.lat);
    }
  }, [myLocation, gpsError]);

  const _onMessage = (data: WebViewMessageEvent) => {
    const message = JSON.parse(data.nativeEvent.data);
    switch (message.type) {
      case 'page':
        props.navigation.navigate(message.page, {id: message.data});
        break;
    }
  };

  const GetMyLocation = () => {
    Geolocation.getCurrentPosition(
      info =>
        setMyLocation({lat: info.coords.latitude, lng: info.coords.longitude}),
      () => {
        setGpsError(true);
      },
    );
  };

  return (
    <MapContainer>
      <WebView
        ref={WebViewRef}
        source={{uri: 'https://wv.sailet.app/'}}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        javaScriptEnabled={true}
        bounces={false}
        onMessage={_onMessage}
        onLoadEnd={() => setTimeout(GetMyLocation, 300)}
        onError={() =>
          Alert.alert('오류가 발생했습니다.', '다시 시도하시겠습니까?', [
            {
              text: '다시 시도하기',
              onPress: () => WebViewRef.current?.reload(),
            },
          ])
        }
      />
      <GPSButton gpsError={gpsError} getMyLocation={GetMyLocation} />
    </MapContainer>
  );
};

Map.navigationOptions = (screenProps: ScreenConfig) => ({
  header: <MapHeader headerProps={screenProps} />,
});

export default Map;
