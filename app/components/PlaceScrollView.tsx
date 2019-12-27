import React from 'react';
import {Animated, ScrollView, View} from 'react-native';

interface IProps {
  children: React.ReactNode;
  scrollY: Animated.Value;
}

const PlaceScrollView = (props: IProps) => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'transparent', zIndex: 200}}
      scrollEventThrottle={16}
      scrollIndicatorInsets={{right: 1}}
      onScroll={Animated.event([
        {nativeEvent: {contentOffset: {y: props.scrollY}}},
      ])}>
      <View style={{backgroundColor: '#ebebeb', paddingBottom: 100}}>
        {props.children}
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#ebebeb',
          bottom: '-100%',
        }}
      />
    </ScrollView>
  );
};

export default PlaceScrollView;
