import { redirect } from "react-router";
import { axiosClient } from "../axios/axiosutils";

export  const profileLoader= async ()=>{
const token=localStorage.getItem('token');
if(!token){
    return redirect('/');
}
    try {
        const res= await axiosClient.get('/profile',{
             headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
                 
        }
        })
        
        if(!res){
             console.log("profile fetch fail")
                return redirect("/")
        }
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.log("profile fetch fail")
           return redirect("/")
    }
}


export const jobApplicationsLoader=async ()=>{
    const token=localStorage.getItem('token');
if(!token){
    return redirect('/profile');
}
    try {
        const res= await axiosClient.get('/userJobApplications',{
             headers:{ 'Accept': 'application/json',
                 'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
                 
        }
        })
        
        if(!res){
             console.log("profile fetch fail")
                return redirect("/")
        }
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.log("profile fetch fail")
           return redirect("/")
    }
}