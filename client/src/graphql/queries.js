import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';
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
    const { jobs } = await request(GRAPHQL_URL, query);
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
    const { job } = await request(GRAPHQL_URL, query, { id });
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
    const { company } = await request(GRAPHQL_URL, query, { id });
    return company;
};
export const createJob = async (input) => {
    console.log(1, input);
    const query = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    console.log(2);
    const headers = {
        Authorization: `Bearer ${getAccessToken()}`
    };
    const variables = { input };
    console.log(3, headers, variables);
    const { job } = await request(GRAPHQL_URL, query, variables, headers);
    return job;
};
