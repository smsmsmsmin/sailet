import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';

export default function configureClient() {
  const httpLink = new HttpLink({
    uri: 'https://api.sailet.app/',
    // uri: 'http://localhost:4000',
  });

  const authLink = new ApolloLink((operation, forward) => {
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

}
