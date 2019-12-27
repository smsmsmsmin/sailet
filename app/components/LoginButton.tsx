import React from 'react';
import Naver from '../assets/Icons/Naver';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const LoginButton = (props: {onPress: any}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Naver style={{width: 20, height: 20}} />
      <Text style={styles.buttonText}>네이버 아이디로 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#1ec800',
    padding: 13,
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: 'SpoqaHanSans-Bold',
    color: 'white',
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
});

export default LoginButton;
