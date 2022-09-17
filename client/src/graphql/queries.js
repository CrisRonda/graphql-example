import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';
import { setContext } from '@apollo/client/link/context';

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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export const getJobs = async () => {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;
    const {
        data: { jobs }
    } = await client.query({ query });
    return jobs;
};

export const getJobById = async (id) => {
    const query = gql`
        query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;
    const {
        data: { job }
    } = await client.query({ query, variables: { id } });
    return job;
};

export const getCompanyById = async (id) => {
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                name
                description
                jobs {
                    title
                    id
                }
            }
        }
    `;
    const {
        data: { company }
    } = await client.query({ query, variables: { id } });
    return company;
};
export const createJob = async (input) => {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const headers = {
        Authorization: `Bearer ${getAccessToken()}`
    };
    console.log(headers);
    const variables = { input };
    const {
        data: { job }
    } = await client.mutate({
        mutation,
        variables,
        context: {
            headers
        }
    });
    return job;
};
