import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import NaverLogin from 'react-native-ccs-naver-login';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginContainer from '../components/LoginContainer';
import LoginFooter from '../components/LoginFooter';
import LoginHead from '../components/LoginHead';
import LoginButton from '../components/LoginButton';
import LoginNotice from '../components/LoginNotice';
import {ScreenProps} from '../types';

const NAVER_AUTH = gql`
  mutation($token: String!) {
    naverAuth(token: $token) {
      user {
        id
        uniqId
        profileImage
        email
        gender
        age
        name
      }
      token
    }
  }
`;

const Login = (props: ScreenProps) => {
  const [naverAuth] = useMutation(NAVER_AUTH, {
    onCompleted(data) {
      AsyncStorage.setItem('userToken', data.naverAuth.token);
      props.navigation.navigate('App');
    },
    onError() {
      Alert.alert('API에 문제가 발생했습니다.', '관리자에게 문의해주세요.');
    },
  });

  const _naverLogin = () => {
    NaverLogin.login()
      .then((res: {accessToken: string}) => {
        naverAuth({variables: {token: res.accessToken}});
      })
      .catch(() => {
        Alert.alert('로그인에 실패하였습니다.', '다시 시도해주세요.');
      });
  };

  return (
    <LoginContainer>
      <View style={styles.contents}>
        <LoginHead />
        <View>
          <Text style={[styles.text, styles.bold, styles.startText]}>
            시작하기
          </Text>
          <LoginButton onPress={_naverLogin} />
          <LoginNotice />
        </View>
      </View>
      <LoginFooter />
    </LoginContainer>
  );
};

const styles = StyleSheet.create({
  contents: {
    flex: 16,
    padding: 17,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontFamily: 'SpoqaHanSans-Light',
  },
  bold: {
    fontFamily: 'SpoqaHanSans-Bold',
  },
  startText: {
    marginBottom: 24,
  },
});

export default Login;
