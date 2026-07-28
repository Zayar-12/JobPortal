import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { Form } from 'react-router';
import { useContextHook } from '../Context/context';
import { axiosClient } from '../axios/axiosutils';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Lock, 
  Check, 
  ListChecks,
  Globe,
  Briefcase,
  Sparkles
} from 'lucide-react';

const SpecificJob = () => {
  const specificJob = useLoaderData() as any;
  const company = specificJob.company || {};
  
  const { setToken, token } = useContextHook();
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Requirements formatting list
  const requirementsList = specificJob.requirements?.split('\n').filter((item: string) => item.trim() !== '') || [specificJob.requirements];

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Company Banner / Cover Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full bg-gray-900">
          <img
            src={company.background_photo || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"}
            alt="Company Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Company Profile Row */}
        <div className="px-6 md:px-8 pb-6 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 bg-white p-2 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <Building2 size={36} className="text-gray-400" />
              )}
            </div>
            
            <div className="bg-white/90 backdrop-blur-md sm:bg-transparent p-2 sm:p-0 rounded-xl space-y-1">
              <div className="flex items-center gap-2">
                <NavLink 
                  to={`/allcompanies/${company.id}`}
                  className="text-xl md:text-2xl font-extrabold text-gray-900 hover:text-blue-600 transition tracking-tight"
                >
                  {company.name}
                </NavLink>
                <span className="bg-blue-600 text-white p-1 rounded-full shadow-sm" title="Verified Company">
                  <Sparkles size={12} />
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <MapPin size={13} className="text-blue-600" /> {company.location || specificJob.location}
              </p>
            </div>
          </div>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
            >
              <Globe size={14} className="text-blue-600" /> Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Main Job Details Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
        
        {/* Job Title Header */}
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {specificJob.title}
          </h1>
          <p className="text-xs font-semibold text-gray-400 mt-1">Posted Position</p>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Location</p>
              <p className="font-bold text-gray-900 text-xs mt-0.5">{specificJob.location || "Remote"}</p>
            </div>
          </div>

          <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <DollarSign size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Salary</p>
              <p className="font-bold text-gray-900 text-xs mt-0.5">
                {specificJob.salary ? `$${specificJob.salary.toLocaleString()}` : "Negotiable"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Deadline</p>
              <p className="font-bold text-rose-600 text-xs mt-0.5">{specificJob.deadline || "Open"}</p>
            </div>
          </div>
        </div>

        {/* Description & Requirements */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <FileText className="text-blue-600" size={18} /> Job Description
            </h3>
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                {specificJob.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <ListChecks className="text-blue-600" size={18} /> Requirements & Qualifications
            </h3>
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <ul className="space-y-2.5 text-gray-600 text-xs sm:text-sm">
                {requirementsList.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{req.replace(/^[•\-\*]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company Overview Card */}
          {company.description && (
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Briefcase className="text-blue-600" size={18} /> About {company.name}
              </h3>
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {company.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Application Action Section */}
        <div className="pt-4 border-t border-gray-100">
          {!token ? (
            <div className="text-center py-8 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
              <Lock className="mx-auto text-gray-400 mb-1" size={22} />
              <p className="text-gray-800 font-bold text-sm">Authentication Required</p>
              <p className="text-gray-500 text-xs">Please login to your account to apply for this position.</p>
            </div>
          ) : hasApplied ? (
            <div className="flex items-center justify-center gap-2.5 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
              <CheckCircle2 size={20} className="shrink-0" />
              <span className="font-bold text-xs sm:text-sm">You have already successfully applied for this job.</span>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Upload className="text-blue-600" size={18} /> Submit Your Application
              </h3>
              <Form method="post" encType="multipart/form-data" className="space-y-4">
                <input type="hidden" name="job_id" value={specificJob.id} />
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Upload CV (PDF / Image)
                  </label>
                  <input 
                    type="file" 
                    name="cv_path" 
                    required 
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer bg-white border border-gray-200 rounded-2xl p-2 shadow-2xs transition" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition active:scale-[0.99] cursor-pointer text-sm"
                >
                  Apply Now
                </button>
              </Form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SpecificJob;