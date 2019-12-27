import React from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AddedPhoto from './AddedPhoto';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface IProps {
  freeze?: boolean;
  images: Array<string>;
  upload: () => void;
  delete: (image: string) => void;
  request?: boolean;
}

const AddPhotoScrollView = (props: IProps) => {
  const {images, upload, delete: deleteFC, request} = props;
  return (
    <View style={request ? {flex: 1} : {}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 17,
        }}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: 'black',
            marginVertical: 17,
            marginRight: 17,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={upload}>
          <Icon name="camera" color="white" size={30} />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          {images.length === 0 ? (
            <Text style={{fontSize: 17, fontFamily: 'SpoqaHanSans-Regular'}}>
              이 화장실의 사진을 등록해주세요.
            </Text>
          ) : (
            <>
              {images.map(image => (
                <AddedPhoto key={image} image={image} delete={deleteFC} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
      {props.freeze ? null : Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </View>
  );
};

export default AddPhotoScrollView;
