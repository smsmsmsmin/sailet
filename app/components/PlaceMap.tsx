import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';
import PlaceContent from './PlaceContent';

interface IPlace {
  lat: number;
  lng: number;
}

interface IProps {
  address: string;
  _movePlace: (x: number, y: number) => void;
  status: string;
  placeLatLng: IPlace;
  myLatLng: IPlace;
}
const PlaceMap = (props: IProps) => {
  const {_movePlace} = props;
  return (
    <>
      <PlaceContent head="위치">
        <Text style={styles.sectionInfo}>{props.address}</Text>
      </PlaceContent>
      <TouchableOpacity
        style={{backgroundColor: 'white', paddingBottom: 17}}
        onPress={() => _movePlace(props.placeLatLng.lng, props.placeLatLng.lat)}
        activeOpacity={1}>
        <WebView
          source={{
            uri: `https://wv.sailet.app/place/${props.status}/${props.placeLatLng.lat}/${props.placeLatLng.lng}`,
          }}
          style={styles.webview}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sectionInfo: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  textMargin: {
    fontSize: 7,
  },
  webview: {
    height: 200,
    zIndex: -100,
    marginLeft: -10,
    marginRight: -10,
  },
});

export default PlaceMap;
