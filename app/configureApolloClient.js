import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import AsyncStorage from '@react-native-community/async-storage';

const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/',
  uri: 'https://api.sailet.app/',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
