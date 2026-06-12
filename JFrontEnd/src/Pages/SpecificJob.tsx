import React from 'react'
import { useLoaderData } from 'react-router'

const SpecificJob = () => {

    const specificJob= useLoaderData();
    const company=specificJob.company;
  return (
    <div>

        <h1>
            {
                company.name
            }
        </h1>
        {specificJob.title}
        
    </div>
  )
}

export default SpecificJob