import React from 'react';
import {View} from 'react-native';

interface IProps {
  children: React.ReactNode;
}

const MyPageContent = (props: IProps) => {
  return <View style={{marginTop: 10}}>{props.children}</View>;
};
export default MyPageContent;
