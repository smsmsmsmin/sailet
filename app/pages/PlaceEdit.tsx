import React, {useState} from 'react';
import PlaceHeader from '../components/PlaceHeader';
import {Alert, Animated, ScrollView, Text, TextInput, View} from 'react-native';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import {ScreenProps} from "../types";

const NEW_RATING_MUTATION = gql`
  mutation($placeId: ID!, $comment: String!) {
    createPlaceEditRequest(placeId: $placeId, comment: $comment) {
      id
    }
  }
`;

const scrollY = new Animated.Value(0);

const PlaceEdit = (props: ScreenProps) => {
  const {id: placeId, name: placeName} = props.navigation.state.params;

  const [newRating] = useMutation(NEW_RATING_MUTATION, {
    onCompleted() {
      Alert.alert('요청 완료', '성공적으로 요청을 완료하였습니다.');
      props.navigation.navigate('Place', {id: placeId});
    },
    onError(error) {
      console.log(error);
    },
  });

  const [comment, setComment] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const _handleSubmit = () => {
    if (!isSubmit && comment !== '') {
      setIsSubmit(true);
      newRating({
        variables: {
          placeId: placeId,
          comment: comment,
        },
      });
    } else {
      Alert.alert('요청 오류', '입력한 내용을 다시 한번 확인해주세요.');
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
        rightButtonText="등록"
        onRightButtonClick={_handleSubmit}
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <View
              style={{
                marginHorizontal: 17,
                paddingVertical: 17,
                borderBottomColor: '#ebebeb',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 15}}>
                노출중인 화장실의 정보와 다른 점을 기재해주세요.
              </Text>
            </View>
            <View style={{padding: 17}}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholder={`예시)\n장소 이름이 변경되었어요!\n더이상 개방 화장실이 아니에요!`}
                style={{fontFamily: 'SpoqaHanSans-Regular', fontSize: 15}}
                value={comment}
                onChange={e => setComment(e.nativeEvent.text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

PlaceEdit.navigationOptions = () => ({
  header: null,
});

export default PlaceEdit;
