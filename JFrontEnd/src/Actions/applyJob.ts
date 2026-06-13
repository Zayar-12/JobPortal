import { redirect, type ActionFunctionArgs } from "react-router";
import { JobApplication } from "../utils/jobapplication";


export const ApplyJobAction= async({request}:ActionFunctionArgs)=>{
const formData= request.formData();
const cv_path=(await formData).get("cv_path") as string;
const job_id=(await formData).get("job_id") as string;
console.log(cv_path,job_id);

const dec=await JobApplication({cv_path,job_id});

if(!dec){
    console.log('dec is false in apply job')
    return redirect(`/userJobs/${job_id}`)
}

return redirect('/')
}