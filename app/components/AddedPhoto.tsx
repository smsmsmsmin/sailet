import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

interface IProps {
  image: string;
  delete: (image: string) => void;
}

const AddedPhoto = (props: IProps) => {
  return (
    <TouchableOpacity
      style={{marginRight: 10}}
      onPress={() => props.delete(props.image)}>
      <View
        style={{
          width: 70,
          height: 70,
          zIndex: 100,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="x" color="white" size={30} style={{zIndex: 200}} />
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: 'black',
            position: 'absolute',
            opacity: 0.3,
            zIndex: 100,
          }}
        />
      </View>
      <FastImage
        style={{width: 70, height: 70}}
        source={{
          uri: props.image,
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

export default AddedPhoto;
