import React, {useEffect, useState} from 'react';
import {Animated, StatusBar} from 'react-native';
import PlaceHeader from '../components/PlaceHeader';
import PhotoScroll from '../components/PhotoScroll';
import PlaceReviewComp from '../components/PlaceReviewComp';
import PlaceMap from '../components/PlaceMap';
import PlaceScrollView from '../components/PlaceScrollView';
import PlaceInfo from '../components/PlaceInfo';
import PlaceContent from '../components/PlaceContent';
import RequestEdit from '../components/RequestEdit';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Geolocation from '@react-native-community/geolocation';
import Error from '../components/Error';
import {sharePlace} from '../utils/firebase';
import PlaceRating from '../components/PlaceRating';
import PlaceShare from '../components/PlaceShare';
import PlaceLoading from '../components/PlaceLoading';
import {ScreenProps} from '../types';
import {WebViewMessageEvent} from 'react-native-webview';

const PLACE_QUERY = gql`
  query($placeId: ID!) {
    loadPlace(placeId: $placeId) {
      id
      lat
      lng
      name
      status
      rating
      images
      comments
      bookmark
      updatedAt
    }
  }
`;

const scrollY = new Animated.Value(0);

export interface IPlace {
  id: string;
  name: string;
  status: 'good' | 'bad' | 'unknown';
  lat: number;
  lng: number;
  rating: number;
  images: Array<any>;
  review: Array<any>;
  bookmark: boolean;
  updatedAt: string;
}

interface IComment {
  id: string;
  user: {
    name: string;
    profileImage: string;
  };
  content: string;
  rating: number;
  updatedAt: string;
}

const Place = (props: ScreenProps) => {
  const {id: placeId} = props.navigation.state.params;

  const {data, loading, error, refetch} = useQuery(PLACE_QUERY, {
    variables: {placeId},
  });

  const [placeData, setPlaceData] = useState<IPlace | null>();
  const [distance, setDistance] = useState<number | null>();
  const [address, setAddress] = useState('');
  const [myLocation, setMyLocation] = useState({lat: 0, lng: 0});
  const [gpsError, setGpsError] = useState<boolean>(false);

  useEffect(() => {
    props.navigation.addListener('didFocus', () => {
      refetch();
    });
    refetch();
    scrollY.setValue(0);
    Geolocation.getCurrentPosition(
      info =>
        setMyLocation({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        }),
      () => setGpsError(true),
    );
  }, []);

  useEffect(() => {
    if (data?.loadPlace) {
      const {
        id,
        lat,
        lng,
        rating,
        images,
        comments,
        bookmark,
        name,
        status,
        updatedAt,
      } = data.loadPlace;
      setPlaceData({
        id,
        name,
        status,
        lat,
        lng,
        rating,
        images,
        bookmark,
        updatedAt,
        review: comments.map((comment: IComment) => ({
          id: comment.id,
          name: comment.user.name,
          profileImage: comment.user.profileImage,
          review: comment.content,
          rating: comment.rating,
          createdAt: comment.updatedAt,
        })),
      });
    }
  }, [data]);

  const _onMessage = (data: WebViewMessageEvent) => {
    const message = JSON.parse(data.nativeEvent.data);
    switch (message.type) {
      case 'distance':
        setDistance(message.data);
        break;
      case 'address':
        setAddress(message.data);
        break;
    }
  };

  const _movePlace = (x: number, y: number) => {
    props.navigation.navigate('Map', {
      goToPlace: {
        x: x,
        y: y,
      },
    });
  };

  if (error) return <Error />;

  if (placeData && address && myLocation && distance && !loading) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <PlaceHeader
          id={placeData.id}
          name={placeData.name}
          headerProps={props}
          scrollY={scrollY}
          heart={true}
          bookMark={placeData.bookmark}
          onRightButtonClick={() => sharePlace(placeId, placeData.name)}
        />
        <PlaceScrollView scrollY={scrollY}>
          <PlaceInfo
            name={placeData.name}
            status={placeData.status}
            gpsError={gpsError}
            distance={distance}
            updatedAt={placeData.updatedAt}
          />
          <PlaceContent
            head="사진"
            arrow={true}
            onHeadPress={() =>
              placeData.images.length === 0
                ? null
                : props.navigation.navigate('PlacePhoto', {id: placeId})
            }>
            <PhotoScroll photos={placeData.images} />
          </PlaceContent>
          <PlaceRating id={placeId} name={placeData.name} />
          <PlaceContent
            head="리뷰"
            arrow={true}
            onHeadPress={() =>
              placeData.review.length === 0
                ? null
                : props.navigation.navigate('PlaceReview', {id: placeId})
            }
            rating={placeData.rating}>
            <PlaceReviewComp reviews={placeData.review} />
          </PlaceContent>
          <PlaceContent>
            <PlaceShare id={placeId} name={placeData.name} />
          </PlaceContent>
          <PlaceMap
            status={placeData.status}
            myLatLng={myLocation}
            placeLatLng={{lat: placeData.lat, lng: placeData.lng}}
            address={address}
            _movePlace={_movePlace}
          />
          <PlaceContent>
            <RequestEdit id={placeId} name={placeData.name} />
          </PlaceContent>
        </PlaceScrollView>
      </>
    );
  }

  return (
    <PlaceLoading
      placeData={placeData}
      myLocation={myLocation}
      address={address}
      onMessage={_onMessage}
    />
  );
};

Place.navigationOptions = () => ({
  header: null,
});

export default Place;
