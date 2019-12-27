import ImagePicker from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import env from '../env.json';

interface IMultiple {
  path: string;
  callback: (err: AWS.AWSError, data: AWS.S3.Types.PutObjectOutput) => void;
}

export const multipleImagePicker = (props: IMultiple) => {
  AWS.config.update({
    accessKeyId: env.AWSAccessKeyId,
    region: 'ap-northeast-2',
    secretAccessKey: env.AWSSecretAccessKey,
  });
  ImagePicker.openPicker({
    multiple: true,
    includeExif: true,
  }).then(images =>
    Array(images).map(async (image: any) => {
      const body = await fetch(image.path);
      const blob = await body.blob();
      const s3 = new AWS.S3();
      const params = {
        Body: blob,
        Bucket: 'cdn.sailet.app',
        Key: props.path,
      };
      await s3.putObject(params, props.callback);
    }),
  );
};
