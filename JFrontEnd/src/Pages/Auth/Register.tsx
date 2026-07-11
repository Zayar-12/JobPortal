// import React, { useState } from 'react'

// import { useNavigate } from 'react-router';
// import { registerApi } from '../../utils/auth';
// import { useContextHook } from '../../Context/context';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password_confirmation, setPasswordConfirmation] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { setToken } = useContextHook();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const success = await registerApi({
//         name, email, password, password_confirmation
//       });

//       if (success) {
//         const newToken = localStorage.getItem('token');
//         setToken(newToken || "");
//         navigate("/");
//       } else {
//         setError('Registration failed. Please check your details.');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create Account</h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-2">Join us and start your journey today</p>
//         </div>

//         {error && (
//           <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-100 dark:border-red-800/50">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input 
//             type="text" placeholder="Full Name" 
//             className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//             onChange={(e) => setName(e.target.value)} required 
//           />
//           <input 
//             type="email" placeholder="Email Address" 
//             className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//             onChange={(e) => setEmail(e.target.value)} required 
//           />
//           <input 
//             type="password" placeholder="Password" 
//             className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//             onChange={(e) => setPassword(e.target.value)} required 
//           />
//           <input 
//             type="password" placeholder="Confirm Password" 
//             className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//             onChange={(e) => setPasswordConfirmation(e.target.value)} required 
//           />

//           <button 
//             type="submit" disabled={loading}
//             className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition active:scale-[0.98]"
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { registerApi } from '../../utils/auth';
import { useContextHook } from '../../Context/context';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useContextHook();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await registerApi({ name, email, password, password_confirmation });
      if (success) {
        setToken(localStorage.getItem('token') || "");
        navigate("/");
      } else {
        setError('Registration failed. Please check your details.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-2">Join us and start your professional journey.</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              required 
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;