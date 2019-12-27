import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import App from "./App";
import configureClient from "./configureApolloClient";
import { BrowserRouter } from "react-router-dom";

const client = configureClient();

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default Root;
