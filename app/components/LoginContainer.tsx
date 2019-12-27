import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';

const LoginContainer = (props: {children: React.ReactNode}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#efefef',
        }}>
        {props.children}
      </SafeAreaView>
    </>
  );
};

export default LoginContainer;
