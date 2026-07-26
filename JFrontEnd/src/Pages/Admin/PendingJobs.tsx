import React, { useEffect, useState } from 'react';
import { useContextHook } from '../../Context/context';
import { axiosClient } from '../../axios/axiosutils';
import { Briefcase, CheckCircle2, XCircle, Building2 } from 'lucide-react';

const PendingJobs = () => {
  const { token } = useContextHook();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingJobs();
  }, [token]);

  const fetchPendingJobs = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/admin/pending-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Failed to fetch pending jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number | string) => {
    try {
      await axiosClient.patch(`/admin/jobs/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Job approved successfully!");
      fetchPendingJobs();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to approve job.");
    }
  };

  const handleReject = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to reject/delete this job posting?")) return;
    try {
      await axiosClient.delete(`/admin/jobs/${id}/reject`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Job rejected.");
      fetchPendingJobs();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to reject job.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pending Job Approvals</h1>
        <p className="text-gray-500 mt-1">Review job postings submitted by companies before publishing them publicly.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading pending jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Briefcase size={40} className="mx-auto text-gray-300" />
            <p className="text-gray-500 font-medium">No pending job posts to review right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center shrink-0">
                    {job.company?.logo ? (
                      <img src={job.company.logo} alt="" className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <Building2 size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="font-semibold text-gray-700">{job.company?.name || 'Unknown Company'}</span> • {job.location || 'Remote'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => handleApprove(job.id)}
                    className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <CheckCircle2 size={15} /> Approve Job
                  </button>
                  <button 
                    onClick={() => handleReject(job.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingJobs;