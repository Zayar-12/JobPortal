import React from 'react'
import { NavLink } from 'react-router'
const CompanyHome = () => {
  return (
    <div>

        <h1>CompanyHome</h1>
         <NavLink to={"/companies/companyregister"}>Get Started</NavLink>
    </div>

  )
}

export default CompanyHome