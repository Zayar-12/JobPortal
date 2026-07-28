import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Form } from 'react-router';
import { axiosClient } from '../../axios/axiosutils';
import type { Job, JobApplicationDataType } from '../../types/types';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Edit3, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  ExternalLink, 
  Save, 
  X, 
  AlertCircle 
} from 'lucide-react';

const CompanyJob = () => {
  const jobData = useLoaderData() as any;
  const [job, setJob] = useState<Job>(jobData);
  const [jobApplication, setJobApplication] = useState<JobApplicationDataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const token = localStorage.getItem('token');
      try {
        await axiosClient.delete(`/companyJobs/${job.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Job deleted successfully");
        navigate("/companies/dashboard");
      } catch (error) {
        console.error(error);
        alert("Failed to delete the job");
      }
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await axiosClient.put(`/jobApplication/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Application ${status} successfully`);
      fetchSepcificJobApplication();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData);
    const token = localStorage.getItem('token');

    try {
      await axiosClient.put(`/companyJobs/${job.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Job updated successfully");
      setIsEditing(false);
      navigate("/companies/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update the job");
    }
  };

  const fetchSepcificJobApplication = async () => {
    const job_id = job.id;
    const token = localStorage.getItem('token');
    try {
      const res = await axiosClient.get(`/companyJobApplications/${job_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res) { setError("Res error") }
      setJobApplication(res.data.data);
    } catch (error) {
      setError("Fetch Fail")
    }
  }

  useEffect(() => { fetchSepcificJobApplication(); }, []);

  // Helper for Status Badge Styling in applications
  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <CheckCircle2 size={14} /> Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <XCircle size={14} /> Rejected
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto bg-gray-50/50 min-h-screen pb-20">
      
      {/* Job Details Section */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

        {isEditing ? (
          <Form onSubmit={handleUpdate} className="flex flex-col gap-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xl font-bold text-gray-900">Edit Job Posting</h2>
              <p className="text-xs text-gray-400 mt-0.5">Update vacancy specifications below.</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Job Title</label>
              <input name="title" defaultValue={job.title} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
              <textarea name="description" defaultValue={job.description} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm resize-y" rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Salary</label>
                <input name="salary" defaultValue={job.salary} type="number" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Location</label>
                <input name="location" defaultValue={job.location} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Requirements</label>
              <textarea name="requirements" defaultValue={job.requirements} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm resize-y" rows={3} />
            </div>

            <input name="category_id" type="hidden" defaultValue={job.category_id} />

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Deadline</label>
              <input name="deadline" type="date" defaultValue={job.deadline} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer">
                <Save size={16} /> Save Changes
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold text-xs transition flex items-center gap-2 cursor-pointer">
                <X size={16} /> Cancel
              </button>
            </div>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                <Briefcase className="text-blue-600 shrink-0" size={30} />
                <span>{job.title}</span>
              </h1>
              <div className="flex gap-3">
                <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer text-xs">
                  <Edit3 size={15} /> Edit Job
                </button>
                <button onClick={handleDelete} className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition flex items-center gap-2 border border-red-200 cursor-pointer text-xs">
                  <Trash2 size={15} /> Delete Job
                </button>
              </div>
            </div>

            {/* Meta Tags Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Salary Offer</p>
                  <p className="text-sm font-bold text-gray-800">{job.salary ? job.salary.toLocaleString() : "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-sm font-bold text-gray-800 truncate max-w-xs">{job.location || "Remote / Unspecified"}</p>
                </div>
              </div>
            </div>

            {/* Long Text Sections with controlled readability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide text-blue-600">
                  <FileText size={16} /> Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50/50 p-5 rounded-2xl border border-gray-100 max-h-60 overflow-y-auto">
                  {job.description || "No description provided."}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide text-blue-600">
                  <CheckCircle2 size={16} /> Requirements
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50/50 p-5 rounded-2xl border border-gray-100 max-h-60 overflow-y-auto">
                  {job.requirements || "No requirements specified."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Applications Section */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <User size={20} className="text-blue-600" /> Candidate Applications
            </h2>
            <p className="text-xs text-gray-400 mt-1">Review profiles and manage incoming applicant statuses.</p>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl border border-blue-100 shadow-xs">
            {jobApplication?.length || 0} Applications
          </span>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}
        
        {jobApplication && jobApplication.length > 0 ? (
          <div className="space-y-4">
            {jobApplication.map((j) => (
              <div 
                key={j.id} 
                className="group p-5 md:p-6 border border-gray-100 hover:border-blue-200 rounded-2xl hover:bg-blue-50/10 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                      {j.applier?.name ? j.applier.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div className="truncate">
                      <p className="text-base font-bold text-gray-900 truncate">{j.applier?.name || "Unknown Applicant"}</p>
                      <p className="text-xs text-gray-400">Applied on candidate portal</p>
                    </div>
                  </div>
                  <div className="pl-13">
                    {renderStatusBadge(j.status)}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {j.cv_path ? (
                    <a 
                      href={j.cv_path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-blue-600 border border-gray-200 px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      <ExternalLink size={14} /> View CV
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No CV Attached</span>
                  )}
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(j.id, 'accepted')} 
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-semibold text-xs border border-emerald-200 transition shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Accept
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(j.id, 'rejected')} 
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold text-xs border border-red-200 transition shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
            <User size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-semibold text-sm">No applications received yet.</p>
            <p className="text-xs text-gray-400 mt-1">Check back later when candidates apply for this position.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default CompanyJob;