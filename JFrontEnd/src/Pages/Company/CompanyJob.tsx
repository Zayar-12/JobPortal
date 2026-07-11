// import React, { useEffect, useState } from 'react';
// import { useLoaderData, useNavigate, Form } from 'react-router';
// import { axiosClient } from '../../axios/axiosutils';
// import type { Job, JobApplicationDataType,  } from '../../types/types';

// const CompanyJob = () => {
//   const jobData = useLoaderData() as any;
//   const [job, setJob] = useState<Job>(jobData);
//   const[jobApplication,setJobApplication]=useState <JobApplicationDataType[]>([]);

  
//   const [isEditing, setIsEditing] = useState(false); 
//   const[error,setError]=useState("");
//   const navigate = useNavigate();

 
// const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this job?")) {
//       const token = localStorage.getItem('token'); 
//       try {
//         await axiosClient.delete(`/companyJobs/${job.id}`, {
//           headers: { Authorization: `Bearer ${token}` } 
//         });
//         alert("Job deleted successfully");
//         navigate("/companies/dashboard");
//       } catch (error) {
//         console.error(error);
//         alert("Failed to delete the job");
//       }
//     }
// };

// const handleStatusUpdate = async (id: string, status: string) => {
//   const token = localStorage.getItem('token');
//   try {
//     await axiosClient.put(`/jobApplication/${id}`, { status }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     alert(`Application ${status} successfully`);
//     fetchSepcificJobApplication(); 
//   } catch (error) {
//     console.error(error);
//     alert("Failed to update status");
//   }
// };

// const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const updatedData = Object.fromEntries(formData);
//     const token = localStorage.getItem('token'); 

//     try {
//       await axiosClient.put(`/companyJobs/${job.id}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       alert("Job updated successfully");
//       setIsEditing(false);
//       navigate("/companies/dashboard");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update the job");
//     }
// };

// const fetchSepcificJobApplication= async()=>{
//   const company_id=localStorage.getItem('company_id');
//   const job_id=job.id;
//   const token=localStorage.getItem('token');
//   try {
//     const res=await axiosClient.get(`/companyJobApplications/${job_id}`,{
//       headers:{
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if(!res){
//       setError("Res error")
//     }
 

//     setJobApplication(res.data.data);
    

//   } catch (error) {
//     setError("Fetch Fail")
//   }
// }
// useEffect(()=>{
//   fetchSepcificJobApplication();
// },[])
//   return (
//     <div className="p-6">
//       {isEditing ? (
       
//         <Form onSubmit={handleUpdate} className="flex flex-col gap-4">
//   <input name="title" defaultValue={job.title} className="border p-2" required />
//   <textarea name="description" defaultValue={job.description} className="border p-2" />
//   <input name="salary" defaultValue={job.salary} type="number" className="border p-2" />
//   <input name="location" defaultValue={job.location} className="border p-2" />
//   <textarea name="requirements" defaultValue={job.requirements} className="border p-2" />
  
//   <input name="category_id" type="hidden" defaultValue={job.category_id} />
//   <input name="deadline" type="date" defaultValue={job.deadline} className="border p-2" />

//   <div className="flex gap-2">
//     <button type="submit" className="bg-green-600 text-white px-4 py-2">Save</button>
//     <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2">Cancel</button>
//   </div>
// </Form>
//       ) : (
       
//         <div>
//           <h1>Job Detail: {job.title}</h1>
//           <div className="my-4">
//             <p><strong>Description:</strong> {job.description}</p>
//             <p><strong>Salary:</strong> {job.salary}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//           </div>

//           <div className="flex gap-4">
//             <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2">Edit Job</button>
//             <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2">Delete Job</button>
//           </div>
//         </div>
//       )}


//       {error && <p>{error}</p>}

//       {jobApplication && jobApplication.map(j=>{
      
//         return(
// <div  key={j.id}>
       
//         <p >{j.status}--{j.applier.name}</p>
//         <a href={j.cv_path} target="_blank" rel="noopener noreferrer">
//       View CV
//     </a>
//     <div className="flex gap-2 mt-2">
//       <button 
//         onClick={() => handleStatusUpdate(j.id, 'accepted')}
//         className="bg-green-500 text-white px-3 py-1 rounded"
//       >
//         Accept
//       </button>
//       <button 
//         onClick={() => handleStatusUpdate(j.id, 'rejected')}
//         className="bg-red-500 text-white px-3 py-1 rounded"
//       >
//         Reject
//       </button>
//     </div>
//        </div>
//         )
//       }
       
//       )}
//     </div>
//   );
// };

// export default CompanyJob;


import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Form } from 'react-router';
import { axiosClient } from '../../axios/axiosutils';
import type { Job, JobApplicationDataType } from '../../types/types';

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
    const company_id = localStorage.getItem('company_id');
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

  useEffect(() => { fetchSepcificJobApplication(); }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      {/* Job Details Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
        {isEditing ? (
          <Form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Edit Job Posting</h2>
            <input name="title" defaultValue={job.title} className="border border-gray-300 rounded-lg p-3 w-full" required />
            <textarea name="description" defaultValue={job.description} className="border border-gray-300 rounded-lg p-3 w-full" rows={4} />
            <div className="grid grid-cols-2 gap-4">
                <input name="salary" defaultValue={job.salary} type="number" className="border border-gray-300 rounded-lg p-3" />
                <input name="location" defaultValue={job.location} className="border border-gray-300 rounded-lg p-3" />
            </div>
            <textarea name="requirements" defaultValue={job.requirements} className="border border-gray-300 rounded-lg p-3 w-full" rows={3} />
            <input name="category_id" type="hidden" defaultValue={job.category_id} />
            <input name="deadline" type="date" defaultValue={job.deadline} className="border border-gray-300 rounded-lg p-3" />
            
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
            </div>
          </Form>
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{job.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-700">
              <p><span className="font-bold text-gray-900">Description:</span><br/>{job.description}</p>
              <p><span className="font-bold text-gray-900">Requirements:</span><br/>{job.requirements}</p>
              <p><span className="font-bold text-gray-900">Salary:</span> {job.salary}</p>
              <p><span className="font-bold text-gray-900">Location:</span> {job.location}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsEditing(true)} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium">Edit Job</button>
              <button onClick={handleDelete} className="bg-red-50 text-red-600 px-6 py-2 rounded-lg font-medium border border-red-200">Delete Job</button>
            </div>
          </div>
        )}
      </div>

      {/* Applications Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidate Applications</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="grid gap-4">
        {jobApplication && jobApplication.map(j => (
          <div key={j.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">{j.applier.name}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">{j.status}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href={j.cv_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">View CV</a>
              <div className="flex gap-2">
                <button onClick={() => handleStatusUpdate(j.id, 'accepted')} className="bg-green-50 text-green-700 px-4 py-1.5 rounded-md font-semibold text-sm border border-green-200">Accept</button>
                <button onClick={() => handleStatusUpdate(j.id, 'rejected')} className="bg-red-50 text-red-700 px-4 py-1.5 rounded-md font-semibold text-sm border border-red-200">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyJob;