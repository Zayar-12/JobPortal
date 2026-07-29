import { axiosClient } from "../axios/axiosutils";
import type { JobApplicationType } from "../types/types";

 
 export const JobApplication= async({cv_path,job_id}:JobApplicationType)=>{
try {
    const token=localStorage.getItem('token');

    const formData = new FormData();
    formData.append('cv_path',cv_path);
    formData.append('job_id',job_id);
        const res= await axiosClient.post('/jobApplication',
           formData
        ,{
             headers:{ 
                 
                'Authorization': `Bearer ${token}`,
             }
        })

        if(res){

            
         const newJobApplication=res.data.data;
        
          console.log("Job Applied  successful")
            return true;
           
        }

        return false
        console.log("job apply res is not ok")
        
    } catch (error) {
        return false
        console.log("job apply fail")
    }

 }

//  export const fetchJobApplications = async (page = 1) => {
//   const response = await fetch(`/api/jobApplication?page=${page}`, {
//     headers: {
//       'Accept': 'application/json',
      
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch job applications');
//   }
//   return await response.json();
// };