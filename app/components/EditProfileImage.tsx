import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

interface IProps {
  image: string;
  refetch: () => void;
}

const CHANGE_PROFILE_IMAGE = gql`
  mutation($uri: String!) {
    editProfileImage(uri: $uri) {
      id
    }
  }
`;

const EditProfileImage = (props: IProps) => {
  const [changeProfileImage] = useMutation(CHANGE_PROFILE_IMAGE, {
    onCompleted() {
      props.refetch();
    },
  });

  const _changeProfileImage = () => {
    return ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async (image: any) => {
      const body = await fetch(image.path);
      const blob = await body.blob();
      const s3 = new AWS.S3();
      const params = {
        Body: blob,
        Bucket: 'cdn.sailet.app',
        Key: `uploads/profile/image/${image.filename}`,
      };
      await s3.putObject(params, (err, data) => {
        if (data) {
          changeProfileImage({
            variables: {
              uri: `https://cdn.sailet.app/uploads/profile/image/${image.filename}`,
            },
          });
        }
      });
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={_changeProfileImage}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <FastImage
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
          }}
          source={{uri: props.image}}
        />
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderWidth: 1,
            borderColor: '#ebebeb',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            right: 0,
          }}>
          <Icon name="edit-2" size={17} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileImage;
