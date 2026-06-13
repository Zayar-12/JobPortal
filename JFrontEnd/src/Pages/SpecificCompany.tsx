import React from 'react'
import { useLoaderData, NavLink } from 'react-router'
import type { Company } from '../types/types'

const SpecificCompany = () => {

  const companyWithJob=useLoaderData() as Company;
  const jobs=companyWithJob.uploaded_jobs
  return (
    <div>
      <h1>{companyWithJob.name}</h1>
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

export default SpecificCompany