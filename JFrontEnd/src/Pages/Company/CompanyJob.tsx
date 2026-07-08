import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Form } from 'react-router';
import { axiosClient } from '../../axios/axiosutils';
import type { Job, JobApplicationDataType,  } from '../../types/types';

const CompanyJob = () => {
  const jobData = useLoaderData() as any;
  const [job, setJob] = useState<Job>(jobData);
  const[jobApplication,setJobApplication]=useState <JobApplicationDataType[]>([]);

  
  const [isEditing, setIsEditing] = useState(false); 
  const[error,setError]=useState("");
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

const fetchSepcificJobApplication= async()=>{
  const company_id=localStorage.getItem('company_id');
  const job_id=job.id;
  const token=localStorage.getItem('token');
  try {
    const res=await axiosClient.get(`/companyJobApplications/${job_id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    if(!res){
      setError("Res error")
    }
 

    setJobApplication(res.data.data);
    

  } catch (error) {
    setError("Fetch Fail")
  }
}
useEffect(()=>{
  fetchSepcificJobApplication();
},[])
  return (
    <div className="p-6">
      {isEditing ? (
       
        <Form onSubmit={handleUpdate} className="flex flex-col gap-4">
  <input name="title" defaultValue={job.title} className="border p-2" required />
  <textarea name="description" defaultValue={job.description} className="border p-2" />
  <input name="salary" defaultValue={job.salary} type="number" className="border p-2" />
  <input name="location" defaultValue={job.location} className="border p-2" />
  <textarea name="requirements" defaultValue={job.requirements} className="border p-2" />
  
  <input name="category_id" type="hidden" defaultValue={job.category_id} />
  <input name="deadline" type="date" defaultValue={job.deadline} className="border p-2" />

  <div className="flex gap-2">
    <button type="submit" className="bg-green-600 text-white px-4 py-2">Save</button>
    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2">Cancel</button>
  </div>
</Form>
      ) : (
       
        <div>
          <h1>Job Detail: {job.title}</h1>
          <div className="my-4">
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2">Edit Job</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2">Delete Job</button>
          </div>
        </div>
      )}


      {error && <p>{error}</p>}

      {jobApplication && jobApplication.map(j=>{
      
        return(
<div  key={j.id}>
       
        <p >{j.status}--{j.applier.name}</p>
        <a href={j.cv_path} target="_blank" rel="noopener noreferrer">
      View CV
    </a>
    <div className="flex gap-2 mt-2">
      <button 
        onClick={() => handleStatusUpdate(j.id, 'accepted')}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Accept
      </button>
      <button 
        onClick={() => handleStatusUpdate(j.id, 'rejected')}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Reject
      </button>
    </div>
       </div>
        )
      }
       
      )}
    </div>
  );
};

export default CompanyJob;