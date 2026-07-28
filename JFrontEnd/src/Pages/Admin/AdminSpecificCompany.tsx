import React from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { 
  MapPin, 
  Globe, 
  Briefcase, 
  ChevronRight, 
  FileText, 
  Building2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { Company } from '../../types/types';

const AdminSpecificCompany = () => {
  const companyWithJob = useLoaderData() as Company;
  const jobs = companyWithJob.uploaded_jobs;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Modern Cover & Header Card */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-60 w-full bg-gray-100">
          {companyWithJob.background_photo ? (
            <img
              src={companyWithJob.background_photo}
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay Section */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Logo - Fully contained and clear */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white p-2 rounded-2xl shadow-lg border-2 border-white flex items-center justify-center shrink-0">
              <img
                src={companyWithJob.logo}
                alt={companyWithJob.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="space-y-1 sm:mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 shadow-2xs">
                <Sparkles size={12} className="text-blue-500" /> Verified Partner Company
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {companyWithJob.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* About Company Section - Expanded to Full Width */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
          About Company
        </h3>
        <div className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line break-words bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          {companyWithJob.description || "No description provided for this company yet."}
        </div>
      </div>

      {/* Main Grid Layout for Profile Details & Active Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Metadata Profile Card (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
              Company Profile
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3.5 text-gray-600 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0"><MapPin size={18} /></div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</p>
                  <p className="font-semibold text-gray-800 truncate">{companyWithJob.location || "Location not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-gray-600 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0"><Globe size={18} /></div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Website</p>
                  {companyWithJob.website ? (
                    <a 
                      href={companyWithJob.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-semibold text-blue-600 hover:underline truncate flex items-center gap-1"
                    >
                      {companyWithJob.website} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-400">No website</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Job Openings (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Active Job Openings</h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-100">
              {jobs?.length || 0} Open Positions
            </span>
          </div>

          <div className="space-y-4">
            {jobs && jobs.length > 0 ? (
              jobs.map((j: any) => (
                <div
                  key={j.id}
                  className="group p-5 bg-gray-50/60 hover:bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition truncate">
                      {j.title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                      <FileText size={13} className="text-blue-500" /> Active position ready for application review
                    </p>
                  </div>
                  
                  <NavLink
                    to={`/admin/adminspecificJob/${j.id}`}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm shadow-blue-600/20"
                  >
                    View Details <ChevronRight size={15} />
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-6 space-y-2">
                <Building2 size={32} className="text-gray-300 mx-auto" />
                <p className="text-gray-600 font-bold text-sm">No open positions available</p>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">This company has not uploaded or published any active job listings at the moment.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSpecificCompany;