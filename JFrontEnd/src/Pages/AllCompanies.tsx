import { useLoaderData ,NavLink} from "react-router"
import type { Company } from "../types/types"


const AllCompanies = () => {
  const allCompanies=useLoaderData() as Company[];
  return (
    <div>
      <h1> search bar</h1>
      <div>
        {
          allCompanies && allCompanies.map((c)=>(
           <h1 key={c.id}>
            <NavLink to={`/allcompanies/${c.id}`}>{c.name}--
              <img src={c.logo} alt={c.name} 
        className="w-20 h-20 object-cover rounded-full" /></NavLink>
           </h1>
          ))
        }
      </div>
    </div>
  )
}

export default AllCompanies