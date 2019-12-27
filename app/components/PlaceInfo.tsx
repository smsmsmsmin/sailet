import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import 'moment/locale/ko';
import {emojiSelector} from '../utils/emoji';

interface IProps {
  name: string;
  gpsError: boolean;
  distance: string | number;
  updatedAt: string;
  status: 'good' | 'bad' | 'unknown';
}

const PlaceInfo = (props: IProps) => {
  useEffect(() => {
    moment.locale('ko');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContent}>
        <View style={styles.infoTextWrap}>
          <Text>
            <Text style={[styles.text, styles.bold]}>
              {props.name}
              {'\n'}
            </Text>
            <Text style={styles.textMargin}>{'\n'}</Text>
            <Text style={[styles.text, {fontFamily: 'SpoqaHanSans-Regular'}]}>
              {props.gpsError
                ? `현재 위치를 사용할 수 없습니다.`
                : `현재 위치로부터 ${props.distance}m`}
              {'\n'}
            </Text>
            <Text style={styles.textMargin}>{'\n'}</Text>
            <Text style={[styles.text]}>
              <TimeAgo time={Date.parse(props.updatedAt)} /> 업데이트
            </Text>
          </Text>
        </View>
        <View style={styles.emojiWrap}>
          <ImageBackground
            style={styles.emoji}
            source={emojiSelector[props.status]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 17,
  },

  infoContent: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Light',
    color: 'black',
  },
  textMargin: {
    fontSize: 7,
  },
  infoTextWrap: {
    left: 0,
    flex: 7,
  },
  bold: {
    fontSize: 20,
    fontFamily: 'SpoqaHanSans-Bold',
    color: 'black',
  },
  emojiWrap: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emoji: {
    width: 100,
    height: 100,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 17,
    marginBottom: -3,
  },
  iconText: {
    fontFamily: 'SpoqaHanSans-Light',
    fontSize: 15,
  },
});

export default PlaceInfo;
