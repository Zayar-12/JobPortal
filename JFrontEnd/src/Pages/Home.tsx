import React from 'react'
import { Form, useLoaderData } from 'react-router';
import { NavLink } from 'react-router';
import type { Category, Job } from '../types/types';
const Home = () => {

  const { allCategories, latestJobs } = useLoaderData() as { 
    allCategories: Category[], 
    latestJobs: Job[] 
  };
  return (
    <h1>
      <h1>
       <Form action="/search-results" method="get">
      <input type="text" name="title" placeholder="Job Title" />
      <input type="text" name="location" placeholder="Location" />
      <button type="submit">Search</button>
    </Form>
      </h1>
      <div className='mt-20'>
        Job categories
        <div className='mt-3'>
          {
          allCategories ? <div>
               {
                allCategories.map((category)=>(
                  <div key={category.id}>
                    <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
                  </div>
                ))
               }
          </div>: <h1>No categories</h1>
        }
        </div>
      </div>

      <div className='mt-20'>
        Latest Jobs
       
       <div className='mt-3'>
        {
        latestJobs.map((latestJob)=>(
          <div key={latestJob.id}>
              
             <NavLink to={`/userJobs/${latestJob.id}`}>{latestJob.title}--{latestJob.company.name}
             <img src={latestJob.company.logo} alt={latestJob.company.name} 
        className="w-20 h-20 object-cover rounded-full" />
              </NavLink>
          </div>
        ))
       }
       </div>
      </div>
    </h1>
    
  )
}

export default Home