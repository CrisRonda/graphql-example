import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        jobs: async () => Job.findAll(),
        job: (_, args) => {
            return Job.findById(args.id);
        },
        company: (_, args) => {
            return Company.findById(args.id);
        }
    },

    Company: {
        jobs: (company) => {
            return Job.findAll((job) => job.companyId === company.id);
        }
    },

    Job: {
        company: ({ companyId }) => Company.findById(companyId)
    }
};
