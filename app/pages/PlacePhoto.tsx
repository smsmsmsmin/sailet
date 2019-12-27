import PlaceHeader from '../components/PlaceHeader';
import {Animated, Dimensions, ScrollView} from 'react-native';
import React, {useEffect} from 'react';

import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import FullWidthFastImage from '../components/FullWidthFastImage';
import {ScreenProps} from '../types';

const scrollY = new Animated.Value(0);

const IMAGE_QUERY = gql`
  query($id: ID!) {
    place(id: $id) {
      name
      images {
        uri
      }
    }
  }
`;

const PlacePhoto = (props: ScreenProps) => {
  const {width} = Dimensions.get('window');
  const {id: placeId} = props.navigation.state.params;
  const {data, loading} = useQuery(IMAGE_QUERY, {
    variables: {id: placeId},
  });

  useEffect(() => {
    scrollY.setValue(0);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <PlaceHeader
        name={data?.place?.name}
        freeze={true}
        scrollY={scrollY}
        headerProps={props}
      />
      <ScrollView>
        {data?.place?.images.map((image: any, index: any) => (
          <FullWidthFastImage
            key={index}
            width={width}
            uri={image.uri}
            priority="low"
          />
        ))}
      </ScrollView>
    </>
  );
};

PlacePhoto.navigationOptions = () => ({
  header: null,
});

export default PlacePhoto;
