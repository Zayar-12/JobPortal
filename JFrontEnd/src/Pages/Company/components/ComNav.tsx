// import React, { useState } from 'react'
// import { NavLink, redirect, useNavigate } from 'react-router'
// import { useContextHook } from '../../../Context/context'
// import { logout } from '../../../utils/auth';
// const ComNav = () => {
//   const {token,setToken,company_id,setCompanyId}=useContextHook();
// const[error,setError]=useState("");

// const navigate=useNavigate();
  
//     const handleLogout=async()=>{
//       const success=await logout(token);
//       if(success){
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         localStorage.removeItem('company_id');
//         localStorage.removeItem('user_id');

//         setToken("");
//         setCompanyId("");
//         navigate("/")
//       }else{
//           setError("Logout Fail")
//       }
  
//     }
//   return (
//     <nav className="flex items-center justify-between px-10 py-5 ">
//      <NavLink to={"/companies/dashboard"}>Home</NavLink>
   
//     <div className=" flex items-center justify-end gap-10">
       
//        {
//             token?<div>
//                     <button 
//               onClick={handleLogout}
//               className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-transform active:scale-95"
//             >
//               Logout
//             </button>
//             <NavLink to={"/companies/uploadJob"}>Upload Job</NavLink>
//             </div>:<div>
//               <NavLink to={"/companies/companylogin"}>Company Login </NavLink>
//      <NavLink to={"/companies/companyregister"}> Company Register</NavLink>
//             </div>
//        }
        
  
//     </div>

//   </nav>
//   )
// }

// export default ComNav

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useContextHook } from '../../../Context/context';
import { logout } from '../../../utils/auth';

const ComNav = () => {
  const { token, setToken, setCompanyId } = useContextHook();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const success = await logout(token);
    if (success) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('company_id');
      localStorage.removeItem('user_id');
      setToken("");
      setCompanyId("");
      navigate("/");
    } else {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-200">
      {/* Brand / Logo Area */}
      <NavLink to="/companies/dashboard" className="text-xl font-bold text-gray-900">
        Employer Portal
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {token ? (
          <div className="flex items-center gap-6">
            <NavLink 
              to="/companies/uploadJob" 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Upload Job
            </NavLink>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <NavLink 
              to="/companies/companylogin" 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Sign In
            </NavLink>
            <NavLink 
              to="/companies/companyregister" 
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ComNav;