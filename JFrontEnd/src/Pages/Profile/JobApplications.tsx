import React from 'react'
import { useLoaderData } from 'react-router'
import type { JobApplicationDataType } from '../../types/types'

const JobApplications = () => {
    const jobapplicationsdata=useLoaderData() as JobApplicationDataType[];
  return (
    <div>
        {jobapplicationsdata && jobapplicationsdata.map(j=>(
            <p key={j.id}>{j.status}--{j.job.title}--{j.job.created_at.toString()}</p>
        ))}
    </div>
  )
}

export default JobApplications