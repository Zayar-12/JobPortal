import React from 'react'
import { useLoaderData } from 'react-router'
import type { Company } from '../types/types'

const SpecificCompany = () => {

  const companyWithJob=useLoaderData() as Company;
  const jobs=companyWithJob.uploaded_jobs
  return (
    <div>
      <h1>{companyWithJob.name}</h1>
      <div>{

        jobs && jobs.map((j)=>(
          <h1>{j.title}</h1>
        ))
        }
      </div>
    </div>
  )
}

export default SpecificCompany