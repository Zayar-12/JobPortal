// import React from 'react'
// import { useLoaderData, NavLink } from 'react-router'
// import type { Company } from '../types/types'

// const SpecificCompany = () => {

//   const companyWithJob=useLoaderData() as Company;
//   const jobs=companyWithJob.uploaded_jobs
//   return (
//     <div>
//       <h1>{companyWithJob.name}</h1>
//       <img src={companyWithJob.logo} alt={companyWithJob.name} 
//         className="w-20 h-20 object-cover rounded-full" />
//          <img src={companyWithJob.background_photo} alt={companyWithJob.background_photo} 
//         className="w-20 h-20 object-cover rounded" />
//       <div>{

//         jobs && jobs.map((j)=>(
//            <div key={j.id}>
//             <NavLink to={`/userJobs/${j.id}`}>{j.title}</NavLink>
//            </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default SpecificCompany


import { NavLink, useLoaderData } from "react-router";
import type { Company } from "../types/types";

const SpecificCompany = () => {
  const companyWithJob = useLoaderData() as Company;
  const jobs = companyWithJob.uploaded_jobs;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gray-200">
        <img
          src={companyWithJob.background_photo}
          alt="Company Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-10 flex items-end gap-6">
          <div className="bg-white p-2 rounded-lg shadow-lg border">
            <img
              src={companyWithJob.logo}
              alt={companyWithJob.name}
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 bg-white/80 px-4 py-1 rounded shadow-sm">
              {companyWithJob.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto mt-24 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Company Info & About */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Company Details</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>Location:</strong> {companyWithJob.location || "Not specified"}</p>
              <p><strong>Website:</strong> 
                <a href={companyWithJob.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline ml-1">
                  {companyWithJob.website || "N/A"}
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {companyWithJob.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Right Side: Open Positions */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs && jobs.length > 0 ? (
              jobs.map((j) => (
                <div
                  key={j.id}
                  className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-400 transition"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{j.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">Posted recently</p>
                  </div>
                  <NavLink
                    to={`/userJobs/${j.id}`}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Job
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="p-10 bg-white rounded-xl border text-center text-gray-500">
                No open positions at this time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCompany;