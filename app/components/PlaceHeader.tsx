import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {ScreenConfig} from "../types";

interface IProps {
  id?: string;
  name: string;
  bookMark?: boolean;
  scrollY: Animated.Value;
  headerProps: ScreenConfig;
  freeze?: boolean;
  heart?: boolean;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
}

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 130;

const ADD_BOOKMARK = gql`
  mutation($placeId: ID!) {
    addBookmark(placeId: $placeId) {
      id
    }
  }
`;

const REMOVE_BOOKMARK = gql`
  mutation($placeId: ID!) {
    removeBookmark(placeId: $placeId) {
      id
    }
  }
`;

const PlaceHeader = (props: IProps) => {
  const {
    id,
    name,
    scrollY,
    headerProps,
    freeze,
    heart,
    rightButtonText,
    onRightButtonClick,
    bookMark,
  } = props;

  const [isBookmark, setIsBookmark] = useState<boolean | undefined>(bookMark);

  const [addBookmark] = useMutation(ADD_BOOKMARK, {
    variables: {
      placeId: id,
    },
  });

  const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
    variables: {
      placeId: id,
    },
  });

  const headOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headBottom = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [-35, 0],
    extrapolate: 'clamp',
  });

  const borderColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['#ffffff', '#f0f0f0'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.sav}>
      <Animated.View style={[styles.wrapper, {borderBottomColor: borderColor}]}>
        <TouchableOpacity
          onPress={() => headerProps.navigation.goBack('')}
          style={styles.leftButtonWrap}>
          <Text style={styles.leftButtonText}>&#xE000;</Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.centerTextWrap, {opacity: freeze ? 1 : headOpacity}]}>
          <Animated.Text
            style={[styles.centerText, {bottom: freeze ? 0 : headBottom}]}>
            {name}
          </Animated.Text>
        </Animated.View>
        <View style={styles.iconWrap}>
          <TouchableOpacity
            onPress={
              heart
                ? isBookmark
                  ? () => {
                      setIsBookmark(false);
                      return removeBookmark();
                    }
                  : () => {
                      setIsBookmark(true);
                      return addBookmark();
                    }
                : onRightButtonClick
                ? onRightButtonClick
                : () => null
            }
            style={styles.rightButtonWrap}>
            {rightButtonText ? (
              <Text style={styles.rightButtonText}>{rightButtonText}</Text>
            ) : null}
            {heart ? (
              <Icon
                name="heart"
                size={30}
                color={isBookmark ? '#BF0D3E' : 'black'}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sav: {
    backgroundColor: 'white',
  },
  wrapper: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomWidth: 1,
  },
  leftButtonWrap: {
    paddingLeft: 17,
    zIndex: 1,
    justifyContent: 'center',
  },
  rightButtonWrap: {
    paddingRight: 17,
    zIndex: 1,
    justifyContent: 'center',
  },
  leftButtonText: {
    fontSize: 30,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  rightButtonText: {
    fontSize: 17,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  centerTextWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 17,
  },
  centerText: {
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 19,
    color: 'black',
  },
  iconWrap: {
    flexDirection: 'row',
  },
});

export default PlaceHeader;
