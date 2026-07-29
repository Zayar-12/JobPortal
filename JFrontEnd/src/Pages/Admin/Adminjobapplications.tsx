import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { User, FileText, Briefcase } from 'lucide-react';

const AdminJobApplications = () => {
  const data = useLoaderData() as any;
  const applications = data?.data || [];
  const links = data?.meta?.links || [];

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider">
          Admin Management
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
          Job Applications
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor who applied for which job and check candidate CV details.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-sm space-y-2">
            <Briefcase size={40} className="text-gray-300" />
            <p>No job applications found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Applicant</th>
                    <th className="py-4 px-6">Applied Job</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">CV Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {applications.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0 border border-blue-100">
                            {app.applier?.name ? app.applier.name.charAt(0).toUpperCase() : <User size={18} />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{app.applier?.name || 'Unknown User'}</p>
                            <p className="text-xs text-gray-400 truncate">{app.applier?.email || 'No email'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-800 truncate max-w-xs">
                            {app.job?.title || `Job ID: ${app.job_id}`}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider ${getStatusBadge(app.status)}`}>
                          {app.status || 'Pending'}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {app.cv_path ? (
                          <a 
                            href={app.cv_path} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl border border-gray-200 hover:border-blue-200 text-xs font-semibold transition shadow-xs"
                          >
                            <FileText size={14} /> View CV
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No CV uploaded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {links && links.length > 3 && (
              <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-100 bg-white flex-wrap">
                {links.map((link: any, idx: number) => {
                  let pageNum = link.url ? new URL(link.url).searchParams.get("page") : null;
                  return (
                    <NavLink
                      key={idx}
                      to={link.url ? `/admin/job-applications?page=${pageNum}` : "#"}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                        link.active 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                          : link.url 
                            ? 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50' 
                            : 'bg-gray-100 text-gray-300 border-gray-200 pointer-events-none'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminJobApplications;