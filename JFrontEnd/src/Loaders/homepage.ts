
import { redirect, type LoaderFunctionArgs } from "react-router";
import { getAllCategories } from "../utils/categories";
import { getLatestJobs } from "../utils/jobs";


export const loadAllCategories= async ({params}:LoaderFunctionArgs)=>{

    const allCategories= await getAllCategories();

    if(!allCategories){
        console.log("No categories")
    }


    console.log(allCategories);
    return allCategories;
    
}



// export const loadLatestJobs= async ({params}:LoaderFunctionArgs)=>{

//     const latestJobs= await getLatestJobs();

//     if(!latestJobs){
//         console.log("No latest jobs")
//     }


//     console.log(latestJobs);
//     return latestJobs;
    
// }


export const loadHomepageData = async ({ request }: LoaderFunctionArgs) => {
  const url=new URL(request.url);
  const page=url.searchParams.get("page") || "1";
  const [allCategories, jobsResponse] = await Promise.all([
    getAllCategories(),
    getLatestJobs(page)
  ]);

  return { allCategories, jobsResponse };
};
