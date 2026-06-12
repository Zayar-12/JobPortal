
import { NavLink } from "react-router"
const NavBar = () => {
  return (
  <nav className="flex items-center justify-between px-10 py-5 ">
     <NavLink to={"/"}>Home</NavLink>
   
    <div className=" flex items-center justify-end gap-10">
       <NavLink to={"/allcompanies"}>All compaines</NavLink>
      <NavLink to={"/jobbycategory"}>Jobs by Category</NavLink>
        <NavLink to={"/login"}>Login </NavLink>
     <NavLink to={"/register"}>Register</NavLink>
     <NavLink to={"/compaines"}><p>Companies</p><p>Post Jobs and Find Talent</p></NavLink>
    </div>

  </nav>
  )
}

export default NavBar