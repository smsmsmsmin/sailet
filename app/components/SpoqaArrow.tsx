import React from 'react';
import {Text} from 'react-native';

interface IProps {
  type: string;
  font: string;
  size: number;
  color?: string;
}

const SpoqaArrow = (props: IProps) => (
  <Text
    style={{
      fontFamily: `SpoqaHanSans-${props.font}`,
      fontSize: props.size,
      color: props.color || 'black',
    }}>
    {props.type === 'left' ? <>&#xE000;</> : <>&#xE001;</>}
  </Text>
);

export default SpoqaArrow;
