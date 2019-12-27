import {StatusBar, View} from 'react-native';
import React from 'react';

const MapContainer = (props: {children: React.ReactNode}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
        }}>
        {props.children}
      </View>
    </>
  );
};

export default MapContainer;
