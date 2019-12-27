import axios from "axios";

export const placeShortLink = async (id: string) => {
  const post = await axios.post(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.REACT_APP_FIREBASE_KEY}`,
    {
      dynamicLinkInfo: {
        domainUriPrefix: "https://link.sailet.app",
        link: `https://sailet.app/place/${id}`,
        androidInfo: {
          androidPackageName: "com.sailet"
        },
        iosInfo: {
          iosBundleId: "com.sailet",
          iosAppStoreId: "1484426560"
        },
        socialMetaTagInfo: {
          socialTitle: "안전한 화장실, SAILET",
          socialDescription: `세일렛에서 ${name} 화장실을 만나보세요.`,
          socialImageLink: "https://cdn.sailet.app/assets/logo/logo.png"
        }
      }
    }
  );
  return post.data?.shortLink;
}
