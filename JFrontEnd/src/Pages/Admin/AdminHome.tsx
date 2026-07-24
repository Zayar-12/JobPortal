// import React, { useEffect, useState } from 'react';
// import { useContextHook } from '../../Context/context';
// import { axiosClient } from '../../axios/axiosutils';
// import { Building2, Users, Briefcase } from 'lucide-react';

// const AdminHome = () => {
//   const { token } = useContextHook();
//   const [data, setData] = useState({
//     companies: [],
//     users: [],
//     jobs: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       setLoading(true);
//       try {
//         const [compRes, userRes, jobRes] = await Promise.all([
//           axiosClient.get('/admin/allCompanies', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
//           axiosClient.get('/admin/allUsers', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
//           axiosClient.get('/admin/allRecentJobs', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
//         ]);

//         setData({
//           companies: compRes.data?.data || compRes.data || [],
//           users: userRes.data?.data || userRes.data || [],
//           jobs: jobRes.data?.data || jobRes.data || []
//         });
//       } catch (error) {
//         console.error("Error fetching admin home data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHomeData();
//   }, [token]);

//   if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-medium">Loading Overview...</div>;

//   return (
//     <div className="max-w-7xl mx-auto p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
//         <p className="text-gray-500 mt-1">Monitor all registered companies, users, and recent system job postings.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
//           <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><Building2 size={24} /></div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Total Companies</p>
//             <h3 className="text-2xl font-bold text-gray-900">{data.companies.length}</h3>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
//           <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={24} /></div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Total Users</p>
//             <h3 className="text-2xl font-bold text-gray-900">{data.users.length}</h3>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
//           <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><Briefcase size={24} /></div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Recent Jobs</p>
//             <h3 className="text-2xl font-bold text-gray-900">{data.jobs.length}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Tables Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Companies Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Building2 size={18} className="text-blue-600" /> All Companies
//           </h3>
//           <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
//             {data.companies.map((comp: any) => (
//               <div key={comp.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
//                 <p className="font-semibold text-gray-900">{comp.name}</p>
//                 <p className="text-xs text-gray-500 mt-0.5">{comp.location || "No location specified"}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Users size={18} className="text-indigo-600" /> All Users
//           </h3>
//           <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
//             {data.users.map((user: any) => (
//               <div key={user.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
//                 <p className="font-semibold text-gray-900">{user.name}</p>
//                 <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Jobs Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Briefcase size={18} className="text-emerald-600" /> Recent Jobs
//           </h3>
//           <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
//             {data.jobs.map((job: any) => (
//               <div key={job.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
//                 <p className="font-semibold text-gray-900">{job.title}</p>
//                 <p className="text-xs text-gray-500 mt-0.5">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminHome;

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useContextHook } from '../../Context/context';
import { axiosClient } from '../../axios/axiosutils';
import { Building2, Users, Briefcase, ChevronRight } from 'lucide-react';

const AdminHome = () => {
  const { token } = useContextHook();
  const [data, setData] = useState({
    companies: [],
    users: [],
    jobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [compRes, userRes, jobRes] = await Promise.all([
          axiosClient.get('/admin/allCompanies', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
          axiosClient.get('/admin/allUsers', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
          axiosClient.get('/admin/allRecentJobs', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { data: [] } })),
        ]);

        setData({
          companies: compRes.data?.data || compRes.data || [],
          users: userRes.data?.data || userRes.data || [],
          jobs: jobRes.data?.data || jobRes.data || []
        });
      } catch (error) {
        console.error("Error fetching admin home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [token]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">Loading Overview...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Monitor all registered companies, users, and recent system job postings.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Building2 size={24} /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Companies</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{data.companies.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Users size={24} /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Users</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{data.users.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><Briefcase size={24} /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Recent Jobs</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{data.jobs.length}</h3>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Companies List */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex flex-col h-[500px]">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-blue-600" /> All Companies ({data.companies.length})
          </h3>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {data.companies.map((comp: any) => (
              <NavLink 
                key={comp.id} 
                to={`/admin/adminspecificCompany/${comp.id}`} 
                className="p-4 bg-gray-50/60 hover:bg-blue-50/40 rounded-2xl border border-gray-100 hover:border-blue-200 transition flex items-center justify-between group block"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition">{comp.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{comp.location || "No location specified"}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition shrink-0" />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex flex-col h-[500px]">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users size={18} className="text-indigo-600" /> All Users ({data.users.length})
          </h3>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {data.users.map((user: any) => (
              <NavLink 
                key={user.id} 
                to={`/admin/adminspecificUser/${user.id}`} 
                className="p-4 bg-gray-50/60 hover:bg-indigo-50/40 rounded-2xl border border-gray-100 hover:border-indigo-200 transition flex items-center justify-between group block"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-600 transition shrink-0" />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Recent Jobs List */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 flex flex-col h-[500px]">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase size={18} className="text-emerald-600" /> Recent Jobs ({data.jobs.length})
          </h3>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {data.jobs.map((job: any) => (
              <NavLink 
                key={job.id} 
                to={`/admin/adminspecificJob/${job.id}`} 
                className="p-4 bg-gray-50/60 hover:bg-emerald-50/40 rounded-2xl border border-gray-100 hover:border-emerald-200 transition flex items-center justify-between group block"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition">{job.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 transition shrink-0" />
              </NavLink>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;