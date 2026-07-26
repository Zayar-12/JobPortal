// import { useLoaderData ,NavLink} from "react-router"
// import type { Company } from "../types/types"


// const AllCompanies = () => {
//   const allCompanies=useLoaderData() as Company[];
//   return (
//     <div>
//       <h1> search bar</h1>
//       <div>
//         {
//           allCompanies && allCompanies.map((c)=>(
//            <h1 key={c.id}>
//             <NavLink to={`/allcompanies/${c.id}`}>{c.name}--
//               <img src={c.logo} alt={c.name} 
//         className="w-20 h-20 object-cover rounded-full" /></NavLink>
//            </h1>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default AllCompanies

// import { useLoaderData, NavLink } from "react-router";
// import type { Company } from "../types/types";

// const AllCompanies = () => {
//   const allCompanies = useLoaderData() as Company[];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Header Section */}
//       <div className="mb-10 text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Partner Companies</h1>
//         <div className="max-w-md mx-auto">
//           <input 
//             type="text" 
//             placeholder="Search for a company..." 
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Companies Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {allCompanies && allCompanies.map((c) => (
//           <NavLink 
//             key={c.id} 
//             to={`/allcompanies/${c.id}`}
//             className="group flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <img 
//               src={c.logo} 
//               alt={c.name} 
//               className="w-24 h-24 object-cover rounded-full border-2 border-gray-100 group-hover:border-blue-500 transition-colors" 
//             />
//             <h2 className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600">
//               {c.name}
//             </h2>
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllCompanies;

import React, { useState } from 'react';
import { useLoaderData, NavLink } from 'react-router';
import type { Company } from '../types/types';
import { Building2, Search, MapPin, Globe } from 'lucide-react';

const AllCompanies = () => {
  const allCompanies = useLoaderData() as Company[];
  const [searchTerm, setSearchTerm] = useState('');

 
  const filteredCompanies = allCompanies?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-xs border border-gray-100">
        <div className="space-y-1 text-center md:text-left">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Directory</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Partner Companies</h1>
          <p className="text-gray-500 text-sm">Explore all verified partner companies and their open positions.</p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search company or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies && filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCompanies.map((c) => (
            <NavLink 
              key={c.id} 
              to={`/allcompanies/${c.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-40 h-40 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={c.logo} 
                  alt={c.name} 
                  className="w-full h-full object-contain rounded-xl" 
                />
              </div>

              <div className="space-y-1 w-full">
                <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {c.name}
                </h2>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <MapPin size={13} className="text-gray-400" /> {c.location || "Global / Remote"}
                </p>
              </div>

              <div className="pt-2 w-full border-t border-gray-50 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>View Profile</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-xs space-y-3">
          <Building2 size={40} className="mx-auto text-gray-300" />
          <p className="text-gray-600 font-semibold">No companies found</p>
          <p className="text-gray-400 text-xs">Try searching with a different keyword.</p>
        </div>
      )}

    </div>
  );
};

export default AllCompanies;