import {StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import 'moment/locale/ko';

interface IProps {
  name: string;
  profileImage: string;
  review: string;
  createdAt: string;
  rating: number;
}

const Review = (props: IProps) => {
  useEffect(() => {
    moment.locale('ko');
  }, []);
  return (
    <View style={styles.reviewWrap}>
      <View style={styles.reviewProfileImageWrap}>
        <FastImage
          style={styles.profileImage}
          source={{
            uri: props.profileImage,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.reviewContentWrap}>
        <Text style={styles.reviewHead}>{props.name}</Text>
        <View style={styles.reviewContent}>
          <Text style={styles.reviewText}>
            <Text>{props.review} </Text>
            <Text style={styles.textMargin}>
              {'\n'}
              {'\n'}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <AirbnbRating
              size={14}
              showRating={false}
              isDisabled={true}
              defaultRating={props.rating}
            />
            <Text
              style={[
                styles.reviewText,
                {
                  textAlign: 'right',
                  fontFamily: 'SpoqaHanSans-Regular',
                  color: '#707070',
                },
              ]}>
              <TimeAgo time={Date.parse(props.createdAt)} />
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textMargin: {
    fontSize: 7,
  },
  reviewWrap: {
    flexDirection: 'row',
    marginBottom: 17,
  },
  reviewContentWrap: {
    flex: 1,
  },
  reviewContent: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 17,
  },
  reviewProfileImageWrap: {
    justifyContent: 'flex-start',
    width: 40,
    height: 40,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 20,
  },
  reviewHead: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  sectionInfo: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
});

export default Review;
