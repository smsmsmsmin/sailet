import React, {Dispatch} from 'react';
import {View} from 'react-native';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';

interface IProps {
  status: number;
  setStatus: Dispatch<any>;
}

const StatusSegmented = (props: IProps) => {
  return (
    <View
      style={{
        marginHorizontal: 17,
        paddingVertical: 17,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
      }}>
      <ReactNativeSegmentedControlTab
        values={['안전함', '위험함']}
        selectedIndex={props.status}
        onTabPress={index => props.setStatus(index)}
        tabStyle={{borderColor: 'black'}}
        activeTabStyle={{backgroundColor: 'black'}}
        activeTabTextStyle={{fontFamily: 'SpoqaHanSans-Regular'}}
        tabTextStyle={{
          fontFamily: 'SpoqaHanSans-Regular',
          color: 'black',
        }}
      />
    </View>
  );
};

export default StatusSegmented;
