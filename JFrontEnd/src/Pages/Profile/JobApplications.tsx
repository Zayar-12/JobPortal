import React from 'react'
import { useLoaderData } from 'react-router'
import type { JobApplicationDataType } from '../../types/types'

// const JobApplications = () => {
//     const jobapplicationsdata=useLoaderData() as JobApplicationDataType[];
//   return (
//     <div>
//         {jobapplicationsdata && jobapplicationsdata.map(j=>(
//             <p key={j.id}>{j.status}--{j.job.title}--{j.job.created_at.toString()}</p>
//         ))}
//     </div>
//   )
// }

// JobApplications.tsx
const JobApplications = () => {
  const data = useLoaderData() as any[];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-sm font-semibold text-gray-600">Job Title</th>
              <th className="pb-3 text-sm font-semibold text-gray-600">Applied Date</th>
              <th className="pb-3 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((j) => (
              <tr key={j.id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium text-gray-900">{j.job.title}</td>
                <td className="py-4 text-gray-600">{new Date(j.job.created_at).toLocaleDateString()}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    j.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                    j.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {j.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplications