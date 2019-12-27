import {Linking, StyleSheet, Text} from 'react-native';
import React from 'react';

const LoginNotice = () => {
  return (
    <Text style={styles.notice}>
      <Text>회원가입은 로그인과 동시에 진행되며,{'\n'}</Text>
      <Text>
        <Text
          style={styles.noticeR}
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/sailet/03766620ddd5497d9c18bac12a1f3005',
            )
          }>
          이용약관
        </Text>{' '}
        및{' '}
        <Text
          style={styles.noticeR}
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/sailet/097037713d1149e8a14b58d46241043f',
            )
          }>
          개인정보처리방침
        </Text>
        에 동의하는 것으로 간주합니다.
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  notice: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'SpoqaHanSans-Light',
  },
  noticeR: {
    fontFamily: 'SpoqaHanSans-Regular',
    textDecorationLine: 'underline',
  },
  noticeI: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
});

export default LoginNotice;
