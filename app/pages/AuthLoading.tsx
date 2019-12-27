import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import LottieView from 'lottie-react-native';
import navigation from '../utils/navigation';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

const VERIFY_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const AuthLoading = () => {
  const {data, error} = useQuery(VERIFY_QUERY);

  useEffect(() => {
    if (data) return navigation.navigate('Map');
    if (error) return navigation.navigate('Login');
  }, [data, error]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{flex: 1}}>
        <LottieView
          source={require('../assets/Animation/loading.json')}
          autoPlay
          loop
        />
      </View>
    </>
  );
};

export default AuthLoading;
