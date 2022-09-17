import JobList from './JobList';
import { useQuery } from '@apollo/client';
import { ALL_JOBS_QUERY } from '../graphql/templateQueries';
const useJobs = () => {
    const { data, loading, error } = useQuery(ALL_JOBS_QUERY, {
        fetchPolicy: 'network-only'
    });
    return {
        jobs: data?.jobs,
        loading,
        error
    };
};
function JobBoard() {
    const { jobs, loading, error } = useJobs();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error 😢</p>;
    }
    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
