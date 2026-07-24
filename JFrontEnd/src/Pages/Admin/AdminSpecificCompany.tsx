import React from 'react';
import { NavLink, useLoaderData } from 'react-router';

import { Building2, MapPin, Globe, Briefcase, ChevronRight, FileText } from 'lucide-react';
import type { Company } from '../../types/types';

const AdminSpecificCompany = () => {
  const companyWithJob = useLoaderData() as Company;
  const jobs = companyWithJob.uploaded_jobs;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 pb-16">
      
      {/* Cover & Header Card */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="relative h-56 w-full bg-gray-100">
          {companyWithJob.background_photo ? (
            <img
              src={companyWithJob.background_photo}
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90" />
          )}
        </div>

        <div className="px-8 pb-8 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 bg-white p-2 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center shrink-0">
              <img
                src={companyWithJob.logo}
                alt={companyWithJob.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="mb-1">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Verified Company</span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{companyWithJob.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Overview & Metadata */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">Company Profile</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                <span>{companyWithJob.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Globe size={18} className="text-blue-600 shrink-0" />
                <a href={companyWithJob.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                  {companyWithJob.website || "No website provided"}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">About Company</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {companyWithJob.description || "No description provided for this company yet."}
            </p>
          </div>
        </div>

        {/* Right Side: Open Positions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" /> Active Job Openings
            </h2>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
              {jobs?.length || 0} Jobs
            </span>
          </div>

          <div className="space-y-3">
            {jobs && jobs.length > 0 ? (
              jobs.map((j: any) => (
                <div
                  key={j.id}
                  className="p-4 bg-gray-50/60 rounded-xl border border-gray-100 hover:border-blue-300 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-base">{j.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FileText size={13} /> Posted recently
                    </p>
                  </div>
                  <NavLink
                    to={`/admin/adminspecificJob/${j.id}`}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    View Details <ChevronRight size={14} />
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                <p className="text-gray-400 text-sm font-medium">No open positions available from this company.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSpecificCompany;