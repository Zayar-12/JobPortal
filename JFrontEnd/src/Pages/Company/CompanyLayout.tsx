import React from 'react'
import {Outlet} from 'react-router'
import ComNav from './components/ComNav'
const CompanyLayout = () => {
  return (
    <div>
        <ComNav/>
        <Outlet/>
    </div>
  )
}

export default CompanyLayout