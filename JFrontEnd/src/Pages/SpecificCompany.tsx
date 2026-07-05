import React from 'react'
import { useLoaderData, NavLink } from 'react-router'
import type { Company } from '../types/types'

const SpecificCompany = () => {

  const companyWithJob=useLoaderData() as Company;
  const jobs=companyWithJob.uploaded_jobs
  return (
    <div>
      <h1>{companyWithJob.name}</h1>
      <img src={companyWithJob.logo} alt={companyWithJob.name} 
        className="w-20 h-20 object-cover rounded-full" />
         <img src={companyWithJob.background_photo} alt={companyWithJob.background_photo} 
        className="w-20 h-20 object-cover rounded" />
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