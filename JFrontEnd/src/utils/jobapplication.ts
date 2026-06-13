import { axiosClient } from "../axios/axiosutils";
import type { JobApplicationType } from "../types/types";

 
 export const JobApplication= async({cv_path,job_id}:JobApplicationType)=>{
try {
    const token=localStorage.getItem('token');
        const res= await axiosClient.post('/jobApplication',{
            cv_path:cv_path,
            job_id:job_id
        },{
             headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
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