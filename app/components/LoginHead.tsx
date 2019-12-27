import {StyleSheet, Text} from 'react-native';
import React from 'react';

const LoginHead = () => {
  return (
    <Text style={styles.text}>
      <Text>안전한 화장실{'\n'}</Text>
      <Text>
        <Text style={styles.bold}>SAILET</Text>에{'\n'}
      </Text>
      <Text>오신것을 환영합니다.</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: 'SpoqaHanSans-Light',
  },
  bold: {
    fontFamily: 'SpoqaHanSans-Bold',
  },
});

export default LoginHead;
