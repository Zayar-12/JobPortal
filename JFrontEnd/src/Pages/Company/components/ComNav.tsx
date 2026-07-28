import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useContextHook } from '../../../Context/context';
import { logout } from '../../../utils/auth';
import { 
  Briefcase, 
  PlusCircle, 
  LogOut, 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  LayoutDashboard 
} from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        
        {/* Brand / Logo Area */}
        <NavLink 
          to="/companies/dashboard" 
          className="flex items-center gap-3 group text-gray-900 font-extrabold text-lg tracking-tight"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Briefcase size={20} />
          </div>
          <div className="flex flex-col">
            <span className="leading-none">Employer Portal</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Recruitment Hub</span>
          </div>
        </NavLink>

        {/* Error Notification if any */}
        {error && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-xl">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <NavLink 
                to="/companies/dashboard" 
                className={({ isActive }) => `flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl transition ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={16} /> 
                <span className="hidden sm:inline">Dashboard</span>
              </NavLink>

              <NavLink 
                to="/companies/uploadJob" 
                className={({ isActive }) => `flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl transition ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <PlusCircle size={16} className="text-blue-600" /> 
                <span>Upload Job</span>
              </NavLink>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50/80 hover:bg-red-100 border border-red-100 rounded-2xl transition cursor-pointer shadow-xs"
              >
                <LogOut size={16} /> 
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink 
                to="/companies/companylogin" 
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-2xl hover:bg-gray-50 transition"
              >
                <LogIn size={16} className="text-gray-400" /> 
                <span>Sign In</span>
              </NavLink>
              
              <NavLink 
                to="/companies/companyregister" 
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-lg shadow-blue-600/30"
              >
                <UserPlus size={16} /> 
                <span>Register</span>
              </NavLink>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default ComNav;