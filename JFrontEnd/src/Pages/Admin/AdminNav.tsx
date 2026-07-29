import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
// FileText ကို lucide-react မှ ထည့်သွင်းပါ
import { LayoutDashboard, FolderPlus, Building2, Briefcase, LogOut, FileText } from 'lucide-react';
import { useContextHook } from '../../Context/context';
import { logout } from '../../utils/auth';

const AdminNav = () => {
  const { token, setToken } = useContextHook();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout(token);
    if (success) {
      localStorage.clear();
      setToken("");
      navigate("/");
    } else {
      setError("Logout Fail");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between p-6 fixed left-0 top-0 z-50">
      <div className="space-y-8">
        {/* Logo / Portal Title */}
        <div className="flex items-center px-2">
          <span className="text-xl font-extrabold text-blue-600 tracking-tight">Admin Portal</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 flex flex-col">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `px-4 py-3 rounded-2xl text-sm font-semibold transition flex items-center gap-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink 
            to="/admin/manage" 
            className={({ isActive }) => 
              `px-4 py-3 rounded-2xl text-sm font-semibold transition flex items-center gap-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <FolderPlus size={18} /> Categories & Assets
          </NavLink>

          <NavLink 
            to="/admin/pendingcompanies" 
            className={({ isActive }) => 
              `px-4 py-3 rounded-2xl text-sm font-semibold transition flex items-center gap-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Building2 size={18} /> Pending Companies
          </NavLink>

          <NavLink 
            to="/admin/pendingjobs" 
            className={({ isActive }) => 
              `px-4 py-3 rounded-2xl text-sm font-semibold transition flex items-center gap-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Briefcase size={18} /> Pending Jobs
          </NavLink>

          {/* Job Applications NavLink အသစ် */}
          <NavLink 
            to="/admin/job-applications" 
            className={({ isActive }) => 
              `px-4 py-3 rounded-2xl text-sm font-semibold transition flex items-center gap-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <FileText size={18} /> Job Applications
          </NavLink>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="space-y-2 pt-6 border-t border-gray-100">
        {error && <p className="text-xs text-red-500 px-2">{error}</p>}
        <button 
          onClick={handleLogout} 
          className="w-full px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition flex items-center gap-3 cursor-pointer"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminNav;