import React from 'react'
import { NavLink } from 'react-router'
const ComNav = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 ">
     <NavLink to={"/"}>Home</NavLink>
   
    <div className=" flex items-center justify-end gap-10">
       
        <NavLink to={"companylogin"}>Company Login </NavLink>
     <NavLink to={"companyregister"}> Company Register</NavLink>
  
    </div>

  </nav>
  )
}

export default ComNav