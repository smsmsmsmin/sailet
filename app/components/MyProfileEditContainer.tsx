import {View} from 'react-native';
import React from 'react';

const MyProfileEditContainer = (props: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      {props.children}
    </View>
  );
};

export default MyProfileEditContainer;
