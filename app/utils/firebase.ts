import {Share} from 'react-native';
import {firebase} from '@react-native-firebase/dynamic-links';

export const sharePlace = (id: string, name: string) => {
  firebase
    .dynamicLinks()
    .buildShortLink({
      link: `https://sailet.app/place/${id}`,
      domainUriPrefix: 'https://link.sailet.app',
      android: {
        packageName: 'com.sailet',
      },
      ios: {
        bundleId: 'com.sailet',
        appStoreId: '1484426560',
      },
      social: {
        title: '안전한 화장실, SAILET',
        descriptionText: `세일렛에서 ${name} 화장실을 만나보세요.`,
        imageUrl: 'https://cdn.sailet.app/assets/logo/logo.png',
      },
    })
    .then(result => {
      console.log(result);
      Share.share({
        message: `[SAILET] ${name} 화장실을 만나보세요. ${result}`,
      });
    });
};
