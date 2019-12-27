import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationScreenConfig} from 'react-navigation';

interface IProps {
  navigation: NavigationScreenConfig<any, any>;
  children: React.ReactNode;
}

const MapHeaderView = (props: IProps) => {
  const {navigation} = props;
  return (
    <>
      <SafeAreaView style={styles.savNotch} />
      <SafeAreaView
        style={[
          styles.savWrap,
          {height: navigation.getParam('isSearch') ? '100%' : 0},
        ]}>
        {props.children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  savNotch: {
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: 'black',
  },
  savWrap: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
});

export default MapHeaderView;
