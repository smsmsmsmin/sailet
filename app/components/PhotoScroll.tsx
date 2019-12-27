import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';

interface IProps {
  photos: {
    uri: string;
  }[];
}

const PhotoScroll = (props: IProps) => {
  return (
    <>
      {props.photos.length === 0 ? (
        <View style={styles.sectionContentsWrap}>
          <Text style={styles.sectionInfo}>
            이 화장실의 첫번째 사진을 등록해보세요.
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {props.photos.map((photo, index: number) => {
            return (
              <View key={index} style={styles.photoWrap}>
                <FastImage
                  style={styles.photo}
                  source={{
                    uri: photo.uri,
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginLeft: -5,
  },
  sectionContentsWrap: {
    marginTop: 20,
  },
  sectionInfo: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  photoWrap: {
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  photo: {
    width: 130,
    height: 130,
  },
});

export default PhotoScroll;
