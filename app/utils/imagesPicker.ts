import ImagePicker, {Image} from 'react-native-image-crop-picker';

// export const imagesPicker = async () => {
//   return ImagePicker.openPicker({
//     multiple: true,
//     includeExif: true,
//   }) as Image[];
// };

export const imagesPicker = async () => {
  return ImagePicker.openCamera({
    includeExif: true,
  }) as Image;
};
