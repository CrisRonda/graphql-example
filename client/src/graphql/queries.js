import { request, gql } from 'graphql-request';

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