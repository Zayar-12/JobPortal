import { redirect, type LoaderFunctionArgs } from "react-router";
import { getSpecificJob } from "../utils/jobs";


export const loadSpecificJob=async({params}:LoaderFunctionArgs)=>{


    const id= params.id;
    if(!id){
        return redirect("/")
    }

    const specificJob= await getSpecificJob(id);

    if(!specificJob){
        console.log("no specifc job")
    }

    console.log("specific job",specificJob)

    return specificJob
}