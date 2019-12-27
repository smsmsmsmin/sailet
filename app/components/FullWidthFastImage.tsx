import FastImage from 'react-native-fast-image';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
// @ts-ignore
import ImageView from 'react-native-image-view';

interface IProps {
  width: number;
  uri: string;
  priority: 'low' | 'normal' | 'high';
}

const FullWidthFastImage = (props: IProps) => {
  const [height, setHeight] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <FastImage
          style={{
            width: props.width,
            height: height,
          }}
          source={{
            uri: props.uri,
            priority: FastImage.priority[props.priority],
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={e =>
            setHeight(
              (e.nativeEvent.height / e.nativeEvent.width) * props.width,
            )
          }
        />
      </TouchableOpacity>
      <ImageView
        images={[
          {
            source: {
              uri: props.uri,
            },
          },
        ]}
        isVisible={visible}
        onClose={() => setVisible(false)}
        isSwipeCloseEnabled={true}
      />
    </>
  );
};

export default FullWidthFastImage;
