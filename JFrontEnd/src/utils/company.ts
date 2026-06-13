import { axiosClient } from "../axios/axiosutils"
import type { Company } from "../types/types"

export const getAllCompanies= async ():Promise<Company[]>=>{
    
    try {
        
    const res=await axiosClient.get('/allCompaines',{
                    headers:{ 'Accept': 'application/json',
                     'Content-Type':'application/json',
                    
                     
            }
            })
    
            if(!res){
                console.log("All compaines fetch fail")
                return []
            }
    
            console.log(res.data.data)
    
            const allCompanies=res.data.data
            return allCompanies;
    } catch (err) {
          console.log(err)
    
          return []
    
    }
}



export const getCompanyWithJob= async(id:string)=>{
    
try {
    
const res=await axiosClient.get(`/allCompaines/${id}`,{
                headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                
                 
        }
        })

        if(!res){
            console.log("company with job fetch fail")
            return []
        }

        console.log(res.data.data)

        const companyWithJobs=res.data.data
        return companyWithJobs;
} catch (err) {
      console.log(err)

      return []

}
}

