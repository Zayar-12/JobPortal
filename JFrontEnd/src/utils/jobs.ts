import { axiosClient } from "../axios/axiosutils"

export const getLatestJobs= async()=>{

    
    try {
        
    const res=await axiosClient.get('/userJobs',{
                    headers:{ 'Accept': 'application/json',
                     'Content-Type':'application/json',
                    
                     
            }
            })
    
            if(!res){
                console.log("Latest Jobs fetch fail")
                return []
            }
    
            console.log(res.data.data)
    
            const LatestJobs=res.data.data
            return LatestJobs;
    } catch (err) {
          console.log(err)
    
          return []
    
    }
}



export const getSpecificJob= async(id:string)=>{

    
    try {
        
    const res=await axiosClient.get(`/userJobs/${id}`,{
                    headers:{ 'Accept': 'application/json',
                     'Content-Type':'application/json',
                    
                     
            }
            })
    
            if(!res){
                console.log("Specific Job fetch fail")
                return []
            }
    
            console.log(res.data.data)
    
            const SpecificJob=res.data.data
            return SpecificJob;
    } catch (err) {
          console.log(err)
    
          return []
    
    }
}
