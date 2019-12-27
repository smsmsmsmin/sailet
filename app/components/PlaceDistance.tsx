import React from 'react';
import {StyleSheet} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

interface IPlace {
  lat: number;
  lng: number;
}

interface IProps {
  address: string;
  placeLatLng: IPlace;
  myLatLng: IPlace;
  _onMessage: (data: WebViewMessageEvent) => void;
}

const PlaceDistance = (props: IProps) => {
  const {_onMessage, myLatLng, placeLatLng} = props;
  if (myLatLng && placeLatLng) {
    return (
      <>
        <WebView
          source={{
            uri: `https://wv.sailet.app/distance/${myLatLng.lat}/${myLatLng.lng}/${placeLatLng.lat}/${placeLatLng.lng}`,
          }}
          style={styles.webview}
          onMessage={_onMessage}
        />
      </>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  webview: {
    display: 'none',
  },
});

export default PlaceDistance;
