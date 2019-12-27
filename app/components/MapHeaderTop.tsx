import React from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {searchKeyword} from '../utils/kakao';
import Sailet from '../assets/Icons/Sailet';

const MapHeaderTop = (props: {navigation: any}) => {
  const {navigation} = props;

  const _search = (navigation: any) => {
    Keyboard.dismiss();
    searchKeyword(navigation.getParam('searchPlaceInput'))
      .then(({data}) => {
        if (data.documents.length === 0)
          return Alert.alert('검색 결과가 없습니다.', '다시 시도해주세요.');
        navigation.setParams({searchData: data.documents});
      })
      .catch(() => {
        return Alert.alert('검색 결과가 없습니다.', '다시 시도해주세요.');
      });
  };

  const _searchBlur = (navigation: any) => {
    Keyboard.dismiss();
    navigation.setParams({
      searchPlaceInput: '',
      isSearch: false,
      searchData: [],
    });
  };

  return (
    <View style={styles.barWrap}>
      <View style={styles.logoWrap}>
        <Sailet style={{width: 30, height: 30}} />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput
          style={styles.searchInput}
          placeholder="지금 어디에 계신가요?"
          placeholderTextColor="white"
          returnKeyLabel="검색"
          value={navigation.getParam('searchPlaceInput')}
          onChange={e =>
            navigation.setParams({
              searchPlaceInput: e.nativeEvent.text,
            })
          }
          onFocus={() => navigation.setParams({isSearch: true})}
          onSubmitEditing={() => _search(navigation)}
        />
        <View style={[styles.iconWrap, {paddingRight: 0}]}>
          <TouchableOpacity onPress={() => _search(navigation)}>
            <Icon style={styles.icon} name="search" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.iconWrap}>
          {navigation.getParam('isSearch') ? (
            <TouchableOpacity onPress={() => _searchBlur(navigation)}>
              <Icon style={styles.icon} name="x" size={26} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
              <Icon style={styles.icon} name="user" size={26} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barWrap: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  logoWrap: {padding: 15, alignItems: 'center'},
  searchInput: {
    color: 'white',
    flex: 1,
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 17,
  },
  iconWrap: {padding: 15, alignItems: 'center'},
  icon: {height: 25, marginLeft: -3},
});

export default MapHeaderTop;
