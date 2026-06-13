import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import { Form } from "react-router"
import { useContextHook } from '../Context/context';
const SpecificJob = () => {

    const specificJob= useLoaderData();
    const company=specificJob.company;
   const {setToken,token}=useContextHook();
    const[path,setPath]=useState("");
  return (
    <div>

        <h1>
            {
                company.name
            }
        </h1>
        {specificJob.title}

      {
        token?<div>
              <h1>Form</h1>
         <Form method='post' className="space-y-6">
            <h1>{path}</h1>
            <input type="text" name='job_id' value={specificJob.id} /><br />
          <input type="text" name='cv_path' placeholder='fill the lin of the cv' required onChange={(e)=>{setPath(e.target.value)}} />

          <button 
            type='submit'
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition active:scale-[0.98]"
          >
           Apply here
          </button>
        </Form>
        </div>:
        <h1>
            Please login to apply this job
        </h1>
      }
    </div>
  )
}

export default SpecificJob