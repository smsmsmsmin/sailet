import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import gql from 'graphql-tag';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import PlaceContent from '../components/PlaceContent';
import MyHeadText from '../components/MyHeadText';
import MyProfileEditRow from '../components/MyProfileEditRow';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import EditProfileImage from '../components/EditProfileImage';
import {ScreenProps} from "../types";

const MY_INFO = gql`
  query {
    me {
      id
      name
      uniqId
      age
      email
      profileImage
    }
  }
`;

const scrollY = new Animated.Value(0);

const MyProfile = (props: ScreenProps) => {
  const { data, loading, error, refetch } = useQuery(MY_INFO);

  useEffect(() => {
    refetch();
    props.navigation.addListener('didFocus', () => {
      refetch();
    });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <MyPageHeader name="프로필 수정" scrollY={scrollY} headerProps={props} />
      <MyPageScrollView scrollY={scrollY}>
        <MyHeadText name="프로필 수정" />
        <PlaceContent>
          <EditProfileImage image={data?.me?.profileImage} refetch={refetch} />
        </PlaceContent>
        <PlaceContent>
          <MyProfileEditRow label="이름" content={data?.me?.name} />
          <MyProfileEditRow label="이메일" content={data?.me?.email} />
        </PlaceContent>
      </MyPageScrollView>
    </>
  );
};

MyProfile.navigationOptions = () => ({
  header: null,
});

export default MyProfile;
