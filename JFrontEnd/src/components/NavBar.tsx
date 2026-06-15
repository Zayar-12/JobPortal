
import { NavLink } from "react-router"
import { logout } from "../utils/auth";
import { useState } from "react";
import { useContextHook } from "../Context/context";
const NavBar = () => {

  const{token,setToken,search,setSearch}=useContextHook();
  const[error,setError]=useState("");
  

  
  const handleLogout=async()=>{
    const success=await logout(token);
    if(success){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('company_id');
      setToken("");
    }else{
        setError("Logout Fail")
    }

  }
  return (
  <nav className="flex items-center justify-between px-10 py-5 ">
     <NavLink to={"/"}>Home</NavLink>
   
    <div className=" flex items-center justify-end gap-10">
       <NavLink to={"/allcompanies"}>All compaines</NavLink>
      <NavLink to={"/jobbycategory"}>Jobs by Category</NavLink>
      {token ? (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-transform active:scale-95"
            >
              Logout
            </button>
          ) : (
            <div>
              <NavLink to={"/login"}>Login </NavLink>
     <NavLink to={"/register"}>Register</NavLink>
            </div>
          )}
        
     <NavLink to={"/companies"}><p>Companies</p><p>Post Jobs and Find Talent</p></NavLink>
    </div>

  </nav>
  )
}

export default NavBar