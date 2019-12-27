import {Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import React from 'react';
import navigation from '../utils/navigation';

interface IProps {
  id: string;
  name: string;
}

const PlaceRating = (props: IProps) => {
  return (
    <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontSize: 17, marginBottom: 15}}>
          이 장소에 평가를 남겨주세요.
        </Text>
        <AirbnbRating
          size={35}
          showRating={false}
          defaultRating={0}
          onFinishRating={value =>
            navigation.navigate('PlaceReviewSubmit', {
              id: props.id,
              name: props.name,
              rating: value,
            })
          }
        />
      </View>
    </View>
  );
};

export default PlaceRating;
