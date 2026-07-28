import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useContextHook } from '../../Context/context';
import { axiosClient } from '../../axios/axiosutils';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
        Loading Dashboard Overview...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
            <Sparkles size={13} className="text-blue-500" /> Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm sm:text-base">Monitor platform activity, registered enterprises, talent pool, and active postings.</p>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Companies Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Companies</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{data.companies.length}</h3>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-1">
              <TrendingUp size={14} /> Active partners
            </div>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform shadow-2xs">
            <Building2 size={26} />
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-200 transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{data.users.length}</h3>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-1">
              <TrendingUp size={14} /> Registered talent
            </div>
          </div>
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform shadow-2xs">
            <Users size={26} />
          </div>
        </div>

        {/* Recent Jobs Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Jobs</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{data.jobs.length}</h3>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-1">
              <TrendingUp size={14} /> System listings
            </div>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-2xs">
            <Briefcase size={26} />
          </div>
        </div>

      </div>

      {/* Tables/Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Companies List Column */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Building2 size={18} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Companies</h3>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">
              {data.companies.length}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
            {data.companies.length > 0 ? (
              data.companies.map((comp: any) => (
                <NavLink 
                  key={comp.id} 
                  to={`/admin/adminspecificCompany/${comp.id}`} 
                  className="p-4 bg-gray-50/60 hover:bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between group block"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition truncate">{comp.name}</p>
                    <p className="text-xs text-gray-400 font-medium truncate">{comp.location || "Location not specified"}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-gray-400 transition shrink-0 ml-3">
                    <ChevronRight size={16} />
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="text-center py-16 text-gray-400 text-xs">No companies registered yet.</div>
            )}
          </div>
        </div>

        {/* Users List Column */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users size={18} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Users</h3>
            </div>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">
              {data.users.length}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
            {data.users.length > 0 ? (
              data.users.map((user: any) => (
                <NavLink 
                  key={user.id} 
                  to={`/admin/adminspecificUser/${user.id}`} 
                  className="p-4 bg-gray-50/60 hover:bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-between group block"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 font-medium truncate">{user.email}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-gray-400 transition shrink-0 ml-3">
                    <ChevronRight size={16} />
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="text-center py-16 text-gray-400 text-xs">No users registered yet.</div>
            )}
          </div>
        </div>

        {/* Recent Jobs List Column */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Briefcase size={18} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Recent Jobs</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg">
              {data.jobs.length}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
            {data.jobs.length > 0 ? (
              data.jobs.map((job: any) => (
                <NavLink 
                  key={job.id} 
                  to={`/admin/adminspecificJob/${job.id}`} 
                  className="p-4 bg-gray-50/60 hover:bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between group block"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-emerald-600 transition truncate">{job.title}</p>
                    <p className="text-xs text-gray-400 font-medium">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-gray-400 transition shrink-0 ml-3">
                    <ChevronRight size={16} />
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="text-center py-16 text-gray-400 text-xs">No recent jobs available.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminHome;