import React from 'react'
import { useLoaderData } from 'react-router'
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
              <h1 key={job.id}>{job.title}</h1>
            ))
          }
         </div>:"no jobs"
        }
      </div>
    </div>
  )
}

export default SelectedCategory