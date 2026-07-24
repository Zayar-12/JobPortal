import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData, Form } from 'react-router';

import { Building2, MapPin, DollarSign, Calendar, CheckCircle2, ShieldAlert, FileUp } from 'lucide-react';
import { axiosClient } from '../../axios/axiosutils';
import { useContextHook } from '../../Context/context';

const AdminSpecificJob = () => {
  const specificJob = useLoaderData() as any;
  const company = specificJob.company || {};
  
  const { token } = useContextHook();
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const requirementsList = specificJob.requirements?.split('\n') || [specificJob.requirements];

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

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">Loading Job Details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 pb-16">
      
      {/* Job Header Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">Open Position</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{specificJob.title}</h1>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
            <img src={company.logo} alt={company.name} className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-gray-100" />
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Company</p>
              <NavLink to={`/admin/adminspecificCompany/${company.id}`} className="text-sm font-bold text-blue-600 hover:underline">
                {company.name}
              </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><MapPin size={20} /></div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Location</p>
              <p className="text-sm font-bold text-gray-900">{specificJob.location || "Remote / N/A"}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={20} /></div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Salary Offer</p>
              <p className="text-sm font-bold text-gray-900">${specificJob.salary?.toLocaleString() || "Negotiable"}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl"><Calendar size={20} /></div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Deadline</p>
              <p className="text-sm font-bold text-rose-600">{specificJob.deadline || "No deadline"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Requirements Section */}
      <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6">
        <div>
          <h3 className="font-bold text-gray-900 text-base mb-2">Job Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{specificJob.description}</p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 text-base mb-3">Key Requirements</h3>
          <ul className="space-y-2">
            {requirementsList.map((req: string, index: number) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Application Actions */}
      {/* <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100">
        {!token ? (
          <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center gap-2">
            <ShieldAlert size={24} className="text-amber-500" />
            <p className="text-gray-600 text-sm font-medium">Please login to submit your application for this position.</p>
          </div>
        ) : hasApplied ? (
          <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-sm font-bold">
            <CheckCircle2 size={18} /> You have already applied for this job.
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Submit Your Application</h2>
            <Form method="post" encType="multipart/form-data" className="space-y-4">
              <input type="hidden" name="job_id" value={specificJob.id} />
              
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Upload CV / Resume (PDF)</label>
                <input 
                  type="file" 
                  name="cv_path" 
                  accept=".pdf,.doc,.docx"
                  required 
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileUp size={16} /> Submit Application
              </button>
            </Form>
          </div>
        )}
      </div> */}

    </div>
  );
};

export default AdminSpecificJob;