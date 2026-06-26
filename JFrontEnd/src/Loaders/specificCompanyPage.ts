import { redirect, type LoaderFunctionArgs } from "react-router";
import { getCompanyWithJob } from "../utils/company";


export const loadCompanyWithJob= async({params}:LoaderFunctionArgs)=>{
     
    
    const id=localStorage.getItem('company_id');
    // localStorage.removeItem('company_id');
    if(!id){
        return redirect("/")
    }
  const companyWithJobs= await getCompanyWithJob(id);

  if(!companyWithJobs){
    console.log("no select jobs");
  }
    console.log(id);
    console.log("select jobs",companyWithJobs)


    return companyWithJobs;
    
}