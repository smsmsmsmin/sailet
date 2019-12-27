import {StyleProp, TextInput, TextStyle, View} from 'react-native';
import React from 'react';

interface IProps {
  value: string;
  onChangeText?: (text: string) => void;
  editable: boolean;
  style?: StyleProp<TextStyle>;
}

const PlaceAddRequestTextInput = (props: IProps) => {
  const {value, onChangeText, editable, style} = props;
  return (
    <TextInput
      value={value}
      onChangeText={editable ? onChangeText : () => null}
      editable={editable}
      style={[
        {
          flex: 1,
          fontFamily: 'SpoqaHanSans-Regular',
          fontSize: 17,
          paddingVertical: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 1.5,
        },
        style,
      ]}
    />
  );
};

export default PlaceAddRequestTextInput;
