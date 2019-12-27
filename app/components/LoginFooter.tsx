import {Linking, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const LoginFooter = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.notion.so/sailet/CONTACT-9362759d2fc1425d918619352b66061a',
          )
        }>
        <Text>도움이 필요하신가요?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFooter;
