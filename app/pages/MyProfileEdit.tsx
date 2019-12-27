import React, {RefObject, useEffect, useRef, useState} from 'react';
import MyPageHeader from '../components/MyPageHeader';
import {Animated, Keyboard, TextInput, View} from 'react-native';
import MyHeadText from '../components/MyHeadText';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import MyProfileEditContent from '../components/MyProfileEditContent';
import MyProfileEditButton from '../components/MyProfileEditButton';
import MyProfileEditContainer from '../components/MyProfileEditContainer';
import {ScreenProps} from "../types";

const EDIT_NAME = gql`
  mutation($name: String!) {
    editName(name: $name) {
      id
    }
  }
`;

const EDIT_EMAIL = gql`
  mutation($email: String!) {
    editEmail(email: $email) {
      id
    }
  }
`;

const scrollY = new Animated.Value(0);

const MyProfileEdit = (props: ScreenProps) => {
  const inputRef = useRef() as RefObject<TextInput>;
  const {type, value} = props.navigation.state.params;
  const [editName] = useMutation(EDIT_NAME, {
    onCompleted() {
      props.navigation.goBack();
    },
  });
  const [editEmail] = useMutation(EDIT_EMAIL, {
    onCompleted() {
      props.navigation.goBack();
    },
  });
  const [inputValue, setInputValue] = useState<string>(value);

  const _submit = () => {
    Keyboard.dismiss();
    switch (type) {
      case '이름':
        return editName({variables: {name: inputValue}});
      case '이메일':
        return editEmail({variables: {email: inputValue}});
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <>
      <MyPageHeader
        name={`${type} 수정`}
        scrollY={scrollY}
        headerProps={props}
      />
      <MyProfileEditContainer>
        <View>
          <MyHeadText name={`${type} 수정`} />
          <MyProfileEditContent>
            <TextInput
              ref={inputRef}
              style={{
                width: '100%',
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                paddingVertical: 10,
                fontFamily: 'SpoqaHanSans-Regular',
                fontSize: 17,
              }}
              selectTextOnFocus={true}
              value={inputValue}
              onChange={e => setInputValue(e.nativeEvent.text)}
              onSubmitEditing={_submit}
            />
          </MyProfileEditContent>
        </View>
        <MyProfileEditContent>
          <MyProfileEditButton onPress={_submit} />
        </MyProfileEditContent>
      </MyProfileEditContainer>
    </>
  );
};

MyProfileEdit.navigationOptions = () => ({
  header: null,
});

export default MyProfileEdit;
