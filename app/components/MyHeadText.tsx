import React from 'react';
import {Text, View} from 'react-native';

const MyHeadText = (props: {name: string}) => {
  return (
    <View style={{padding: 17, backgroundColor: 'white'}}>
      <Text style={{fontSize: 24, fontFamily: 'SpoqaHanSans-Bold'}}>
        {props.name}
      </Text>
    </View>
  );
};

export default MyHeadText;
