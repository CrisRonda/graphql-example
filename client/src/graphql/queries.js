import { client } from './setup';
import {
    ALL_JOBS_QUERY,
    COMPANY_BY_ID_QUERY,
    CREATE_JOB_MUTATION,
    JOB_QUERY
} from './templateQueries';

export const getJobs = async () => {
    const {
        data: { jobs }
    } = await client.query({ query: ALL_JOBS_QUERY, fetchPolicy: 'no-cache' });
    return jobs;
};

export const getJobById = async (id) => {
    const {
        data: { job }
    } = await client.query({ query: JOB_QUERY, variables: { id } });
    return job;
};

export const getCompanyById = async (id) => {
    const {
        data: { company }
    } = await client.query({ query: COMPANY_BY_ID_QUERY, variables: { id } });
    return company;
};
export const createJob = async (input) => {
    const variables = { input };
    const {
        data: { job }
    } = await client.mutate({
        mutation: CREATE_JOB_MUTATION,
        variables,

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
