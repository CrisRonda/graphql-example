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
const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        description
        company {
            id
            name
        }
    }
`;
const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;
export const getJobs = async () => {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }
    `;
    const {
        data: { jobs }
    } = await client.query({ query, fetchPolicy: 'no-cache' });
    return jobs;
};

export const getJobById = async (id) => {
    const {
        data: { job }
    } = await client.query({ query: JOB_QUERY, variables: { id } });
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
                ...JobDetail
            }
        }
        ${JOB_DETAIL_FRAGMENT}
    `;
    const headers = {
        Authorization: `Bearer ${getAccessToken()}`
    };
    const variables = { input };
    const {
        data: { job }
    } = await client.mutate({
        mutation,
        variables,
        context: {
            headers
        },
        update: (cache, { data: { job } }) => {
            console.log('writing....', { job });
            cache.writeQuery({
                query: JOB_QUERY,
                variables: { id: job.id },
                data: { job }
            });
        }
    });
    return job;
};
