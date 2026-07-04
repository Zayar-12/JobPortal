import React from 'react'
import { NavLink } from 'react-router'
const ProNav = () => {
  return (
    <div>
        <NavLink to={"/profile/jobApplications"}>Job applications</NavLink>
    </div>
  )
}

export default ProNav