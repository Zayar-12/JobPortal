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

import { NavLink, useLoaderData } from "react-router";
import type { Category } from "../types/types";

const JobByCategory = () => {
  const allCategories = useLoaderData() as Category[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs by Category</h1>
        <p className="text-lg text-gray-600">
          Find your next career opportunity by exploring our industry-specific job listings.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCategories && allCategories.length > 0 ? (
          allCategories.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 group"
            >
              {/* Optional: Add an icon placeholder here for a more "formal" look */}
              <div className="text-blue-600 text-4xl mb-4 group-hover:scale-110 transition-transform">
                {/* You could map names to icons here */}
                📁
              </div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                {c.name}
              </h2>
            </NavLink>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No categories available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobByCategory;