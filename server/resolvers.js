import { Job, Company } from './db.js';
export const resolvers = {
    Query: {
        jobs: async () => Job.findAll()
    },

    Job: {
        company: ({ companyId }) => Company.findById(companyId)
    }
};
