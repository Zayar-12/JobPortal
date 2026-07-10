
// import { NavLink } from "react-router"
// import { logout } from "../utils/auth";
// import { useState } from "react";
// import { useContextHook } from "../Context/context";
// const NavBar = () => {

//   const{token,setToken,search,setSearch}=useContextHook();
//   const[error,setError]=useState("");
  

  
//   const handleLogout=async()=>{
//     const success=await logout(token);
//     if(success){
//      localStorage.clear();
//       setToken("");
//     }else{
//         setError("Logout Fail")
//     }

//   }
//   return (
//   <nav className="flex items-center justify-between px-10 py-5 ">
//      <NavLink to={"/"}>Home</NavLink>
   
//     <div className=" flex items-center justify-end gap-10">
//        <NavLink to={"/allcompanies"}>All compaines</NavLink>
//       <NavLink to={"/jobbycategory"}>Jobs by Category</NavLink>
//       {token ? (
//            <div>
//              <button 
//               onClick={handleLogout}
//               className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-transform active:scale-95"
//             >
//               Logout
//             </button>

//             <NavLink to={"/profile"}>Profile </NavLink>
//            </div>


//           ) : (
//             <div className="flex items-center justify-between">
//               <NavLink to={"/login"}>Login </NavLink>
//      <NavLink to={"/register"}>Register</NavLink>
//       <NavLink to={"/companies"}><p>Companies</p><p>Post Jobs and Find Talent</p></NavLink>
//             </div>
//           )}
        
    
//     </div>

//   </nav>
//   )
// }

// export default NavBar


import { NavLink } from "react-router";
import { logout } from "../utils/auth";
import { useState } from "react";
import { useContextHook } from "../Context/context";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const { token, setToken } = useContextHook();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const success = await logout(token);
    if (success) {
      localStorage.clear();
      setToken("");
    } else {
      setError("Logout Fail");
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <NavLink to={"/"} className="text-2xl font-bold text-blue-600">JobPortal</NavLink>

      <div className="flex items-center gap-8">
        <NavLink to={"/allcompanies"} className="text-gray-600 hover:text-blue-600 font-medium">Companies</NavLink>
        <NavLink to={"/jobbycategory"} className="text-gray-600 hover:text-blue-600 font-medium">Categories</NavLink>
        
        {token ? (
          /* Profile Avatar with Dropdown */
          <div className="relative group cursor-pointer">
            <FaUserCircle className="text-3xl text-gray-600 hover:text-blue-600 transition" />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <NavLink to={"/profile"} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b">
                Profile
              </NavLink>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink to={"/login"} className="text-gray-600 hover:text-blue-600 font-medium">Sign In</NavLink>
            <NavLink to={"/register"} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-sm">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;