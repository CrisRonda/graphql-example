import JobList from './JobList';

import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const _jobs = await getJobs();
            setJobs(_jobs);
        };
        getData();
    }, []);

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
