import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, FolderPlus, LogOut } from 'lucide-react';
import { useContextHook } from '../../Context/context';
import { logout } from '../../utils/auth';


// const { token, setToken } = useContextHook();
//  const [error, setError] = useState("");
// const handleLogout = async () => {
//     const success = await logout(token);
//     if (success) {
//       localStorage.clear();
//       setToken("");
//     } else {
//       setError("Logout Fail");
//     }
//   };
const AdminNav = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-xs">
      <div className="flex items-center gap-6">
        <span className="text-xl font-extrabold text-blue-600 tracking-tight">Admin Portal</span>
        <div className="flex items-center gap-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink 
            to="/admin/manage" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FolderPlus size={16} /> Categories & Assets
          </NavLink>
        </div>
      </div>

      <NavLink 
        to="/login" 
        onClick={() => { localStorage.clear(); }} 
        
      >
        <LogOut size={16} /> Logout
      </NavLink>
    </nav>
  );
};

export default AdminNav;