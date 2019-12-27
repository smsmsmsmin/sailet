import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useEffect, useState} from 'react';
import {emojiSelector} from '../utils/emoji';
import navigation from '../utils/navigation';
import {_getAddress} from '../utils/kakao';
import env from '../env.json';

interface IProps {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'good' | 'unknown' | 'bad';
}

const MyPlaceCard = (props: IProps) => {
  const [address, setAddress] = useState<string>('');

  const _address = async () => {
    const address = await _getAddress(props.lng, props.lat);
    const {data} = address;
    return setAddress(
      data.documents[0].road_address
        ? data.documents[0].road_address.address_name
        : data.documents[0].address.address_name,
    );
  };

  useEffect(() => {
    _address();
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
        <View style={styles.textWrap}>
          <Text style={styles.headText}>{props.name}</Text>
          <Text style={styles.infoText}>{address}</Text>
        </View>
        <View style={styles.emojiWrap}>
          <ImageBackground
            style={styles.emoji}
            source={emojiSelector[props.status]}
          />
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
    justifyContent: 'center',
  },
  headText: {
    fontFamily: 'SpoqaHanSans-Bold',
    color: 'white',
    fontSize: 20,
    marginBottom: 17,
  },
  infoText: {
    fontFamily: 'SpoqaHanSans-Regular',
    color: 'white',
    fontSize: 16,
  },
  emojiWrap: {
    flex: 2,
    aspectRatio: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emoji: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MyPlaceCard;
