// import { NavLink, useLoaderData, useSearchParams } from 'react-router';
// import type { Job } from '../types/types';

//  const SearchResults = () => {
//   const searchJobResponse = useLoaderData() ;
//   const jobs=searchJobResponse.data as Job[];
//   const links=searchJobResponse.meta.links;
//   const [searchParams] = useSearchParams();
  
 
//  const title = searchParams.get("title");
//   const location = searchParams.get("location");

//   return (
//     <div>
//       <h1>Results for {title}</h1>
//        {
//         jobs && jobs.map(j=>(
//           <div>
//              <NavLink to={`/allcompanies/${j.company.id}`}>{j.company.name}
//               <img src={j.company.logo} alt={j.company.name} 
//         className="w-20 h-20 object-cover rounded-full" />
//              </NavLink>
//                <NavLink to={`/userJobs/${j.id}`}>{j.title}</NavLink>
//           </div>
           

//         ))
//        }
//        <div className='flex gap-2 mt-10'>
//                  {links.map((link: any, index: number) => (
//                    <NavLink
//                      key={index}
//                      to={link.url ? `/search-results?title=${title}&location=${location}&page=${new URL(link.url).searchParams.get("page")}` : "#"}
//                      className={`px-4 py-2 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//                    >
//                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
//                    </NavLink>
//                  ))}
//                </div>
//     </div>
//   );
// };

//  export default SearchResults

import { NavLink, useLoaderData, useSearchParams } from 'react-router';
import type { Job } from '../types/types';

const SearchResults = () => {
  const searchJobResponse = useLoaderData() as any;
  const jobs = searchJobResponse?.data as Job[];
  const links = searchJobResponse?.meta?.links || [];
  const [searchParams] = useSearchParams();
  
  const title = searchParams.get("title");
  const location = searchParams.get("location");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Search Results for: <span className="text-blue-600">"{title || "All Jobs"}"</span>
        </h1>
        {location && <p className="text-gray-500 mt-1">Location: {location}</p>}
      </div>

      {/* Results Listing */}
      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((j) => (
            <div key={j.id} className="flex items-center p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-400 transition-all">
              {/* Company Logo */}
              <NavLink to={`/allcompanies/${j.company.id}`} className="flex-shrink-0">
                <img 
                  src={j.company.logo} 
                  alt={j.company.name} 
                  className="w-16 h-16 object-cover rounded-full border border-gray-100" 
                />
              </NavLink>
              
              {/* Job Info */}
              <div className="ml-5 flex-grow">
                <NavLink to={`/userJobs/${j.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                  {j.title}
                </NavLink>
                <div className="text-sm text-gray-600 mt-1">{j.company.name}</div>
              </div>
              
              <NavLink to={`/userJobs/${j.id}`} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                View Details
              </NavLink>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-xl font-medium">No jobs found matching your criteria.</h3>
            <NavLink to="/" className="text-blue-600 hover:underline">Return to home</NavLink>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {links.length > 0 && (
        <div className="flex gap-2 mt-10 justify-center">
          {links.map((link: any, index: number) => (
            <NavLink
              key={index}
              to={link.url ? `/search-results?title=${title}&location=${location}&page=${new URL(link.url).searchParams.get("page")}` : "#"}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;