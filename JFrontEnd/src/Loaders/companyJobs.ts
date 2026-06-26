import type { LoaderFunctionArgs } from "react-router";
import { axiosClient } from "../axios/axiosutils";

export const loadCompanyJobs= async ({params}:LoaderFunctionArgs)=>{

    const id= params.id;
    const token=localStorage.getItem('token');

if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }
    try {
        const res= await axiosClient.get(`/companyJobs/${id}`,{

            headers:{
                Authorization:`Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        

        console.log(res.data.data)
return res.data.data 
        
    } catch (error) {
        console.error("Job fetching failed:", error);
        
      
        throw new Response("Job not found", { status: 404 });
    }
   
    
}