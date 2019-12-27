import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const Loading = () => (
  <View style={{flex: 1}}>
    <LottieView
      source={require('../assets/Animation/loading.json')}
      autoPlay
      loop
    />
  </View>
);

export default Loading;
