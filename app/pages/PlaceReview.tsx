import PlaceHeader from '../components/PlaceHeader';
import {Animated, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import PlaceReviewComp from '../components/PlaceReviewComp';
import PlaceContent from '../components/PlaceContent';
import {ScreenProps} from '../types';

const scrollY = new Animated.Value(0);

const REVIEW_QUERY = gql`
  query($id: ID!) {
    place(id: $id) {
      name
      comments {
        id
        rating
        content
        user {
          name
          profileImage
        }
        updatedAt
      }
    }
  }
`;

interface IComment {
  id: string;
  user: {name: string; profileImage: string};
  content: string;
  rating: number;
  updatedAt: string;
}

const PlaceReview = (props: ScreenProps) => {
  const {id: placeId} = props.navigation.state.params;
  const {data, loading} = useQuery(REVIEW_QUERY, {
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
        <PlaceContent>
          <PlaceReviewComp
            main={true}
            reviews={data?.place?.comments.map((comment: IComment) => ({
              id: comment.id,
              name: comment.user.name,
              profileImage: comment.user.profileImage,
              review: comment.content,
              rating: comment.rating,
              createdAt: comment.updatedAt,
            }))}
          />
        </PlaceContent>
      </ScrollView>
    </>
  );
};

PlaceReview.navigationOptions = () => ({
  header: null,
});

export default PlaceReview;
