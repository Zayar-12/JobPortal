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
import React, { useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import type { Company } from '../types/types';
import { Building2, MapPin, Globe, Briefcase, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const SpecificCompany = () => {
  const companyWithJob = useLoaderData() as Company;
  const jobs = companyWithJob.uploaded_jobs;

  // State for toggling long description
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionText = companyWithJob.description || "No description provided.";
  const isLongText = descriptionText.length > 250; // Character limit threshold

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-gray-100 pb-8">
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <div className="relative h-64 md:h-80 w-full bg-gray-900 rounded-3xl overflow-hidden shadow-sm">
            <img
              src={companyWithJob.background_photo || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"}
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4 -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="w-32 h-32 bg-white p-3 rounded-3xl shadow-xl border-4 border-white flex items-center justify-center shrink-0">
                {companyWithJob.logo ? (
                  <img
                    src={companyWithJob.logo}
                    alt={companyWithJob.name}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <Building2 size={40} className="text-gray-400" />
                )}
              </div>
              
              <div className="bg-white/80 backdrop-blur-md sm:bg-transparent p-2 sm:p-0 rounded-2xl">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {companyWithJob.name}
                  </h1>
                  <span className="bg-blue-600 text-white p-1 rounded-full shadow-sm" title="Verified Company">
                    <Sparkles size={13} />
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-600" /> {companyWithJob.location || "Location not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Combined Company Info & About Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            
            {/* Quick Details (Location & Website) */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Building2 size={18} className="text-blue-600" /> Company Info
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Location</span>
                    <span className="font-medium text-gray-800">{companyWithJob.location || "Not specified"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <Globe size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="overflow-hidden">
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Website</span>
                    {companyWithJob.website ? (
                      <a 
                        href={companyWithJob.website} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-medium text-blue-600 hover:underline truncate block"
                      >
                        {companyWithJob.website}
                      </a>
                    ) : (
                      <span className="font-medium text-gray-800">N/A</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* About Section with Collapsible Long Text */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base">About Company</h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className={`${!isExpanded && isLongText ? 'line-clamp-6' : ''}`}>
                  {descriptionText}
                </p>
                {isLongText && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp size={14} /></>
                    ) : (
                      <>Read More <ChevronDown size={14} /></>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Open Positions */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
              <Briefcase className="text-blue-600" size={24} /> Open Positions
            </h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-100">
              {jobs?.length || 0} Openings
            </span>
          </div>

          <div className="space-y-4">
            {jobs && jobs.length > 0 ? (
              jobs.map((j) => (
                <div
                  key={j.id}
                  className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-blue-300 hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {j.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                      <MapPin size={13} /> {j.location || companyWithJob.location || 'Remote'}
                    </p>
                  </div>
                  <NavLink
                    to={`/userJobs/${j.id}`}
                    className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl text-xs font-semibold transition flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
                  >
                    View Job <ArrowRight size={14} />
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="p-16 bg-white rounded-3xl border border-gray-100 text-center space-y-3">
                <Briefcase size={40} className="mx-auto text-gray-300" />
                <p className="text-gray-500 font-medium">No open positions at this time.</p>
                <p className="text-xs text-gray-400">Please check back later for future opportunities.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpecificCompany;