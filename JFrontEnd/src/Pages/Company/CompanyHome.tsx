// import React from 'react'
// import { NavLink } from 'react-router'
// const CompanyHome = () => {
//   return (
//     <div>

//         <h1>CompanyHome</h1>
//          <NavLink to={"/companies/companyregister"}>Get Started</NavLink>
//     </div>

//   )
// }

// export default CompanyHome

import React from 'react';
import { NavLink } from 'react-router';

const CompanyHome = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-3xl text-center">
        {/* Header Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Connect with top talent, <br />
          <span className="text-blue-600">effortlessly.</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Join our growing network of industry-leading companies. Manage your job postings, 
          track incoming applications, and find the perfect candidate to drive your business forward.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center">
          <NavLink 
            to="/companies/companyregister" 
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Get Started Today
          </NavLink>
        </div>

        {/* Trust Indicators (Optional) */}
        <div className="mt-16 border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-500">
          <div>
            <h3 className="font-bold text-gray-900">Seamless Hiring</h3>
            <p className="text-sm">Streamlined workflows for your team.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Global Reach</h3>
            <p className="text-sm">Access top talent from anywhere.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Data Driven</h3>
            <p className="text-sm">Manage applications with precision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;