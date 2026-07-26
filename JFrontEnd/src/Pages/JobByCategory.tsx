// import React from 'react'
// import { NavLink, useLoaderData } from 'react-router'
// import type { Category } from '../types/types'

// const JobByCategory = () => {
//   const allcategories= useLoaderData() as Category[];
//   return (
//     <div>
//       <h1>All categories</h1>
//       <div>{
//         allcategories && allcategories.map((c)=>(
//           <div key={c.id}>
//             <NavLink to={`/category/${c.id}`}>{c.name}</NavLink>
//           </div>
//         ))
//         }</div>
//     </div>
//   )
// }

// export default JobByCategory

// import { NavLink, useLoaderData } from "react-router";
// import type { Category } from "../types/types";

// const JobByCategory = () => {
//   const allCategories = useLoaderData() as Category[];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       {/* Page Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs by Category</h1>
//         <p className="text-lg text-gray-600">
//           Find your next career opportunity by exploring our industry-specific job listings.
//         </p>
//       </div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {allCategories && allCategories.length > 0 ? (
//           allCategories.map((c) => (
//             <NavLink
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 group"
//             >
//               {/* Optional: Add an icon placeholder here for a more "formal" look */}
//               <div className="text-blue-600 text-4xl mb-4 group-hover:scale-110 transition-transform">
//                 {/* You could map names to icons here */}
//                 📁
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
//                 {c.name}
//               </h2>
//             </NavLink>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10 text-gray-500">
//             No categories available at the moment.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobByCategory;

import React, { useState } from 'react';
import { useLoaderData, NavLink } from 'react-router';
import type { Category } from '../types/types';
import { Search, FolderKanban, ArrowRight } from 'lucide-react';

const JobByCategory = () => {
  const allCategories = useLoaderData() as Category[];
  const [searchTerm, setSearchTerm] = useState('');


  const filteredCategories = allCategories?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      
      {/* Page Header & Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-xs border border-gray-100">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Industries</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Browse Jobs by Category</h1>
          <p className="text-gray-500 text-sm">Find your next career opportunity by exploring our industry-specific job listings.</p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories && filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                     {c.icon ? (
                                       <img src={c.icon} alt={c.name} className="w-full h-full object-contain rounded-xl" />
                                     ) : (
                                       <FolderKanban size={26} className="text-blue-600" />
                                     )}
                                   </div>
             
                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  <ArrowRight size={16} />
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </h2>
                <p className="text-xs text-gray-400">Explore open positions</p>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-xs space-y-3">
          <FolderKanban size={40} className="mx-auto text-gray-300" />
          <p className="text-gray-600 font-semibold">No categories found</p>
          <p className="text-gray-400 text-xs">Try searching with a different keyword.</p>
        </div>
      )}

    </div>
  );
};

export default JobByCategory;