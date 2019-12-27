import {View} from 'react-native';
import React from 'react';

const MyProfileEditContent = (props: {children: React.ReactNode}) => {
  return <View style={{padding: 17}}>{props.children}</View>;
};

export default MyProfileEditContent;
