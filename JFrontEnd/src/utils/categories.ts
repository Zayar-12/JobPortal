import { axiosClient } from "../axios/axiosutils";
import type { Category, Job } from "../types/types";



export const getAllCategories= async():Promise<Category[]>=>{


try {
    
const res=await axiosClient.get('/categories',{
                headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                
                 
        }
        })

        if(!res){
            console.log("All categories fetch fail")
            return []
        }

        console.log(res.data.data)

        const allCategories=res.data.data
        return allCategories;
} catch (err) {
      console.log(err)

      return []

}
}


export const getSelectedCategoryJob= async(categoryId:string):Promise<Job[]>=>{
    
try {
    
const res=await axiosClient.get(`/categories/${categoryId}`,{
                headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                
                 
        }
        })

        if(!res){
            console.log("selected category job fetch fail")
            return []
        }

        console.log(res.data.data)

        const selectedCategoryJobs=res.data.data
        return selectedCategoryJobs;
} catch (err) {
      console.log(err)

      return []

}
}