import {Text, TouchableOpacity, View} from 'react-native';
import SpoqaArrow from './SpoqaArrow';
import React from 'react';
import navigation from '../utils/navigation';

interface IProps {
  label: string;
  content: string;
}

const MyProfileEditRow = (props: IProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      }}
      onPress={() =>
        navigation.navigate('MyProfileEdit', {
          type: props.label,
          value: props.content,
        })
      }>
      <Text style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 17}}>
        {props.label}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'SpoqaHanSans-Regular',
            fontSize: 17,
            marginRight: 17,
            color: '#787878',
          }}>
          {props.content}
        </Text>
        <SpoqaArrow type="right" font="Regular" size={20} color="#787878" />
      </View>
    </TouchableOpacity>
  );
};

export default MyProfileEditRow;
