// import React from 'react'
// import {Outlet} from 'react-router'
// import NavBar from '../../components/NavBar'
// import ProNav from './ProNav'
// const ProLayout = () => {
//   return (
//    <div>
//      <NavBar/>
//      <div>Profile layout
//       <ProNav/>
// <Outlet/>
//      </div>
   
//    </div>
//   )
// }

// export default ProLayout

// ProLayout.tsx

import React from 'react'
import {Outlet} from 'react-router'
import NavBar from '../../components/NavBar'
import ProNav from './ProNav'
const ProLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="font-bold text-gray-700 mb-4">Account Settings</h2>
            <ProNav />
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-grow bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProLayout