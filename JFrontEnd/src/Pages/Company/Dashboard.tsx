// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { type Company, type Job } from '../../types/types';
// import { useContextHook } from '../../Context/context';
// import { getCompanyWithJob } from '../../utils/company';

// const Dashboard = () => {
//   const { token, setToken, company_id, setCompanyId } = useContextHook();
//   const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [jobs, setJobs] = useState<Job[] | null>(null);

//   useEffect(() => {

//     if (!token) {
//         setCompanyWithJobs(null);
//         setJobs(null);
//         return;
//     }
//     const initDashboard = async () => {
//       setLoading(true);
     
//       // const storedId = localStorage.getItem('company_id');
//       const storedToken = localStorage.getItem('token');

//       if (!company_id || !storedToken) {
//         setMessage("Authentication failed or No company ID found");
//         setLoading(false);
//         return;
//       }

     
//       setCompanyId(company_id);
 
//       setToken(storedToken);

//       try {

      
//         const data = await getCompanyWithJob(company_id);
        
//         if (data) {
//           setCompanyWithJobs(data);
//           setJobs(data.uploaded_jobs || []);
//         } else {
//           setMessage("Failed to load company data");
//         }
//       } catch (error) {
//         console.error(error);
//         setMessage("An error occurred while fetching data");
//       } finally {
        
//         setLoading(false);
//       }
//     };

//     initDashboard();
//   }, [token]); 

//   if (loading) {
//     return <h1>Loading... <p>{message}</p></h1>;
//   }

//   return (
//     <div>
     
//       {!token && <h2>No Authentication Found</h2>}
      

//       {companyWithJobs ? (
//         <div>

//           {
//             companyWithJobs.background_photo && 
//              (
//             <img src={companyWithJobs.background_photo} alt={companyWithJobs.background_photo} 
//         className="w-32 h-32 object-cover rounded" />
//           )
//           }
//          {
//           companyWithJobs.logo && 
//           (
//             <img src={companyWithJobs.logo} alt={companyWithJobs.name} 
//         className="w-32 h-32 object-cover rounded-full" />
//           )
//          }
//           <h1>{companyWithJobs.name} Dashboard</h1>
//           <div>
//             {jobs && jobs.length > 0 ? (
//               jobs.map((j) => (
//                 <div key={j.id}>
//                   <NavLink to={`/companies/companyJobs/${j.id}`} className="text-blue-500 underline">
//                     {j.title}
//                   </NavLink>
//                 </div>
//               ))
//             ) : (
//               <p>No jobs uploaded yet.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <h1>{message || "No data available"}</h1>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { type Company, type Job } from '../../types/types';
// import { useContextHook } from '../../Context/context';
// import { getCompanyWithJob } from '../../utils/company';
// import { Camera } from 'lucide-react'; // Make sure to install lucide-react

// const Dashboard = () => {
//   const { token, company_id } = useContextHook();
//   const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [jobs, setJobs] = useState<Job[] | null>(null);

//   useEffect(() => {
//     if (!token || !company_id) return;
    
//     const initDashboard = async () => {
//       setLoading(true);
//       try {
//         const data = await getCompanyWithJob(company_id);
//         if (data) {
//           setCompanyWithJobs(data);
//           setJobs(data.uploaded_jobs || []);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     initDashboard();
//   }, [token, company_id]);

//   if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 pb-10">
//       {/* Hero Section */}
//       <div className="relative h-64 w-full bg-gray-200 group">
//         <img src={companyWithJobs?.background_photo} className="w-full h-full object-cover" alt="Cover" />
        
//         {/* Camera Icon Overlay */}
//         <button className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition text-white">
//           <Camera size={20} />
//         </button>

//         {/* Logo Section */}
//         <div className="absolute -bottom-16 left-10 group">
//           <div className="relative">
//             <img src={companyWithJobs?.logo} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" alt="Logo" />
//             <button className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition text-white">
//               <Camera size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mt-24 px-10">
//         <h1 className="text-2xl font-bold mb-6">{companyWithJobs?.name} Dashboard</h1>
//          <h1 className="text-2xl font-bold mb-6">{companyWithJobs?.description} Dashboard</h1>
//           <h1 className="text-2xl font-bold mb-6">{companyWithJobs?.location} Dashboard</h1>
//            <h1 className="text-2xl font-bold mb-6">{companyWithJobs?.website} Dashboard</h1>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h2 className="font-semibold text-gray-700 mb-4">Your Active Job Postings</h2>
//           {jobs && jobs.length > 0 ? (
//             <div className="space-y-3">
//               {jobs.map((j) => (
//                <NavLink 
//   key={j.id} 
//   to={`/companies/companyJobs/${j.id}`} 
//   className="block p-4 border rounded-lg hover:bg-blue-50 transition flex justify-between items-center"
// >
//   <span className="font-medium">{j.title}</span>
   
//   {/* Added Date Display */}
//   <span className="text-sm text-gray-400">
//     Posted on: {new Date(j.created_at).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })}
//   </span>
// </NavLink>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No jobs uploaded yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { type Company, type Job } from '../../types/types';
import { useContextHook } from '../../Context/context';
import { getCompanyWithJob } from '../../utils/company';
import { axiosClient } from '../../axios/axiosutils';
import { Camera, Edit3, Globe, MapPin, Building2, Save, X, Briefcase, Calendar } from 'lucide-react';

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

  // Handle Text Profile Updates (PUT /companies/{id})
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

  // Handle Image Upload with Laravel Method Spoofing (_method: 'PUT')
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Hidden File Inputs */}
      <input type="file" ref={coverInputRef} onChange={(e) => handleImageUpload(e, 'background_photo')} accept="image/*" className="hidden" />
      <input type="file" ref={logoInputRef} onChange={(e) => handleImageUpload(e, 'logo')} accept="image/*" className="hidden" />

      {/* Hero Section */}
      <div className="relative h-72 w-full bg-gray-900 group overflow-hidden shadow-sm">
        <img 
          src={companyWithJobs?.background_photo ? `${companyWithJobs.background_photo}` : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"} 
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" 
          alt="Cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Update Cover Button */}
        <button 
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition shadow-lg cursor-pointer"
        >
          <Camera size={16} /> Update Cover
        </button>

        {/* Logo Badge Section */}
        {/* Logo Section */}
        <div className="absolute -bottom-14 left-10 group/logo">
          <div className="relative">
            <img 
              src={companyWithJobs?.logo ? `${companyWithJobs.logo}` : "https://via.placeholder.com/150"} 
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover bg-white ring-1 ring-gray-900/5" 
              alt="Logo" 
            />
            <button 
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/85 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover/logo:opacity-100 transition shadow-md cursor-pointer"
            >
              <Camera size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Dashboard Container */}
      <div className="mt-20 max-w-6xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          
          {!isEditing ? (
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
                  <Building2 className="text-blue-600" size={28} /> {companyWithJobs?.name}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl leading-relaxed">{companyWithJobs?.description || "No description provided yet."}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <MapPin size={16} className="text-blue-600" /> {companyWithJobs?.location || "Location not specified"}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Globe size={16} className="text-blue-600" /> 
                  {companyWithJobs?.website ? (
                    <a href={companyWithJobs.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{companyWithJobs.website}</a>
                  ) : "No website"}
                </span>
              </div>
            </div>
          ) : (
            /* Editing Mode Form */
            <form onSubmit={handleUpdateCompany} className="space-y-4 flex-1 w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Company Profile</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Company Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Website</label>
                  <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2 transition shadow-sm cursor-pointer">
                  <Save size={16} /> Save Changes
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-200 flex items-center gap-2 transition cursor-pointer">
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          )}

          {!isEditing && (
            <button 
              type="button"
              onClick={() => setIsEditing(true)} 
              className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* Active Job Postings Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" /> Active Job Postings
            </h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {jobs?.length || 0} Openings
            </span>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((j) => (
                <NavLink 
                  key={j.id} 
                  to={`/companies/companyJobs/${j.id}`} 
                  className="block p-5 border border-gray-100 hover:border-blue-200 rounded-xl hover:bg-blue-50/30 transition flex justify-between items-center group shadow-xs"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition text-lg">{j.title}</span>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center gap-1.5">
                    <Calendar size={14} /> Posted: {new Date(j.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-500 font-medium">No jobs uploaded yet.</p>
              <p className="text-xs text-gray-400 mt-1">Start by posting your first open vacancy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;