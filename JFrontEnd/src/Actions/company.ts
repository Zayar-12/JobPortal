import { redirect, type ActionFunctionArgs } from "react-router";
import { axiosClient } from "../axios/axiosutils";

// Actions/company.ts
export const companyRegisterAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const res = await axiosClient.post('/register-company', data);

      
        if (res.data && res.data.token) {
            localStorage.setItem('token', res.data.token);
                 localStorage.setItem('company_id', res.data.company_id);
          
        }

        return redirect('/compaines/dashboard'); 
    } catch (error: any) {
        return error.response?.data;
    }
};




export const createJobAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData); 
   const token=localStorage.getItem('token');
    try {
        
        await axiosClient.post('/companyJobs', data,
             {
                 headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
                 
        }
             }
        );
        return redirect('/compaines/dashboard'); 
    } catch (error: any) {
        console.error("Job creation failed:", error.response?.data);
        return error.response?.data;
    }
};