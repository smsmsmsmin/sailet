import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import PlaceContent from '../components/PlaceContent';
import MyPlaceCard from '../components/MyPlaceCard';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import MyHeadText from '../components/MyHeadText';
import {ScreenProps} from "../types";

const scrollY = new Animated.Value(0);

interface IBookmark {
  id: string;
  lat: number;
  lng: number;
  status: 'good' | 'unknown' | 'bad';
  name: string;
}

const LOAD_MY_PLACE = gql`
  query {
    loadBookmark {
      id
      lat
      lng
      status
      name
    }
  }
`;

const MyPlace = (props: ScreenProps) => {
  const {data, loading, error, refetch} = useQuery(LOAD_MY_PLACE);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <MyPageHeader
        name="즐겨찾는 화장실"
        scrollY={scrollY}
        headerProps={props}
      />
      <MyPageScrollView scrollY={scrollY}>
        <MyHeadText name="즐겨찾는 화장실" />
        <PlaceContent>
          {data?.loadBookmark.map((bookmark: IBookmark) => (
            <MyPlaceCard
              key={bookmark.id}
              id={bookmark.id}
              name={bookmark.name}
              lat={bookmark.lat}
              lng={bookmark.lng}
              status={bookmark.status}
            />
          ))}
        </PlaceContent>
      </MyPageScrollView>
    </>
  );
};

MyPlace.navigationOptions = () => ({
  header: null,
});

export default MyPlace;
