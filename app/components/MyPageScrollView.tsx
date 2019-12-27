import React from 'react';
import {Animated, ScrollView} from 'react-native';

interface IProps {
  children: React.ReactNode;
  scrollY: Animated.Value;
}

const MyPageScrollView = (props: IProps) => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white', zIndex: 200}}
      scrollEventThrottle={16}
      scrollIndicatorInsets={{right: 1}}
      onScroll={Animated.event([
        {nativeEvent: {contentOffset: {y: props.scrollY}}},
      ])}>
      {props.children}
    </ScrollView>
  );
};

export default MyPageScrollView;
