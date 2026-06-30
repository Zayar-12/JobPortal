import { redirect, type LoaderFunctionArgs } from "react-router";
import { axiosClient } from "../axios/axiosutils";

export const searchJobsLoader = async ({ request }: LoaderFunctionArgs)=>{

    const url= new URL(request.url);
    const title=url.searchParams.get('title');
    const location=url.searchParams.get('location');
    const res = await axiosClient.get(`/jobs/search?title=${title}&location=${location}`);

    if(!res){
        return redirect("/");
    }
    
  return res.data.data;
}