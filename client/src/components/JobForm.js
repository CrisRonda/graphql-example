import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CREATE_JOB_MUTATION, JOB_QUERY } from '../graphql/templateQueries';

const useCreateJob = () => {
    const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);

    const createNewJob = async (input) => {
        const {
            data: { job }
        } = await mutate({
            variables: {
                input
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
    return { createNewJob, loading };
};
function JobForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { createNewJob, loading } = useCreateJob();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const job = await createNewJob({ title, description });
            navigate(`/jobs/${job.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="title">New Job</h1>
            <div className="box">
                <form>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                rows={10}
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button
                                disabled={loading}
                                className="button is-link"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobForm;
