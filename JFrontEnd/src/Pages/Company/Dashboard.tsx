// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { type Company, type Job } from '../../types/types';
// import { useContextHook } from '../../Context/context';
// import { getCompanyWithJob } from '../../utils/company';

// const Dashboard = () => {
//   const { token, setToken, company_id, setCompanyId } = useContextHook();
//   const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [jobs, setJobs] = useState<Job[] | null>(null);

//   useEffect(() => {

//     if (!token) {
//         setCompanyWithJobs(null);
//         setJobs(null);
//         return;
//     }
//     const initDashboard = async () => {
//       setLoading(true);
     
//       // const storedId = localStorage.getItem('company_id');
//       const storedToken = localStorage.getItem('token');

//       if (!company_id || !storedToken) {
//         setMessage("Authentication failed or No company ID found");
//         setLoading(false);
//         return;
//       }

     
//       setCompanyId(company_id);
 
//       setToken(storedToken);

//       try {

      
//         const data = await getCompanyWithJob(company_id);
        
//         if (data) {
//           setCompanyWithJobs(data);
//           setJobs(data.uploaded_jobs || []);
//         } else {
//           setMessage("Failed to load company data");
//         }
//       } catch (error) {
//         console.error(error);
//         setMessage("An error occurred while fetching data");
//       } finally {
        
//         setLoading(false);
//       }
//     };

//     initDashboard();
//   }, [token]); 

//   if (loading) {
//     return <h1>Loading... <p>{message}</p></h1>;
//   }

//   return (
//     <div>
     
//       {!token && <h2>No Authentication Found</h2>}
      

//       {companyWithJobs ? (
//         <div>

//           {
//             companyWithJobs.background_photo && 
//              (
//             <img src={companyWithJobs.background_photo} alt={companyWithJobs.background_photo} 
//         className="w-32 h-32 object-cover rounded" />
//           )
//           }
//          {
//           companyWithJobs.logo && 
//           (
//             <img src={companyWithJobs.logo} alt={companyWithJobs.name} 
//         className="w-32 h-32 object-cover rounded-full" />
//           )
//          }
//           <h1>{companyWithJobs.name} Dashboard</h1>
//           <div>
//             {jobs && jobs.length > 0 ? (
//               jobs.map((j) => (
//                 <div key={j.id}>
//                   <NavLink to={`/companies/companyJobs/${j.id}`} className="text-blue-500 underline">
//                     {j.title}
//                   </NavLink>
//                 </div>
//               ))
//             ) : (
//               <p>No jobs uploaded yet.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <h1>{message || "No data available"}</h1>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { type Company, type Job } from '../../types/types';
import { useContextHook } from '../../Context/context';
import { getCompanyWithJob } from '../../utils/company';
import { Camera } from 'lucide-react'; // Make sure to install lucide-react

const Dashboard = () => {
  const { token, company_id } = useContextHook();
  const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    if (!token || !company_id) return;
    
    const initDashboard = async () => {
      setLoading(true);
      try {
        const data = await getCompanyWithJob(company_id);
        if (data) {
          setCompanyWithJobs(data);
          setJobs(data.uploaded_jobs || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [token, company_id]);

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gray-200 group">
        <img src={companyWithJobs?.background_photo} className="w-full h-full object-cover" alt="Cover" />
        
        {/* Camera Icon Overlay */}
        <button className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition text-white">
          <Camera size={20} />
        </button>

        {/* Logo Section */}
        <div className="absolute -bottom-16 left-10 group">
          <div className="relative">
            <img src={companyWithJobs?.logo} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" alt="Logo" />
            <button className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition text-white">
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-24 px-10">
        <h1 className="text-2xl font-bold mb-6">{companyWithJobs?.name} Dashboard</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-700 mb-4">Your Active Job Postings</h2>
          {jobs && jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((j) => (
               <NavLink 
  key={j.id} 
  to={`/companies/companyJobs/${j.id}`} 
  className="block p-4 border rounded-lg hover:bg-blue-50 transition flex justify-between items-center"
>
  <span className="font-medium">{j.title}</span>
   
  {/* Added Date Display */}
  <span className="text-sm text-gray-400">
    Posted on: {new Date(j.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}
  </span>
</NavLink>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No jobs uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;