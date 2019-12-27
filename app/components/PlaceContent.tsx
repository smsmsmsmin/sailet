import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import SpoqaArrow from './SpoqaArrow';

interface IProps {
  head?: string;
  arrow?: boolean;
  rating?: number;
  children: React.ReactNode;
  onHeadPress?: () => void;
}
const PlaceContent = (props: IProps) => {
  return (
    <View style={styles.content}>
      <View style={styles.sectionHeadWrap}>
        {props.head ? (
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={props.onHeadPress}>
              <Text style={styles.head}>{props.head} </Text>
              {props.arrow ? <SpoqaArrow type="right" font="Light" size={20}/> : null}
          </TouchableOpacity>
        ) : null}
        {props.rating ? (
          <AirbnbRating
            size={23}
            showRating={false}
            isDisabled={true}
            defaultRating={props.rating}
          />
        ) : null}
      </View>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    padding: 17,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  sectionHeadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  head: {
    fontSize: 17,
    fontFamily: 'SpoqaHanSans-Bold',
    color: 'black',
  },
});

export default PlaceContent;
