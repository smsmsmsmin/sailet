import {StatusBar, View} from 'react-native';
import LottieView from 'lottie-react-native';
import PlaceDistance from './PlaceDistance';
import React from 'react';
import {IPlace} from '../pages/Place';

interface IProps {
  placeData: IPlace | null | undefined;
  myLocation: {lat: number; lng: number};
  address: string;
  onMessage: (data: any) => void;
}

const PlaceLoading = (props: IProps) => {
  const {placeData, myLocation, address, onMessage} = props;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{flex: 1}}>
        {placeData ? (
          <>
            <LottieView
              source={require('../assets/Animation/loading.json')}
              autoPlay
              loop
            />
            <PlaceDistance
              myLatLng={myLocation}
              placeLatLng={{lat: placeData.lat, lng: placeData.lng}}
              address={address}
              _onMessage={onMessage}
            />
          </>
        ) : null}
      </View>
    </>
  );
};

export default PlaceLoading;
