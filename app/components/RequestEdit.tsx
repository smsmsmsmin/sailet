import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import navigation from '../utils/navigation';

interface IProps {
  id: string;
  name: string;
}

const RequestEdit = (props: IProps) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={() =>
        navigation.navigate('PlaceEdit', {
          id: props.id,
          name: props.name,
        })
      }>
      <View style={{marginRight: 10}}>
        <Icon
          name="alert-triangle"
          style={[styles.requestText, {fontSize: 17, marginBottom: -3}]}
        />
      </View>
      <Text style={styles.requestText}>
        <Text>틀린 정보가 있나요?</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  requestText: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
    color: '#BF0D3E',
  },
});

export default RequestEdit;
