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

import { useLoaderData, NavLink } from "react-router";
import type { Company } from "../types/types";

const AllCompanies = () => {
  const allCompanies = useLoaderData() as Company[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Partner Companies</h1>
        <div className="max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Search for a company..." 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCompanies && allCompanies.map((c) => (
          <NavLink 
            key={c.id} 
            to={`/allcompanies/${c.id}`}
            className="group flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <img 
              src={c.logo} 
              alt={c.name} 
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-100 group-hover:border-blue-500 transition-colors" 
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600">
              {c.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AllCompanies;