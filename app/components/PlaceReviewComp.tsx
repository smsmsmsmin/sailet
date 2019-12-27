import React from 'react';
import Review from './Review';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
  reviews: Array<IReview>;
  main?: boolean;
}

interface IReview {
  name: string;
  profileImage: string;
  review: string;
  createdAt: string;
  rating: number;
}

const PlaceReviewComp = (props: IProps) => {
  return (
    <View
      style={[styles.sectionContentsWrap, {marginTop: props.main ? 0 : 17}]}>
      {props.reviews.length === 0 ? (
        <Text style={styles.sectionInfo}>
          이 화장실의 첫번째 리뷰를 작성해보세요.
        </Text>
      ) : (
        <>
          {props.reviews.map((review, index) => {
            const {
              name,
              profileImage,
              review: content,
              createdAt,
              rating,
            } = review;
            return (
              <Review
                key={index}
                name={name}
                profileImage={profileImage}
                review={content}
                createdAt={createdAt}
                rating={rating}
              />
            );
          })}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContentsWrap: {},
  sectionInfo: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
});
export default PlaceReviewComp;
