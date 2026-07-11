// import React, { useState } from 'react'
// import {Link} from 'react-router'
// import { login } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';

// import { useContextHook } from '../../Context/context';
// import { axiosClient } from '../../axios/axiosutils';

// const Login = () => {
//     const[email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [error,setError]=useState("");
//     const [loading,setLoading]=useState(false);
//     const {setToken,token,company_id,setCompanyId,setRole,role,setUserId,user_id}=useContextHook();

//     const navigate=useNavigate();

//     const handleSubmit= async(e: React.FormEvent)=>{

//         e.preventDefault();
// setLoading(true);

// try {
//     const success= await login({
//         email,password
//     });

//     if(success){
//        const token = localStorage.getItem('token');
//             const role = localStorage.getItem('role');

          
//             if (token) setToken(token);
//             if (role) setRole(role);
//        localStorage.removeItem('role');
//         if(role === "employer"){
//             // const employer_id=localStorage.getItem("user_id");
//            try {
//                     const res = await axiosClient.get("/companyId", {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     });

                   
//                     // localStorage.setItem("company_id", res.data.company_id);
                    
//                      setCompanyId(res.data.company_id);
                   
                    
//                     navigate("/companies/dashboard");
//                 } catch (err) {
//                     console.error("Failed to fetch company_id", err);
//                     setError("Could not retrieve company details.");
//                 }
//         }else{
//             navigate("/");
//         }
    
//     }else{
//        setError('Invalid credentials');
//     }
// } catch (error) {
//     setError('An error occurred. Please try again.');
// }finally{
//     setLoading(false);
// }

//     }
//   return (
//    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            
           
//             <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                
                
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
//                         Welcome Back
//                     </h1>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                         Please enter your details to sign in
//                     </p>
//                 </div>

                
//                 {error && (
//                     <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border border-red-100 dark:border-red-800/50 rounded-xl transition-all">
//                         ⚠️ {error}
//                     </div>
//                 )}

               
//                 <form onSubmit={handleSubmit} className="space-y-5">
                    
                   
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
//                             Email Address
//                         </label>
//                         <input 
//                             type="email"  
//                             name="email" 
//                             required 
//                             placeholder="you@example.com"
//                             onChange={(e) => setEmail(e.target.value)} 
//                             className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                     </div>

                  
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
//                             Password
//                         </label>
//                         <input 
//                             type="password"  
//                             name="password" 
//                             required 
//                             placeholder="••••••••"
//                             onChange={(e) => setPassword(e.target.value)} 
//                             className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                     </div>

                    
//                     <button 
//                         type="submit"  
//                         disabled={loading}
//                         className="w-full mt-2 px-4 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
//                     >
//                         {loading ? (
//                             <div className="flex items-center justify-center gap-2">
//                                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
//                                 Signing in...
//                             </div>
//                         ) : (
//                             "Sign In"
//                         )}
//                     </button>

//                 </form>
//                 <Link to={"/register"}>Don't have an account</Link>
//             </div>
//         </div>
//   )
// }

// export default Login



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../../utils/auth';
import { useContextHook } from '../../Context/context';
import { axiosClient } from '../../axios/axiosutils';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { setToken, setCompanyId, setRole } = useContextHook();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login({ email, password });

      if (success) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token) setToken(token);
        if (role) setRole(role);
        localStorage.removeItem('role');

        if (role === "employer") {
          try {
            const res = await axiosClient.get("/companyId", {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCompanyId(res.data.company_id);
            navigate("/companies/dashboard");
          } catch (err) {
            console.error("Failed to fetch company details", err);
            setError("Could not retrieve company profile information.");
          }
        } else {
          navigate("/");
        }
      } else {
        setError('Invalid email or password. Please verify your credentials.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="text-sm text-gray-500 mt-2">Welcome back. Please enter your credentials.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/companies/companyregister" className="font-semibold text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;