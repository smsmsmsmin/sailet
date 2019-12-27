import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapHeaderSearchResultRow from './MapHeaderSearchResultRow';

const MapHeaderSearchResult = (props: {navigation: any}) => {
  const {navigation} = props;
  return (
    <View style={styles.resultWrap}>
      {navigation.getParam('searchData').length !== 0 ? (
        <ScrollView style={styles.resultScv}>
          {navigation.getParam('searchData').map((data: any) => (
            <MapHeaderSearchResultRow
              key={data.id}
              x={data.x}
              y={data.y}
              navigation={navigation}
              name={data.place_name}
              address={data.road_address_name || data.address_name}
            />
          ))}
        </ScrollView>
      ) : (
        <TouchableOpacity
          style={{backgroundColor: 'black', height: '100%'}}
          activeOpacity={1}
          onPress={() => {
            navigation.setParams({isSearch: false});
            Keyboard.dismiss();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultScv: {backgroundColor: 'black', paddingBottom: 100, zIndex: 300},
  resultWrap: {
    height: '100%',
    borderTopColor: 'white',
    borderTopWidth: 1,
    zIndex: 200,
  },
});

export default MapHeaderSearchResult;
