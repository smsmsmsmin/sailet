import React, {useEffect} from 'react';
import {YellowBox} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationContainerComponent,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ApolloProvider} from 'react-apollo';
import {ApolloProvider as ApolloHooksProvider} from '@apollo/react-hooks';
import client from './configureApolloClient';
import NavigationService from './utils/navigation';
import {firebase} from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Map,
  Place,
  PlacePhoto,
  PlaceReview,
  PlaceReviewSubmit,
  PlaceEdit,
  PlaceAddRequest,
  MyPage,
  MyPlace,
  MyReview,
  MyProfileEdit,
  MyProfile,
  MyTerms,
  AuthLoading,
  Login,
} from './pages';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const AppStack = createStackNavigator(
  {
    // @ts-ignore
    Map: Map,
    Place: {
      screen: Place,
      path: 'place/:id',
    },
    PlacePhoto: PlacePhoto,
    PlaceReview: PlaceReview,
    PlaceReviewSubmit: PlaceReviewSubmit,
    PlaceEdit: PlaceEdit,
    PlaceAddRequest: PlaceAddRequest,
    MyPage: MyPage,
    MyPlace: MyPlace,
    MyReview: MyReview,
    MyProfileEdit: MyProfileEdit,
    MyProfile: MyProfile,
    MyTerms: MyTerms,
  },
  {
    initialRouteName: 'Map',
    headerMode: 'screen',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthLoading,
    Login: Login,
    App: {
      screen: AppStack,
      path: '',
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const prefix = 'sailet://';

const App = () => {
  const handleDynamicLink = async (link: {url: string}) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const regexObj = /(https?):\/\/(sailet\.app)\/([^\/]+)\/([^\/\s]+)/g;
    const urlA = await regexObj.exec(link.url);
    if (userToken && urlA) {
      switch (urlA[3]) {
        case 'place':
          NavigationService.navigate('Place', {id: urlA[4]});
          break;
      }
    } else {
      NavigationService.navigate('Auth');
    }
  };

  useEffect(() => {
    firebase.dynamicLinks().onLink(handleDynamicLink);
  }, []);

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppContainer
          uriPrefix={prefix}
          ref={(navRef: NavigationContainerComponent) => {
            NavigationService.setTopLevelNavigator(navRef);
          }}
        />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
