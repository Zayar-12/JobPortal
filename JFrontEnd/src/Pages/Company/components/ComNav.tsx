import React, { useState } from 'react'
import { NavLink, redirect, useNavigate } from 'react-router'
import { useContextHook } from '../../../Context/context'
import { logout } from '../../../utils/auth';
const ComNav = () => {
  const {token,setToken,company_id,setCompanyId}=useContextHook();
const[error,setError]=useState("");

const navigate=useNavigate();
  
    const handleLogout=async()=>{
      const success=await logout(token);
      if(success){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('company_id');
        localStorage.removeItem('user_id');

        setToken("");
        setCompanyId("");
        navigate("/")
      }else{
          setError("Logout Fail")
      }
  
    }
  return (
    <nav className="flex items-center justify-between px-10 py-5 ">
     <NavLink to={"/companies/dashboard"}>Home</NavLink>
   
    <div className=" flex items-center justify-end gap-10">
       
       {
            token?<div>
                    <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-transform active:scale-95"
            >
              Logout
            </button>
            <NavLink to={"/companies/uploadJob"}>Upload Job</NavLink>
            </div>:<div>
              <NavLink to={"/companies/companylogin"}>Company Login </NavLink>
     <NavLink to={"/companies/companyregister"}> Company Register</NavLink>
            </div>
       }
        
  
    </div>

  </nav>
  )
}

export default ComNav