import { gql } from '@apollo/client';

export const JOB_DETAIL_FRAGMENT = gql`
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
export const ALL_JOBS_QUERY = gql`
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
export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;
export const COMPANY_BY_ID_QUERY = gql`
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

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;
