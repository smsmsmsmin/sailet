import {Text, View} from 'react-native';
import React from 'react';

interface IProps {
  name: string;
  children: React.ReactNode;
}

const PlaceAddRequestContent = (props: IProps) => {
  return (
    <View style={{padding: 17}}>
      <Text style={{fontFamily: 'SpoqaHanSans-Light', fontSize: 15}}>
        {props.name}
      </Text>
      <View style={{flexDirection: 'row'}}>{props.children}</View>
    </View>
  );
};

export default PlaceAddRequestContent;
