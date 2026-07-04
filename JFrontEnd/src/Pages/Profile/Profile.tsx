import React from 'react'
import { useLoaderData } from 'react-router'
import type { profile } from '../../types/types'

const Profile = () => {
  const profile=useLoaderData() as profile;
  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.email}</p>
      <p>{profile.name}</p>
    
    </div>
  )
}

export default Profile