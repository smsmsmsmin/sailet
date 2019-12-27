import React from 'react';
import {Platform, Text, TouchableOpacity} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const MyProfileEditButton = (props: {onPress: () => void}) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: 'black',
          padding: 17,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'SpoqaHanSans-Regular',
            fontSize: 17,
            color: 'white',
          }}>
          정보 수정하기
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </>
  );
};

export default MyProfileEditButton;
