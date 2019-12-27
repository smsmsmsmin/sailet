import React from 'react';
import {
  Animated,
  Linking,
  StatusBar,
} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';
import MyPageScrollView from '../components/MyPageScrollView';
import MyHeadText from '../components/MyHeadText';
import MyPageMenuRow from '../components/MyPageMenuRow';
import {ScreenProps} from "../types";

const scrollY = new Animated.Value(0);

const MyTerms = (props: ScreenProps) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <MyPageHeader name="약관 및 정책" scrollY={scrollY} headerProps={props} />
      <MyPageScrollView scrollY={scrollY}>
        <MyHeadText name="약관 및 정책" />
        <MyPageMenuRow
          name="이용약관"
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/03766620ddd5497d9c18bac12a1f3005',
            )
          }
        />
        <MyPageMenuRow
          name="개인정보처리방침"
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/097037713d1149e8a14b58d46241043f',
            )
          }
        />
        <MyPageMenuRow
          name="위치기반서비스 이용약관"
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/535afa5f3c0a491fa540a6734d19572a',
            )
          }
        />
        <MyPageMenuRow
          name="법적 공지 / 정보 제공처"
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/de7de8050cd8412799a5ac75ee3ceecd',
            )
          }
        />
      </MyPageScrollView>
    </>
  );
};

MyTerms.navigationOptions = () => ({
  header: null,
});

export default MyTerms;
