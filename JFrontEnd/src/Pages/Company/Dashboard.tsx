import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { type Company, type Job } from '../../types/types';
import { useContextHook } from '../../Context/context';
import { getCompanyWithJob } from '../../utils/company';

const Dashboard = () => {
  const { token, setToken, company_id, setCompanyId } = useContextHook();
  const [companyWithJobs, setCompanyWithJobs] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {

    if (!token) {
        setCompanyWithJobs(null);
        setJobs(null);
        return;
    }
    const initDashboard = async () => {
      setLoading(true);
     
      // const storedId = localStorage.getItem('company_id');
      const storedToken = localStorage.getItem('token');

      if (!company_id || !storedToken) {
        setMessage("Authentication failed or No company ID found");
        setLoading(false);
        return;
      }

     
      setCompanyId(company_id);
 
      setToken(storedToken);

      try {

      
        const data = await getCompanyWithJob(company_id);
        
        if (data) {
          setCompanyWithJobs(data);
          setJobs(data.uploaded_jobs || []);
        } else {
          setMessage("Failed to load company data");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred while fetching data");
      } finally {
        
        setLoading(false);
      }
    };

    initDashboard();
  }, [token]); 

  if (loading) {
    return <h1>Loading... <p>{message}</p></h1>;
  }

  return (
    <div>
     
      {!token && <h2>No Authentication Found</h2>}
      

      {companyWithJobs ? (
        <div>

          {
            companyWithJobs.background_photo && 
             (
            <img src={companyWithJobs.background_photo} alt={companyWithJobs.background_photo} 
        className="w-32 h-32 object-cover rounded" />
          )
          }
         {
          companyWithJobs.logo && 
          (
            <img src={companyWithJobs.logo} alt={companyWithJobs.name} 
        className="w-32 h-32 object-cover rounded-full" />
          )
         }
          <h1>{companyWithJobs.name} Dashboard</h1>
          <div>
            {jobs && jobs.length > 0 ? (
              jobs.map((j) => (
                <div key={j.id}>
                  <NavLink to={`/companies/companyJobs/${j.id}`} className="text-blue-500 underline">
                    {j.title}
                  </NavLink>
                </div>
              ))
            ) : (
              <p>No jobs uploaded yet.</p>
            )}
          </div>
        </div>
      ) : (
        <h1>{message || "No data available"}</h1>
      )}
    </div>
  );
};

export default Dashboard;