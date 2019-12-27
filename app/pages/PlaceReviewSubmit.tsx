import React, {useState} from 'react';
import PlaceHeader from '../components/PlaceHeader';
import {Animated, ScrollView, TextInput, View} from 'react-native';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {remove} from 'lodash';
import Loading from '../components/Loading';
import AddPhotoScrollView from '../components/AddPhotoScrollView';
import StatusSegmented from '../components/StatusSegmented';
import ReviewRating from '../components/ReviewRating';
import {ScreenProps} from '../types';
import {imagesPicker} from '../utils/imagesPicker';
import {putObject} from '../utils/aws';

const NEW_RATING_MUTATION = gql`
  mutation(
    $placeId: ID!
    $status: Int!
    $comment: String!
    $images: Json
    $rating: Int!
  ) {
    newRating(
      placeId: $placeId
      status: $status
      comment: $comment
      images: $images
      rating: $rating
    ) {
      id
    }
  }
`;

const scrollY = new Animated.Value(0);

const PlaceReviewSubmit = (props: ScreenProps) => {
  const {
    id: placeId,
    name: placeName,
    status: placeStatus,
    rating: placeRating,
  } = props.navigation.state.params;

  const [newRating] = useMutation(NEW_RATING_MUTATION, {
    onCompleted() {
      props.navigation.navigate('Place', {id: placeId});
    },
    onError(error) {
      console.log(error);
    },
  });

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(placeRating);
  const [status, setStatus] = useState<number>(placeStatus === 'bad' ? 1 : 0);
  const [images, setImages] = useState<Array<string>>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const _uploadPhoto = async () => {
    const image = await imagesPicker();
    return putObject(
      image.path,
      `uploads/place/${placeId}/${image.modificationDate}${
        image.size
      }.${image.mime.substring(6)}`,
      (err, data) => {
        if (data) {
          setImages(state => [
            ...state,
            `https://cdn.sailet.app/uploads/place/${placeId}/${
              image.modificationDate
            }${image.size}.${image.mime.substring(6)}`,
          ]);
        }
        if (err) {
          console.log(err);
        }
      },
    );
  };

  const _deletePhoto = (url: string) => {
    setImages(remove(images, (image: string) => image !== url));
  };

  const _handleSubmit = () => {
    if (!isSubmit) {
      setIsSubmit(true);
      newRating({
        variables: {
          placeId: placeId,
          status: status,
          rating: rating,
          comment: comment,
          images: images,
        },
      });
    }
  };

  if (isSubmit) return <Loading />;

  return (
    <>
      <PlaceHeader
        name={placeName}
        scrollY={scrollY}
        headerProps={props}
        freeze={true}
        rightButtonText="완료"
        onRightButtonClick={_handleSubmit}
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <ReviewRating placeRating={placeRating} setRating={setRating} />
            <StatusSegmented status={status} setStatus={setStatus} />
            <View style={{padding: 17}}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="좋은 점, 나쁜 점이나 화장실에 방문하는 사람들에게 알려주고 싶은 이야기, 자세한 위치 등을 적어주세요."
                style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 15}}
                value={comment}
                onChange={e => setComment(e.nativeEvent.text)}
              />
            </View>
          </View>
          <AddPhotoScrollView
            images={images}
            upload={_uploadPhoto}
            delete={_deletePhoto}
          />
        </View>
      </ScrollView>
    </>
  );
};

PlaceReviewSubmit.navigationOptions = () => ({
  header: null,
});

export default PlaceReviewSubmit;
