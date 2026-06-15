import React from 'react'
import { NavLink, useLoaderData } from 'react-router';
import type { Company } from '../../types/types';

const Dashboard = () => {
     const companyWithJob=useLoaderData() as Company;
  const jobs=companyWithJob.uploaded_jobs
  return (
    <div>
         <h1>{companyWithJob.name} Dashboard</h1>
      <div>{

        jobs && jobs.map((j)=>(
           <div key={j.id}>
            <NavLink to={`/userJobs/${j.id}`}>{j.title}</NavLink>
           </div>
        ))
        }
      </div>
    </div>
  )
}

export default Dashboard