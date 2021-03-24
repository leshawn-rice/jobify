import { useContext } from 'react';
import './styles/Job.css';
import UserContext from './UserContext';

const Job = ({ job, noCompany }) => {

  const { user, applyToJob } = useContext(UserContext);

  const isApplied = user.applications.includes(job.id);

  const apply = () => {
    applyToJob(job.id);
  }

  return (
    <div className="Job">
      <h1>{job.title}</h1>
      {noCompany ? <p>{job.companyName}</p> : undefined}
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      <button onClick={apply} className="Job-Apply" disabled={isApplied ? true : false}>
        {isApplied ? 'Applied' : 'Apply'}
      </button>
    </div>
  )
}

export default Job;