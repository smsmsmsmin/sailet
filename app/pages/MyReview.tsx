import React, {useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import PlaceContent from '../components/PlaceContent';
import MyReviewCard from '../components/MyReviewCard';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import {ScreenProps} from "../types";

interface IComment {
  id: string;
  place: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    status: 'good' | 'bad' | 'unknown';
  };
  content: string;
  rating: number;
  createdAt: string;
}

const scrollY = new Animated.Value(0);

const MY_REVIEW = gql`
  query {
    me {
      id
      comments {
        id
        place {
          id
          lat
          lng
          status
          name
        }
        content
        rating
        createdAt
      }
    }
  }
`;

const MyReview = (props: ScreenProps) => {
  const {data, loading, error, refetch} = useQuery(MY_REVIEW);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <MyPageHeader
        name="리뷰 남긴 화장실"
        scrollY={scrollY}
        headerProps={props}
      />
      <MyPageScrollView scrollY={scrollY}>
        <View style={{padding: 17, backgroundColor: 'white'}}>
          <Text style={{fontSize: 24, fontFamily: 'SpoqaHanSans-Bold'}}>
            리뷰 남긴 화장실
          </Text>
        </View>
        <PlaceContent>
          {data?.me?.comments.map((comment: IComment) => (
            <MyReviewCard
              key={comment.id}
              id={comment.place.id}
              name={comment.place.name}
              lat={comment.place.lat}
              lng={comment.place.lng}
              review={comment.content}
              rating={comment.rating}
              status={comment.place.status}
              createdAt={comment.createdAt}
            />
          ))}
        </PlaceContent>
      </MyPageScrollView>
    </>
  );
};

MyReview.navigationOptions = () => ({
  header: null,
});

export default MyReview;
