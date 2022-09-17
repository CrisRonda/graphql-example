import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { JOB_QUERY } from '../graphql/templateQueries';

const useJob = (id) => {
    const { data, loading, error } = useQuery(JOB_QUERY, {
        fetchPolicy: 'network-only',
        variables: { id }
    });
    return {
        job: data?.job,
        loading,
        error
    };
};
function JobDetail() {
    const { jobId } = useParams();
    const { job, loading, error } = useJob(jobId);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error 😢</p>;
    }
    return (
        <div>
            <h1 className="title">{job.title}</h1>
            <h2 className="subtitle">
                <Link to={`/companies/${job?.company?.id}`}>
                    {job?.company?.name}
                </Link>
            </h2>
            <div className="box">{job?.description}</div>
        </div>
    );
}

export default JobDetail;
