import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import navigation from '../utils/navigation';

interface IProps {
  name: string;
  icon?: string;
  navigate?: string;
  red?: boolean;
  onPress?: () => void;
}

const MyPageMenuRow = (props: IProps) => {
  const {name, icon, navigate, red, onPress} = props;
  return (
    <View style={{paddingHorizontal: 17, backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={
          onPress
            ? onPress
            : navigate
            ? () => navigation.navigate(navigate)
            : () => null
        }
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{paddingVertical: 10, marginRight: icon ? 17 : 0}}>
          {icon ? (
            <Icon
              name={icon}
              color={red ? '#BF0D3E' : 'black'}
              size={20}
              style={{height: 20, marginLeft: -1}}
            />
          ) : (
            <View style={{height: 20}} />
          )}
        </View>

        <Text
          style={{
            fontFamily: 'SpoqaHanSans-Light',
            fontSize: 17,
            color: red ? '#BF0D3E' : 'black',
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPageMenuRow;
