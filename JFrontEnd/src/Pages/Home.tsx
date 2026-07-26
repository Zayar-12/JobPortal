//   import React from 'react'
//   import { Form, useLoaderData } from 'react-router';
//   import { NavLink } from 'react-router';
//   import type { Category, Job } from '../types/types';
//   // const Home = () => {

//   //   // const { allCategories, latestJobs } = useLoaderData() as { 
//   //   //   allCategories: Category[], 
//   //   //   latestJobs: Job[] 
//   //   // };
//   //   const { allCategories, jobsResponse } = useLoaderData() as any;
//   // const latestJobs = jobsResponse?.data || []; 
//   //   const links = jobsResponse?.meta?.links || [];
//   //   return (
//   //     <h1>
//   //       <h1>
//   //       <Form action="/search-results" method="get">
//   //       <input type="text" name="title" placeholder="Job Title" />
//   //       <input type="text" name="location" placeholder="Location" />
//   //       <button type="submit">Search</button>
//   //     </Form>
//   //       </h1>
//   //       <div className='mt-20'>
//   //         Job categories
//   //         <div className='mt-3'>
//   //           {
//   //           allCategories ? <div>
//   //               {
//   //                 allCategories.map((category:Category)=>(
//   //                   <div key={category.id}>
//   //                     <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
//   //                   </div>
//   //                 ))
//   //               }
//   //           </div>: <h1>No categories</h1>
//   //         }
//   //         </div>
//   //       </div>

//   //       <div className='mt-20'>
//   //         Latest Jobs
        
//   //       {/* <div className='mt-3'>
//   //         {
//   //         latestJobs.map((latestJob)=>(
//   //           <div key={latestJob.id}>
                
//   //             <NavLink to={`/userJobs/${latestJob.id}`}>{latestJob.title}--{latestJob.company.name}
//   //             <img src={latestJob.company.logo} alt={latestJob.company.name} 
//   //         className="w-20 h-20 object-cover rounded-full" />
//   //               </NavLink>
//   //           </div>
//   //         ))
//   //       }
//   //       </div> */}
//   //       <div className='mt-20'>
//   //         Latest Jobs
//   //         <div className='mt-3'>
//   //           {latestJobs.map((latestJob: any) => (
//   //             <div key={latestJob.id}>
//   //               <NavLink to={`/userJobs/${latestJob.id}`}>
//   //                 {latestJob.title}--{latestJob.company.name}
//   //                 <img src={latestJob.company.logo} alt={latestJob.company.name} 
//   //         className="w-20 h-20 object-cover rounded-full" />
//   //               </NavLink>
//   //             </div>
//   //           ))}
//   //         </div>

//   //         <div className='flex gap-2 mt-10'>
//   //           {links.map((link: any, index: number) => (
//   //             <NavLink
//   //               key={index}
//   //               to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"}
//   //               className={`px-4 py-2 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//   //             >
//   //               <span dangerouslySetInnerHTML={{ __html: link.label }} />
//   //             </NavLink>
//   //           ))}
//   //         </div>
//   //       </div>
//   //       </div>
//   //     </h1>
      
//   //   )
//   // }

//   // export default Home







//   const Home = () => {
//   const { allCategories, jobsResponse } = useLoaderData() as any;
//   const latestJobs = jobsResponse?.data || []; 
//   const links = jobsResponse?.meta?.links || [];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Hero / Search Section */}
//       <section className="bg-blue-900 text-white p-10 rounded-xl text-center mb-12">
//         <h1 className="text-4xl font-bold mb-6">Find Your Dream Job</h1>
//         <Form action="/search-results" method="get" className="flex flex-col md:flex-row gap-4 justify-center">
//           <input className="p-3 rounded text-black w-full md:w-64" type="text" name="title" placeholder="Job Title" />
//           <input className="p-3 rounded text-black w-full md:w-64" type="text" name="location" placeholder="Location" />
//           <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded font-semibold" type="submit">Search</button>
//         </Form>
//       </section>

//       {/* Categories Grid */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {allCategories?.map((cat: Category) => (
//             <NavLink key={cat.id} to={`/category/${cat.id}`} className="p-4 border rounded-lg hover:shadow-md transition">
//               {cat.name}
//               <img src={cat.icon} alt="" />
//             </NavLink>
//           ))}
//         </div>
//       </section>

//       {/* Job Listings Card Layout */}
//       <section>
//         <h2 className="text-2xl font-bold mb-6">Latest Opportunities</h2>
//         <div className="space-y-4">
//           {latestJobs.map((job: any) => (
//             <div key={job.id} className="flex items-center p-6 border rounded-lg hover:border-blue-500 transition shadow-sm">
//               <img src={job.company.logo} alt={job.company.name} className="w-16 h-16 object-contain rounded border" />
//               <div className="ml-6 flex-grow">
//                 <NavLink to={`/userJobs/${job.id}`} className="text-xl font-semibold hover:text-blue-600">
//                   {job.title}
//                 </NavLink>
//                 <p className="text-gray-600">{job.company.name}</p>
//               </div>
//               <span className="text-blue-600 font-medium">View Details</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Pagination */}
//       <div className='flex gap-2 mt-10 justify-center'>
//         {links.map((link: any, index: number) => (
//           <NavLink key={index} to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"} 
//             className={`px-4 py-2 border rounded ${link.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
//             <span dangerouslySetInnerHTML={{ __html: link.label }} />
//           </NavLink>
//         ))}
//       </div>
//     </div>



//   )
// }

// export default Home


import React from 'react';
import { Form, useLoaderData, NavLink } from 'react-router';
import type { Category, Job } from '../types/types';
import { Search, MapPin, ArrowRight, Briefcase, FolderKanban, Building2 } from 'lucide-react';

const Home = () => {
  const { allCategories, jobsResponse } = useLoaderData() as any;
  const latestJobs = jobsResponse?.data || []; 
  const links = jobsResponse?.meta?.links || [];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* Hero / Search Section with Modern Gradient & Card Vibe */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-6 rounded-b-[40px] shadow-xl mb-16 overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="px-4 py-1.5 bg-blue-800/80 text-blue-200 text-xs font-semibold rounded-full border border-blue-700/50 uppercase tracking-widest backdrop-blur-md">
            Find Your Future Today
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Dream Career</span>
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto font-light">
            Explore thousands of job listings or find top industry categories tailored for your professional growth.
          </p>

          {/* Search Box Form */}
          <Form action="/search-results" method="get" className="bg-white p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto border border-gray-100 mt-8">
            <div className="flex-1 flex items-center px-4 py-2.5 bg-gray-50/80 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <Briefcase size={20} className="text-gray-400 mr-3 shrink-0" />
              <input 
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none" 
                type="text" 
                name="title" 
                placeholder="Job title, keyword, or company" 
              />
            </div>
            
            <div className="flex-1 flex items-center px-4 py-2.5 bg-gray-50/80 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <MapPin size={20} className="text-gray-400 mr-3 shrink-0" />
              <input 
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none" 
                type="text" 
                name="location" 
                placeholder="City, region, or remote" 
              />
            </div>

            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer" 
              type="submit"
            >
              <Search size={18} /> Search Jobs
            </button>
          </Form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Categories Grid Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider">
                Industries
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Browse by Category
              </h2>
              <p className="text-gray-500 text-sm mt-1">Find opportunities categorized by your specialized field.</p>
            </div>
            <NavLink 
              to="/jobbycategory" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition"
            >
              View all categories 
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCategories && allCategories.length > 0 ? (
              allCategories.map((cat: Category) => (
                <NavLink 
                  key={cat.id} 
                  to={`/category/${cat.id}`}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-16 h-16 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                    {cat.icon ? (
                      <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <FolderKanban size={26} className="text-blue-600" />
                    )}
                  </div>

                  <div className="space-y-1 w-full">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-400">Explore open roles</p>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                No categories found.
              </div>
            )}
          </div>
        </section>

        {/* Latest Opportunities Card Layout Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider">
                Fresh Listings
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Latest Opportunities
              </h2>
              <p className="text-gray-500 text-sm mt-1">Apply to the newest openings posted by verified employers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestJobs && latestJobs.length > 0 ? (
              latestJobs.map((job: any) => (
                <div 
                  key={job.id} 
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner shrink-0 flex items-center justify-center">
                      {job.company?.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <Building2 size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <NavLink 
                        to={`/userJobs/${job.id}`} 
                        className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors block truncate"
                      >
                        {job.title}
                      </NavLink>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Building2 size={13} className="text-gray-400" /> {job.company?.name || "Confidential Company"}
                      </p>
                    </div>
                  </div>

                  <NavLink 
                    to={`/userJobs/${job.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition shrink-0"
                  >
                    Details →
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                No active job listings right now.
              </div>
            )}
          </div>
        </section>

        {/* Pagination Section */}
        {links && links.length > 0 && (
          <div className="flex gap-2 mt-12 justify-center items-center flex-wrap">
            {links.map((link: any, index: number) => (
              <NavLink 
                key={index} 
                to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"} 
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition border ${
                  link.active 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </NavLink>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;