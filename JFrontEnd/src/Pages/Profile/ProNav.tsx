import React from 'react'
import { NavLink } from 'react-router'
// const ProNav = () => {
//   return (
//     <div>
//         <NavLink to={"/profile/jobApplications"}>Job applications</NavLink>
//     </div>
//   )
// }

// ProNav.tsx
const ProNav = () => {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink 
        to={"/profile"} 
        end
        className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
      >
        Personal Info
      </NavLink>
      <NavLink 
        to={"/profile/jobApplications"} 
        className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
      >
        Job Applications
      </NavLink>
    </nav>
  );
};

export default ProNav