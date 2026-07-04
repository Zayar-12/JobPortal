import React from 'react'
import {Outlet} from 'react-router'
import NavBar from '../../components/NavBar'
import ProNav from './ProNav'
const ProLayout = () => {
  return (
   <div>
     <NavBar/>
     <div>Profile layout
      <ProNav/>
<Outlet/>
     </div>
   
   </div>
  )
}

export default ProLayout