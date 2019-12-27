import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

const Error = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Icon name="alert-triangle" size={70} style={{marginBottom: 20}} />
    <Text style={{fontSize: 24}}>404 NOT FOUND</Text>
  </View>
);

export default Error;
