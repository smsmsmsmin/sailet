import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface IProps {
  onPress: (event: GestureResponderEvent) => void;
}

const PlaceAddRequestButton = (props: IProps) => {
  return (
    <View style={{marginTop: 20, padding: 17}}>
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
          등록 요청하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceAddRequestButton;
