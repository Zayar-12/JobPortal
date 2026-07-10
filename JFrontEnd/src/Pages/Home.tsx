  import React from 'react'
  import { Form, useLoaderData } from 'react-router';
  import { NavLink } from 'react-router';
  import type { Category, Job } from '../types/types';
  // const Home = () => {

  //   // const { allCategories, latestJobs } = useLoaderData() as { 
  //   //   allCategories: Category[], 
  //   //   latestJobs: Job[] 
  //   // };
  //   const { allCategories, jobsResponse } = useLoaderData() as any;
  // const latestJobs = jobsResponse?.data || []; 
  //   const links = jobsResponse?.meta?.links || [];
  //   return (
  //     <h1>
  //       <h1>
  //       <Form action="/search-results" method="get">
  //       <input type="text" name="title" placeholder="Job Title" />
  //       <input type="text" name="location" placeholder="Location" />
  //       <button type="submit">Search</button>
  //     </Form>
  //       </h1>
  //       <div className='mt-20'>
  //         Job categories
  //         <div className='mt-3'>
  //           {
  //           allCategories ? <div>
  //               {
  //                 allCategories.map((category:Category)=>(
  //                   <div key={category.id}>
  //                     <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
  //                   </div>
  //                 ))
  //               }
  //           </div>: <h1>No categories</h1>
  //         }
  //         </div>
  //       </div>

  //       <div className='mt-20'>
  //         Latest Jobs
        
  //       {/* <div className='mt-3'>
  //         {
  //         latestJobs.map((latestJob)=>(
  //           <div key={latestJob.id}>
                
  //             <NavLink to={`/userJobs/${latestJob.id}`}>{latestJob.title}--{latestJob.company.name}
  //             <img src={latestJob.company.logo} alt={latestJob.company.name} 
  //         className="w-20 h-20 object-cover rounded-full" />
  //               </NavLink>
  //           </div>
  //         ))
  //       }
  //       </div> */}
  //       <div className='mt-20'>
  //         Latest Jobs
  //         <div className='mt-3'>
  //           {latestJobs.map((latestJob: any) => (
  //             <div key={latestJob.id}>
  //               <NavLink to={`/userJobs/${latestJob.id}`}>
  //                 {latestJob.title}--{latestJob.company.name}
  //                 <img src={latestJob.company.logo} alt={latestJob.company.name} 
  //         className="w-20 h-20 object-cover rounded-full" />
  //               </NavLink>
  //             </div>
  //           ))}
  //         </div>

  //         <div className='flex gap-2 mt-10'>
  //           {links.map((link: any, index: number) => (
  //             <NavLink
  //               key={index}
  //               to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"}
  //               className={`px-4 py-2 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
  //             >
  //               <span dangerouslySetInnerHTML={{ __html: link.label }} />
  //             </NavLink>
  //           ))}
  //         </div>
  //       </div>
  //       </div>
  //     </h1>
      
  //   )
  // }

  // export default Home







  const Home = () => {
  const { allCategories, jobsResponse } = useLoaderData() as any;
  const latestJobs = jobsResponse?.data || []; 
  const links = jobsResponse?.meta?.links || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero / Search Section */}
      <section className="bg-blue-900 text-white p-10 rounded-xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Find Your Dream Job</h1>
        <Form action="/search-results" method="get" className="flex flex-col md:flex-row gap-4 justify-center">
          <input className="p-3 rounded text-black w-full md:w-64" type="text" name="title" placeholder="Job Title" />
          <input className="p-3 rounded text-black w-full md:w-64" type="text" name="location" placeholder="Location" />
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded font-semibold" type="submit">Search</button>
        </Form>
      </section>

      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allCategories?.map((cat: Category) => (
            <NavLink key={cat.id} to={`/category/${cat.id}`} className="p-4 border rounded-lg hover:shadow-md transition">
              {cat.name}
            </NavLink>
          ))}
        </div>
      </section>

      {/* Job Listings Card Layout */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Opportunities</h2>
        <div className="space-y-4">
          {latestJobs.map((job: any) => (
            <div key={job.id} className="flex items-center p-6 border rounded-lg hover:border-blue-500 transition shadow-sm">
              <img src={job.company.logo} alt={job.company.name} className="w-16 h-16 object-contain rounded border" />
              <div className="ml-6 flex-grow">
                <NavLink to={`/userJobs/${job.id}`} className="text-xl font-semibold hover:text-blue-600">
                  {job.title}
                </NavLink>
                <p className="text-gray-600">{job.company.name}</p>
              </div>
              <span className="text-blue-600 font-medium">View Details</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className='flex gap-2 mt-10 justify-center'>
        {links.map((link: any, index: number) => (
          <NavLink key={index} to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"} 
            className={`px-4 py-2 border rounded ${link.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </NavLink>
        ))}
      </div>
    </div>



  )
}

export default Home