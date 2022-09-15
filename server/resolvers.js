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
    Mutation: {
        createJob: (_root, { input }) => {
            const { title, companyId, description } = input;
            return Job.create({ title, companyId, description });
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
