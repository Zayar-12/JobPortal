import { NavLink, useLoaderData, useSearchParams } from 'react-router';
import type { Job } from '../types/types';

 const SearchResults = () => {
  const jobs = useLoaderData() as Job[];
  const [searchParams] = useSearchParams();
  
 
  const title = searchParams.get("title");

  return (
    <div>
      <h1>Results for {title}</h1>
       {
        jobs && jobs.map(j=>(
          <div>
             <NavLink to={`/allcompanies/${j.company.id}`}>{j.company.name}</NavLink>
               <NavLink to={`/userJobs/${j.id}`}>{j.title}</NavLink>
          </div>
           

        ))
       }
    </div>
  );
};

 export default SearchResults