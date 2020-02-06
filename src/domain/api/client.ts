import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { apiTokenSelector } from '../auth/state/AuthenticationSelectors';
import { store } from '../app/state/AppStore';
import { showExpiredSessionPrompt } from '../app/state/ui/UIActions';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URI,
});

const errorLink = onError(() => {
  // Now show session timeout for all kind of error.
  // In near future when backend comeup with better
  // statusCode from error body
  // TODO: Error can be handle better here.
  store.dispatch(showExpiredSessionPrompt());
});
const authLink = setContext((_, { headers }) => {
  const token = apiTokenSelector(store.getState());
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
