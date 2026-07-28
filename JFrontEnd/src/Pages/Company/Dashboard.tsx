import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { type Company, type Job } from '../../types/types';
import { useContextHook } from '../../Context/context';
import { getCompanyWithJob } from '../../utils/company';
import { axiosClient } from '../../axios/axiosutils';
import { Camera, Edit3, Globe, MapPin, Building2, Save, X, Briefcase, Calendar, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { token, company_id } = useContextHook();
  const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  
  // Editing Mode State & Form Data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: ''
  });

  // Hidden File Input References
  const coverInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token || !company_id) return;
    
    const initDashboard = async () => {
      setLoading(true);
      try {
        const data = await getCompanyWithJob(company_id);
        if (data) {
          setCompanyWithJobs(data);
          setJobs(data.uploaded_jobs || []);
          setFormData({
            name: data.name || '',
            description: data.description || '',
            location: data.location || '',
            website: data.website || ''
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [token, company_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper for Status Badge Styling
  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <ShieldCheck size={14} /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <AlertCircle size={14} /> Rejected
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Clock size={14} /> Pending Review
          </span>
        );
    }
  };

  // Handle Text Profile Updates
  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosClient.put(`/companies/${company_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data?.data) {
        setCompanyWithJobs(res.data.data);
      } else if (companyWithJobs) {
        setCompanyWithJobs({
          ...companyWithJobs,
          ...formData
        });
      }
      
      setIsEditing(false);
      alert("Company profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update company profile.");
    }
  };

  // Handle Image Upload with Laravel Method Spoofing
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'background_photo' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append(fieldName, file);
    imageFormData.append('_method', 'PUT');

    try {
      const res = await axiosClient.post(`/companies/${company_id}`, imageFormData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.data) {
        setCompanyWithJobs(res.data.data);
      }
      
      alert(`${fieldName === 'logo' ? 'Logo' : 'Cover photo'} updated successfully.`);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hidden File Inputs */}
      <input type="file" ref={coverInputRef} onChange={(e) => handleImageUpload(e, 'background_photo')} accept="image/*" className="hidden" />
      <input type="file" ref={logoInputRef} onChange={(e) => handleImageUpload(e, 'logo')} accept="image/*" className="hidden" />

      {/* Modern Hero Cover Section */}
      <div className="relative h-80 w-full bg-gray-900 group overflow-visible shadow-md">
        <img 
          src={companyWithJobs?.background_photo ? `${companyWithJobs.background_photo}` : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"} 
          className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition duration-700 ease-out" 
          alt="Cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Update Cover Button */}
        <button 
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl text-white text-xs font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition shadow-lg cursor-pointer border border-white/10"
        >
          <Camera size={16} /> Update Cover Photo
        </button>

        {/* Company Logo Section overlapping the cover */}
        <div className="absolute -bottom-10 left-8 sm:left-12 group/logo z-20">
          <div className="relative">
            <img 
              src={companyWithJobs?.logo ? `${companyWithJobs.logo}` : "https://via.placeholder.com/150"} 
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl border-4 border-white shadow-2xl object-contain bg-white ring-1 ring-gray-900/10 p-2.5" 
              alt="Logo" 
            />
            <button 
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 backdrop-blur-md p-2.5 rounded-full text-white opacity-0 group-hover/logo:opacity-100 transition shadow-md cursor-pointer border border-white/25"
            >
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Dashboard Container */}
      <div className="mt-16 max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Profile Card Information / Editing Section */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

          {!isEditing ? (
            <div className="space-y-6 flex-1 min-w-0 w-full">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5 truncate max-w-full">
                    <Building2 className="text-blue-600 shrink-0" size={28} /> 
                    <span className="truncate">{companyWithJobs?.name || "Company Name"}</span>
                  </h1>
                  {/* Company Status Badge Display */}
                  {renderStatusBadge(companyWithJobs?.status || 'pending')}
                </div>
                
                {/* Manage Long Text: Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl whitespace-pre-line">
                  {companyWithJobs?.description || "No description provided yet."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2 bg-gray-50/80 px-4 py-2 rounded-xl border border-gray-100 max-w-xs truncate">
                  <MapPin size={16} className="text-blue-600 shrink-0" /> 
                  <span className="truncate">{companyWithJobs?.location || "Location not specified"}</span>
                </span>
                
                <span className="flex items-center gap-2 bg-gray-50/80 px-4 py-2 rounded-xl border border-gray-100 max-w-xs truncate">
                  <Globe size={16} className="text-blue-600 shrink-0" /> 
                  {companyWithJobs?.website ? (
                    <a href={companyWithJobs.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                      {companyWithJobs.website}
                    </a>
                  ) : "No website"}
                </span>
              </div>
            </div>
          ) : (
            /* Editing Mode Form */
            <form onSubmit={handleUpdateCompany} className="space-y-5 flex-1 w-full">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-xl font-bold text-gray-900">Edit Company Profile</h2>
                <p className="text-xs text-gray-400 mt-0.5">Update your organization's core details below.</p>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Company Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" required />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm resize-y" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Website</label>
                  <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer">
                  <Save size={16} /> Save Changes
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold text-xs transition flex items-center gap-2 cursor-pointer">
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          )}

          {!isEditing && (
            <button 
              type="button"
              onClick={() => setIsEditing(true)} 
              className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl transition flex items-center gap-2 shadow-xs shrink-0 cursor-pointer text-xs"
            >
              <Edit3 size={16} className="text-blue-600" /> Edit Profile
            </button>
          )}
        </div>

        {/* Active Job Postings Section */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600" /> Active Job Postings
              </h2>
              <p className="text-xs text-gray-400 mt-1">Manage and monitor the vacancies you have published.</p>
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl border border-blue-100 shadow-xs">
              {jobs?.length || 0} Openings
            </span>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((j) => (
                <NavLink 
                  key={j.id} 
                  to={`/companies/companyJobs/${j.id}`} 
                  className="group block p-5 md:p-6 border border-gray-100 hover:border-blue-200 rounded-2xl hover:bg-blue-50/20 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-2 min-w-0 flex-1">
                    {/* Long text handled with truncate */}
                    <span className="font-bold text-gray-900 group-hover:text-blue-600 transition text-base sm:text-lg block truncate">
                      {j.title}
                    </span>
                    <div>{renderStatusBadge(j.status || 'pending')}</div>
                  </div>
                  
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100 flex items-center gap-1.5 shrink-0 shadow-xs">
                    <Calendar size={14} className="text-blue-600" /> Posted: {new Date(j.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
              <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-semibold text-sm">No jobs uploaded yet.</p>
              <p className="text-xs text-gray-400 mt-1">Start by posting your first open vacancy to attract talent.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;