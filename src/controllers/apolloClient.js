import fetch from 'node-fetch';
//import sessionStorage from "sessionStorage";
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import apolloLogger from 'apollo-link-logger';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import dotenv from 'dotenv';

dotenv.config();

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected
            },
          };
          cache.writeData({ data });
          return null;
        },
      },
    },
    defaults: {
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: true,
      }
    },
});

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
//    const token = sessionStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    const context = {
        headers: {
            ...headers,
//            Authorization: token ? `Bearer ${token}` : "",
        }
    };
    return context;
});

const uri = process.env.GRAPHQL_URI+":"+process.env.GRAPHQL_PORT+"/graphql";
const httpLink = new HttpLink({ uri, fetch });

const link = ApolloLink.from([
  // apolloLogger,
  errorLink, 
  stateLink, 
  authLink, 
  httpLink
]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
    cache,
    stateLink,
    link,
    defaultOptions: defaultOptions,
});

module.exports = apolloClient;