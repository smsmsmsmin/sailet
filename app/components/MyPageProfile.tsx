import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';

interface IProps {
  name: string;
  email: string;
  profileImage: string;
}

const MyPageProfile = (props: IProps) => {
  const {name, email, profileImage} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 17,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginRight: 17,
        }}>
        <FastImage
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
          source={{uri: profileImage}}
        />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 17}}>
          {name}
        </Text>
        <Text style={{fontFamily: 'SpoqaHanSans-Light', fontSize: 15}}>
          {email}
        </Text>
      </View>
    </View>
  );
};

export default MyPageProfile;
