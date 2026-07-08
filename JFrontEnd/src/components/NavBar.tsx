
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
     localStorage.clear();
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
           <div>
             <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-transform active:scale-95"
            >
              Logout
            </button>

            <NavLink to={"/profile"}>Profile </NavLink>
           </div>


          ) : (
            <div className="flex items-center justify-between">
              <NavLink to={"/login"}>Login </NavLink>
     <NavLink to={"/register"}>Register</NavLink>
      <NavLink to={"/companies"}><p>Companies</p><p>Post Jobs and Find Talent</p></NavLink>
            </div>
          )}
        
    
    </div>

  </nav>
  )
}

export default NavBar