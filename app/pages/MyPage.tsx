import React, {useEffect} from 'react';
import {Animated, Linking, StatusBar} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import MyPageMenuRow from '../components/MyPageMenuRow';
import MyPageContent from '../components/MyPageContent';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import MyPageProfile from '../components/MyPageProfile';
import MyHeadText from '../components/MyHeadText';
import {ScreenProps} from "../types";

const ME_QUERY = gql`
  query {
    me {
      id
      name
      email
      profileImage
    }
  }
`;

const scrollY = new Animated.Value(0);

const MyPage = (props: ScreenProps) => {
  const {data, loading, error, refetch} = useQuery(ME_QUERY);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <MyPageHeader name="마이페이지" scrollY={scrollY} headerProps={props} />
      <MyPageScrollView scrollY={scrollY}>
        <MyHeadText name="마이페이지" />
        <MyPageProfile
          name={data?.me?.name}
          email={data?.me?.email}
          profileImage={data?.me?.profileImage}
        />
        <MyPageContent>
          <MyPageMenuRow
            name="즐겨찾는 화장실"
            icon="heart"
            navigate="MyPlace"
          />
          <MyPageMenuRow
            name="리뷰 남긴 화장실"
            icon="message-square"
            navigate="MyReview"
          />
          <MyPageMenuRow
            name="화장실 추가 요청"
            icon="map-pin"
            navigate="PlaceAddRequest"
          />
          <MyPageMenuRow
            name="프로필 수정"
            icon="edit-3"
            navigate="MyProfile"
          />
          <MyPageMenuRow
            name="고객센터"
            icon="phone"
            navigate=""
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/sailet/CONTACT-9362759d2fc1425d918619352b66061a',
              )
            }
          />
          <MyPageMenuRow
            name="약관 및 정책"
            icon="archive"
            navigate="MyTerms"
          />
        </MyPageContent>
      </MyPageScrollView>
    </>
  );
};

MyPage.navigationOptions = () => ({
  header: null,
});

export default MyPage;
