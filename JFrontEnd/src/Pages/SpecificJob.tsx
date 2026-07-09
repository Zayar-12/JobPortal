import React, { useEffect, useState } from 'react'
import { NavLink, useLoaderData } from 'react-router'
import { Form } from "react-router"
import { useContextHook } from '../Context/context';
import { axiosClient } from '../axios/axiosutils';
const SpecificJob = () => {

    const specificJob= useLoaderData();
    const company=specificJob.company;
    
   const {setToken,token,user_id}=useContextHook();
    const[path,setPath]=useState("");
    const [hasApplied, setHasApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axiosClient.get(`/existingJobApplication/${specificJob.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setHasApplied(res.data.hasApplied);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token, specificJob.id]);
    if (loading) return <div>Loading...</div>;
  return (
  <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
  {/* Header Section */}
  <div className="flex items-center justify-between mb-8 pb-6 border-b">
    <div className="flex items-center gap-4">
      <img src={company.logo} alt={company.name} className="w-16 h-16 object-cover rounded-full shadow-sm" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{specificJob.title}</h1>
        <NavLink to={`/allcompanies/${company.id}`} className="text-blue-600 hover:underline text-sm font-medium">
          {company.name}
        </NavLink>
      </div>
    </div>
    <img src={company.background_photo} alt="Background" className="w-24 h-16 object-cover rounded-lg" />
  </div>

  {/* Job Action Section */}
  <div className="mt-6">
    {!token ? (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-600 font-medium">Please login to apply for this job</p>
      </div>
    ) : hasApplied ? (
      <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
        <span className="font-bold">✓ You have already applied for this job.</span>
      </div>
    ) : (
      <div className="bg-gray-50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Submit your application</h2>
        <Form method='post' encType="multipart/form-data" className="space-y-4">
          <input type="hidden" name='job_id' value={specificJob.id} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF/Image)</label>
            <input 
              type="file" 
              name='cv_path' 
              required 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            />
          </div>

          <button 
            type='submit'
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition active:scale-[0.98]"
          >
            Apply Now
          </button>
        </Form>
      </div>
    )}
  </div>
</div>
  )
}

export default SpecificJob