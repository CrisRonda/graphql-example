import { Job, Company } from './db.js';
export const resolvers = {
    Query: {
        jobs: async () => Job.findAll(),
        job: (_, args) => {
            return Job.findById(args.id);
        }
    },

    Job: {
        company: ({ companyId }) => Company.findById(companyId)
    }
};
