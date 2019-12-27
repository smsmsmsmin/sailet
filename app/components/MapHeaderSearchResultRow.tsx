import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import webview from '../utils/webview';
import {NavigationScreenConfig} from 'react-navigation';

interface IProps {
  x: string | number;
  y: string | number;
  navigation: NavigationScreenConfig<any, any>;
  name: string;
  address: string;
}

const MapHeaderSearchResultRow = (props: IProps) => {
  const {x, y, navigation, name, address} = props;
  const _placeHandle = () => {
    navigation.setParams({isSearch: false});
    webview.goToPlace(navigation.state.params.WebView, Number(x), Number(y));
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
      }}
      onPress={_placeHandle}>
      <View style={styles.resultRow}>
        <Text style={styles.resultHead}>{name}</Text>
        <Text style={styles.resultSub}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  resultHead: {
    color: 'white',
    fontFamily: 'SpoqaHanSans-Regular',
  },
  resultSub: {
    color: 'white',
    fontFamily: 'SpoqaHanSans-Thin',
  },
});

export default MapHeaderSearchResultRow;
