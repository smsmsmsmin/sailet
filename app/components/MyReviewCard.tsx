import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import 'moment/locale/ko';
import {emojiSelector} from '../utils/emoji';
import navigation from '../utils/navigation';
import env from '../env.json';

interface IProps {
  id: string;
  name: string;
  lat: number;
  lng: number;
  review: string;
  rating: number;
  status: 'good' | 'bad' | 'unknown';
  createdAt: string;
}

const MyReviewCard = (props: IProps) => {
  useEffect(() => {
    moment.locale('ko');
  }, []);

  return (
    <TouchableOpacity
      style={styles.toWrap}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('Place', {id: props.id})}>
      <View style={styles.wrap}>
        <View style={styles.mapWrap}>
          <FastImage
            resizeMode={FastImage.resizeMode.center}
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=15&size=640x640&key=${env.GoogleAPIKey}`,
              priority: FastImage.priority.low,
            }}
            style={styles.map}
          />
        </View>
        <View style={styles.topWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.headText}>{props.name}</Text>
            <Text style={styles.infoText}>{props.review}</Text>
          </View>
          <View style={styles.emojiWrap}>
            <ImageBackground
              style={styles.emoji}
              source={emojiSelector[props.status]}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AirbnbRating
            size={14}
            showRating={false}
            isDisabled={true}
            defaultRating={props.rating}
          />
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'SpoqaHanSans-Light',
              color: 'white',
            }}>
            <TimeAgo time={Date.parse(props.createdAt)} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toWrap: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  wrap: {
    backgroundColor: 'black',
    padding: 17,
    overflow: 'hidden',
    borderRadius: 20,
    justifyContent: 'space-between',
    minHeight: 130,
  },
  topWrap: {
    flexDirection: 'row',
  },
  mapWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {width: 640, height: 640, opacity: 0.19},
  textWrap: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 17,
  },
  headText: {
    fontFamily: 'SpoqaHanSans-Bold',
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'SpoqaHanSans-Regular',
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  emojiWrap: {
    flex: 2,
    marginTop: 'auto',
    marginBottom: 'auto',
    aspectRatio: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emoji: {
    flex: 1,
  },
});

export default MyReviewCard;
