// import React from 'react'
// import { NavLink, useLoaderData } from 'react-router'
// import type { Job } from '../types/types';

// const SelectedCategory = () => {
//   const selectedCategoryJobs= useLoaderData() ;
//   const name=selectedCategoryJobs.name;
//   const jobs=selectedCategoryJobs.jobs;

//   return (
//     <div>
//       <h1>{name}</h1>
//       <div>
//         {
//          jobs? <div>
//           {
//             jobs.map((job:Job)=>(
//               <h1 key={job.id}>
//                 <NavLink to={`/userJobs/${job.id}`}>{job.title}
//                   <img src={job.company.logo} alt={job.company.name} 
//         className="w-20 h-20 object-cover rounded-full" />
//                 </NavLink>
//               </h1>
//             ))
//           }
//          </div>:"no jobs"
//         }
//       </div>
//     </div>
//   )
// }

// export default SelectedCategory

import { NavLink, useLoaderData } from "react-router";
import type { Job } from "../types/types";

const SelectedCategory = () => {
  const selectedCategoryJobs = useLoaderData() as any;
  const name = selectedCategoryJobs?.name;
  const jobs = selectedCategoryJobs?.jobs as Job[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Jobs in <span className="text-blue-600">{name}</span>
        </h1>
        <p className="text-gray-500 mt-2">
          {jobs?.length > 0 ? `We found ${jobs.length} jobs in this category.` : "No current job openings in this category."}
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job: Job) => (
            <div 
              key={job.id} 
              className="flex items-center p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img 
                src={job.company.logo} 
                alt={job.company.name} 
                className="w-16 h-16 object-cover rounded-full border border-gray-100" 
              />
              
              <div className="ml-5 flex-grow">
                <NavLink 
                  to={`/userJobs/${job.id}`} 
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                >
                  {job.title}
                </NavLink>
                <p className="text-sm text-gray-500">{job.company.name}</p>
              </div>

              <NavLink 
                to={`/userJobs/${job.id}`} 
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Apply Now
              </NavLink>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No active jobs found for this category at the moment.</p>
            <NavLink to="/jobbycategory" className="text-blue-600 hover:underline mt-2 inline-block">
              Browse other categories
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedCategory;