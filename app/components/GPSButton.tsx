import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react';

interface IProps {
  gpsError: boolean;
  getMyLocation: (event: GestureResponderEvent) => void;
}
const GPSButton = (props: IProps) => {
  const [bottomSAV, setBottomSAV] = useState<number>(0);
  const {gpsError, getMyLocation} = props;
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.gpsButton, {bottom: bottomSAV + 10}]}
        onPress={getMyLocation}>
        <Icon name={gpsError ? 'gps-off' : 'gps-fixed'} size={40} />
      </TouchableOpacity>
      <SafeAreaView
        onLayout={data => setBottomSAV(data.nativeEvent.layout.height)}
        style={{position: 'absolute', bottom: 0}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gpsButton: {
    position: 'absolute',
    width: 70,
    height: 70,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.93,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
});

export default GPSButton;
