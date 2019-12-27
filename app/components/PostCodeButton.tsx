import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';
import React, {Dispatch, useState} from 'react';

const PostCodeButton = (props: {setInfo: Dispatch<any>}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
        onPress={() => setVisible(true)}>
        <Text
          style={{
            fontFamily: 'SpoqaHanSans-Regular',
            fontSize: 15,
            color: 'white',
          }}>
          우편번호 찾기
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '100%', height: '80%'}}>
          <Postcode
            style={{flex: 1}}
            onSelected={data => {
              props.setInfo((state: {name: string; address: string}) => ({
                ...state,
                address: data.address,
              }));
              setVisible(false);
            }}
            onError={data => console.log(data)}
          />
        </View>
      </Modal>
    </>
  );
};

export default PostCodeButton;
