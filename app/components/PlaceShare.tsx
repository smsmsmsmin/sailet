import {Text, TouchableOpacity, View} from 'react-native';
import {sharePlace} from '../utils/firebase';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

interface IProps {
  id: string;
  name: string;
}

const PlaceShare = (props: IProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 14}}>
        이 화장실을 친구들과 공유해보세요!
      </Text>
      <TouchableOpacity
        onPress={() => sharePlace(props.id, props.name)}
        style={{
          zIndex: 1,
          justifyContent: 'center',
        }}>
        <Icon name="share-2" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default PlaceShare;
