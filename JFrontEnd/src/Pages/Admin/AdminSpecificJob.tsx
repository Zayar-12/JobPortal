import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  ChevronRight,
  FileText,
  ListChecks,
  CheckCircle2
} from 'lucide-react';
import { axiosClient } from '../../axios/axiosutils';
import { useContextHook } from '../../Context/context';

const AdminSpecificJob = () => {
  const specificJob = useLoaderData() as any;
  const company = specificJob.company || {};
  
  const { token } = useContextHook();
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Format requirements into a clean list, filtering out any empty strings
  const requirementsList = specificJob.requirements
    ? specificJob.requirements.split('\n').filter((req: string) => req.trim() !== '')
    : [];

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
        Loading Job Details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500">
        <NavLink to="/admin/dashboard" className="hover:text-blue-600 transition">Dashboard</NavLink>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="text-gray-900 truncate max-w-[200px] sm:max-w-xs">{specificJob.title}</span>
      </nav>

      {/* Hero Header Card */}
      <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Open Position
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {specificJob.title}
            </h1>
          </div>
          
          {/* Company Badge Card */}
          <div className="flex items-center gap-4 bg-gray-50/85 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/60 shadow-xs w-full lg:w-auto">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-gray-100 shadow-2xs shrink-0" 
            />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Company</p>
              <NavLink 
                to={`/admin/adminspecificCompany/${company.id}`} 
                className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition truncate block"
              >
                {company.name}
              </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100/80 flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><MapPin size={20} /></div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Location</p>
              <p className="text-sm font-bold text-gray-900 truncate">{specificJob.location || "Remote / N/A"}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100/80 flex items-center gap-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0"><DollarSign size={20} /></div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Salary Offer</p>
              <p className="text-sm font-bold text-gray-900 truncate">
                {specificJob.salary ? `$${specificJob.salary.toLocaleString()}` : "Negotiable"}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100/80 flex items-center gap-3.5">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0"><Calendar size={20} /></div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Deadline</p>
              <p className="text-sm font-bold text-rose-600 truncate">{specificJob.deadline || "No deadline"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Single Card Container for Description & Requirements Serially */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
        
        {/* Job Description Subsection */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">About the Role</h2>
              <p className="text-xs text-gray-400">Overview and core responsibilities</p>
            </div>
          </div>
          
          <div className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line break-words pl-1">
            {specificJob.description}
          </div>
        </div>

        {/* Divider between sections */}
        <div className="border-t border-gray-100 pt-2" />

        {/* Key Requirements Subsection */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs">
              <ListChecks size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Requirements & Qualifications</h2>
              <p className="text-xs text-gray-400">Skills and criteria needed</p>
            </div>
          </div>

          {requirementsList.length > 0 ? (
            <ul className="space-y-3 pt-1">
              {requirementsList.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50/60 p-4 rounded-2xl border border-gray-100 leading-normal break-words">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="flex-grow font-medium">{req}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic bg-gray-50/60 p-4 rounded-2xl border border-gray-100">No specific requirements mentioned.</p>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminSpecificJob;