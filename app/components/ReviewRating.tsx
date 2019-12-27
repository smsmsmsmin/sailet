import {AirbnbRating} from 'react-native-ratings';
import {View} from 'react-native';
import React, {Dispatch} from 'react';

interface IProps {
  placeRating: number;
  setRating: Dispatch<any>;
}

const ReviewRating = (props: IProps) => {
  return (
    <View
      style={{
        padding: 17,
      }}>
      <AirbnbRating
        size={30}
        showRating={false}
        defaultRating={props.placeRating}
        onFinishRating={value => props.setRating(value)}
      />
    </View>
  );
};
export default ReviewRating;
