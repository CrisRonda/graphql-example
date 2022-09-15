import { Job, Company } from './db.js';

const rejectIf = (condition) => {
    if (!condition) {
        throw new Error('Unauthorized');
    }
};

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
        createJob: (_root, { input }, { user }) => {
            rejectIf(!user);
            const { title, description } = input;
            return Job.create({
                title,
                description,
                companyId: user.companyId
            });
        },
        deleteJob: async (_root, { id }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(!job.companyId !== user.companyId);
            return Job.delete(id);
        },
        updateJob: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(!job.companyId !== user.companyId);
            return Job.update({ ...input, companyId: user.companyId });
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
