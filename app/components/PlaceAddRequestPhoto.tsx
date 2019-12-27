import {Text, View} from 'react-native';
import AddPhotoScrollView from './AddPhotoScrollView';
import React from 'react';

interface IProps {
  images: Array<string>;
  upload: () => void;
  delete: (image: string) => void;
}

const PlaceAddRequestPhoto = (props: IProps) => {
  const {images, upload, delete: deletePhoto} = props;
  return (
    <>
      <Text
        style={{
          paddingLeft: 17,
          paddingTop: 17,
          fontFamily: 'SpoqaHanSans-Light',
          fontSize: 15,
        }}>
        사진
      </Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <AddPhotoScrollView
          freeze={true}
          images={images}
          upload={upload}
          delete={deletePhoto}
          request={true}
        />
      </View>
    </>
  );
};

export default PlaceAddRequestPhoto;
