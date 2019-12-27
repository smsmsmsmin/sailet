import AWS, {S3, AWSError} from 'aws-sdk';
import env from '../env.json';

AWS.config.update({
  accessKeyId: env.AWSAccessKeyId,
  region: 'ap-northeast-2',
  secretAccessKey: env.AWSSecretAccessKey,
});

export const putObject = async (
  path: string,
  key: string,
  callback: (err: AWSError, data: S3.Types.PutObjectOutput) => void,
) => {
  const body = await fetch(path);
  const blob = await body.blob();
  const s3 = new AWS.S3();
  const params = {
    Body: blob,
    Bucket: 'cdn.sailet.app',
    Key: key,
  };
  console.log({
    Body: blob,
    Bucket: 'cdn.sailet.app',
    Key: key,
  });
  return s3.putObject(params, callback);
};
