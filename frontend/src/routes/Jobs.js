import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from '../api';
import Job from '../Job';
import UserContext from '../UserContext';
import Paginator from '../Paginator';
import '../styles/Jobs.css';

const Jobs = () => {
  const { user } = useContext(UserContext)
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedJobs, setPaginatedJobs] = useState([]);


  useEffect(() => {
    const getJobs = async () => {
      let jobs = await JoblyApi.getJobs(user.token);
      setJobs(jobs);
    }

    if (user && jobs.length === 0) {
      getJobs();
    }
  }, [user, jobs]);

  if (!user) {
    return <Redirect to="/" />
  }

  if (paginatedJobs.length === 0 || paginatedJobs[0].length === 0) {
    return (
      <>
        <h1>Loading...</h1>
        <div hidden>
          <Paginator
            itemsToPaginate={jobs}
            paginatedItems={paginatedJobs}
            setPaginatedItems={setPaginatedJobs}
            page={page}
            setPage={setPage} />
        </div>
      </>
    )
  }

  else if (jobs.length === 0) {
    return (
      <h1>No Jobs Found</h1>
    )
  }
  else {
    return (
      <div className="Jobs">
        <h1 className="Jobs-Title">Jobs</h1>
        <Paginator
          itemsToPaginate={jobs}
          paginatedItems={paginatedJobs}
          setPaginatedItems={setPaginatedJobs}
          page={page}
          setPage={setPage} />
        {paginatedJobs[page - 1].map(job => <Job key={job.id} job={job} noCompany={true} />)}
        <Paginator
          itemsToPaginate={jobs}
          paginatedItems={paginatedJobs}
          setPaginatedItems={setPaginatedJobs}
          page={page}
          setPage={setPage} />
      </div>
    );
  }
}

export default Jobs;