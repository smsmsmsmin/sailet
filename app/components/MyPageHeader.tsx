import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ScreenConfig} from "../types";

interface IProps {
  name: string;
  scrollY: Animated.Value;
  headerProps: ScreenConfig;
  freeze?: boolean;
  share?: boolean;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
}

const MyPageHeader = (props: IProps) => {
  const {name, scrollY, headerProps, freeze} = props;

  const HEADER_MIN_HEIGHT = 50;
  const HEADER_MAX_HEIGHT = 130;

  const headOpacity = scrollY.interpolate({
    inputRange: [30, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const borderColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['#ffffff', '#f0f0f0'],
    extrapolate: 'clamp',
  });

  const styles = StyleSheet.create({
    sav: {
      backgroundColor: 'white',
    },
    wrapper: {
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      borderBottomWidth: 1,
    },
    leftButtonWrap: {
      paddingLeft: 17,
      zIndex: 1,
      justifyContent: 'center',
    },
    rightButtonWrap: {
      paddingRight: 17,
      zIndex: 1,
      justifyContent: 'center',
    },
    leftButtonText: {
      fontSize: 30,
      fontFamily: 'SpoqaHanSans-Regular',
    },
    rightButtonText: {
      fontSize: 17,
      fontFamily: 'SpoqaHanSans-Regular',
    },
    centerTextWrap: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 17,
    },
    centerText: {
      fontFamily: 'SpoqaHanSans-Bold',
      fontSize: 19,
      color: 'black',
    },
  });

  return (
    <SafeAreaView style={styles.sav}>
      <Animated.View style={[styles.wrapper, {borderBottomColor: borderColor}]}>
        <TouchableOpacity
          onPress={() => headerProps.navigation.goBack('')}
          style={styles.leftButtonWrap}>
          <Text style={styles.leftButtonText}>&#xE000;</Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.centerTextWrap, {opacity: freeze ? 1 : headOpacity}]}>
          <Animated.Text style={[styles.centerText, {bottom: 0}]}>
            {name}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default MyPageHeader;
