import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapHeaderTop from './MapHeaderTop';
import MapHeaderSearchResult from './MapHeaderSearchResult';
import MapHeaderView from './MapHeaderView';
import {ScreenConfig} from '../types';

const MapHeader = ({headerProps}: {headerProps: ScreenConfig}) => {
  const {navigation} = headerProps;

  return (
    <MapHeaderView navigation={navigation}>
      <MapHeaderTop navigation={navigation} />
      {navigation.getParam('isSearch') ? (
        <View style={styles.resultWrap}>
          <MapHeaderSearchResult navigation={navigation} />
        </View>
      ) : null}
    </MapHeaderView>
  );
};

const styles = StyleSheet.create({
  resultWrap: {
    height: '100%',
    borderTopColor: 'white',
    borderTopWidth: 1,
    zIndex: 200,
  },
});

export default MapHeader;
