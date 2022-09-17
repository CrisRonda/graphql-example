import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../auth';
const GRAPHQL_URL = 'http://localhost:9000/graphql';

const httpLink = new HttpLink({
    uri: GRAPHQL_URL
});

// Middleware to pass token in each HTTP request
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // replace the below implementation to get token from wherever you might have stored it.
    const token = getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
