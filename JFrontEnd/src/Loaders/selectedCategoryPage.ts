import { redirect, type LoaderFunctionArgs } from "react-router";
import { getSelectedCategoryJob } from "../utils/categories";

export const loadSelectedCategoryJob= async({params}:LoaderFunctionArgs)=>{
     
    const categoryId=params.categoryId;
    
    if(!categoryId){
        return redirect("/")
    }
  const selectedCategoryJobs= await getSelectedCategoryJob(categoryId);

  if(!selectedCategoryJobs){
    console.log("no select jobs");
  }
    console.log(categoryId);
    console.log("select jobs",selectedCategoryJobs)


    return selectedCategoryJobs;
    
}