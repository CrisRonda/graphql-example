import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { COMPANY_BY_ID_QUERY } from '../graphql/templateQueries';
import JobList from './JobList';

const useCompany = (id) => {
    const { data, loading, error } = useQuery(COMPANY_BY_ID_QUERY, {
        fetchPolicy: 'network-only',
        variables: { id }
    });
    return {
        company: data?.company,
        loading,
        error
    };
};
function CompanyDetail() {
    const { companyId } = useParams();

    const { company, loading, error } = useCompany(companyId);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error 😢</p>;
    }

    return (
        <div>
            <h1 className="title">{company.name}</h1>
            <div className="box">{company.description}</div>
            <h5 className="title is-5">Jobs at {company.name}</h5>
            <JobList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetail;
