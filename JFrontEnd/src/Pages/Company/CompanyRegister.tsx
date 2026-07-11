// import React from 'react'
// import { Form } from 'react-router'

// const CompanyRegister = () => {
//   return (
//     <div>
//       <h1>Sign Up for Free Employer Account</h1>
//     <Form method="post" encType="multipart/form-data" className='flex flex-col'>

//       <input type="email" name='email' placeholder='E-mail' />

//       <input type="password" required name='password' placeholder='password' />

//       <input type="password" required name='password_confirmation'  placeholder='password_confirmation'/>
  
//   <input type="text" name="name" placeholder="Company Name" required />
  
//   <textarea name="description" placeholder="Company Description" required />
  
// <input type="file" placeholder='logo' name="logo" accept="image/*" />
// <input type="file" placeholder='background_photo' name="background_photo" accept="image/*" />
  
//   <input type="text" name="location" placeholder="Location (e.g., Yangon)" />
  
//   <input type="text" name="website" placeholder="Company Website URL" />
  
//   <button type="submit">Save Company</button>
// </Form>
//     </div>
//   )
// }

// export default CompanyRegister




import React from 'react';
import { Form } from 'react-router';

const CompanyRegister = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Employer Registration</h1>
          <p className="text-sm text-gray-500 mt-2">Create your company profile to start hiring top talent.</p>
        </div>

        {/* Form */}
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input type="url" name="website" placeholder="https://example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" name="password_confirmation" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company Description</label>
            <textarea name="description" rows={4} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" placeholder="City, Country" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Logo</label>
              <input type="file" name="logo" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Background Photo</label>
              <input type="file" name="background_photo" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md">
            Complete Registration
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegister;