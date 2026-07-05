import React from 'react'
import { NavLink, useLoaderData } from 'react-router'
import type { Job } from '../types/types';

const SelectedCategory = () => {
  const selectedCategoryJobs= useLoaderData() ;
  const name=selectedCategoryJobs.name;
  const jobs=selectedCategoryJobs.jobs;

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {
         jobs? <div>
          {
            jobs.map((job:Job)=>(
              <h1 key={job.id}>
                <NavLink to={`/userJobs/${job.id}`}>{job.title}
                  <img src={job.company.logo} alt={job.company.name} 
        className="w-20 h-20 object-cover rounded-full" />
                </NavLink>
              </h1>
            ))
          }
         </div>:"no jobs"
        }
      </div>
    </div>
  )
}

export default SelectedCategory