import React, {useState} from 'react';
import {Alert, Animated} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import MyHeadText from '../components/MyHeadText';
import PostCodeButton from '../components/PostCodeButton';
import {remove} from 'lodash';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import navigation from '../utils/navigation';
import PlaceAddRequestTextInput from '../components/PlaceAddRequestTextInput';
import PlaceAddRequestContent from '../components/PlaceAddRequestContent';
import PlaceAddRequestPhoto from '../components/PlaceAddRequestPhoto';
import PlaceAddRequestButton from '../components/PlaceAddRequestButton';
import {ScreenProps} from '../types';
import {putObject} from '../utils/aws';
import {imagesPicker} from '../utils/imagesPicker';

const ADD_REQUEST = gql`
  mutation($name: String!, $address: String!, $images: Json!) {
    createPlaceAddRequest(name: $name, address: $address, images: $images) {
      id
    }
  }
`;

const scrollY = new Animated.Value(0);

const PlaceAddRequest = (props: ScreenProps) => {
  const [createPlaceAddRequest] = useMutation(ADD_REQUEST, {
    onCompleted() {
      Alert.alert('요청 성공', '성공적으로 등록 요청이 완료되었습니다.');
      navigation.goBack();
    },
  });
  const [info, setInfo] = useState({
    name: '',
    address: '',
  });

  const [images, setImages] = useState<Array<string>>([]);

  const _uploadPhoto = async () => {
    const image = await imagesPicker();
    return putObject(
      image.path,
      `uploads/place/new/${image.modificationDate}${
        image.size
      }.${image.mime.substring(6)}`,
      (err, data) => {
        if (data) {
          setImages(state => [
            ...state,
            `https://cdn.sailet.app/uploads/place/new/${
              image.modificationDate
            }${image.size}.${image.mime.substring(6)}`,
          ]);
        }
      },
    );
  };

  const _deletePhoto = (url: string) => {
    setImages(remove(images, (image: string) => image !== url));
  };

  const _submit = () => {
    if (info.name !== '' && info.address !== '' && images.length !== 0) {
      return Alert.alert(
        '아래의 내용에 동의하십니까?',
        '이 화장실을 공개할 수 있는 적합한 권리를 갖고있거나, 회사나 기관으로부터 부여 받았으며 입력한 정보는 틀림이 없습니다.',
        [
          {
            text: '아니오',
          },
          {
            text: '예',
            onPress: () =>
              createPlaceAddRequest({
                variables: {
                  name: info.name,
                  address: info.address,
                  images: images,
                },
              }),
          },
        ],
      );
    }
    return Alert.alert('입력 오류', '입력한 내용을 다시 한번 확인해주세요.');
  };

  return (
    <>
      <MyPageHeader
        name="화장실 추가 요청"
        scrollY={scrollY}
        headerProps={props}
      />
      <MyPageScrollView scrollY={scrollY}>
        <MyHeadText name="화장실 추가 요청" />
        <PlaceAddRequestContent name="이름">
          <PlaceAddRequestTextInput
            value={info.name}
            editable={true}
            onChangeText={value => setInfo(state => ({...state, name: value}))}
          />
        </PlaceAddRequestContent>
        <PlaceAddRequestContent name="주소">
          <PlaceAddRequestTextInput
            value={info.address}
            editable={false}
            style={{flex: 7, marginRight: 17}}
          />
          <PostCodeButton setInfo={setInfo} />
        </PlaceAddRequestContent>
        <PlaceAddRequestPhoto
          images={images}
          upload={_uploadPhoto}
          delete={_deletePhoto}
        />
        <PlaceAddRequestButton onPress={_submit} />
      </MyPageScrollView>
    </>
  );
};

PlaceAddRequest.navigationOptions = () => ({
  header: null,
});

export default PlaceAddRequest;
