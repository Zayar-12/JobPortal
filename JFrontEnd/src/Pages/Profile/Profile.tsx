import React from 'react'
import { useLoaderData } from 'react-router'
import type { profile } from '../../types/types'

// const Profile = () => {
//   const profile=useLoaderData() as profile;
//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>{profile.email}</p>
//       <p>{profile.name}</p>
    
//     </div>
//   )
// }

const Profile = () => {
  const profile = useLoaderData() as any; // Adjust type as needed
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <label className="block text-xs font-semibold text-gray-500 uppercase">Full Name</label>
          <p className="text-lg font-medium text-gray-900">{profile.name}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border">
          <label className="block text-xs font-semibold text-gray-500 uppercase">Email Address</label>
          <p className="text-lg font-medium text-gray-900">{profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile