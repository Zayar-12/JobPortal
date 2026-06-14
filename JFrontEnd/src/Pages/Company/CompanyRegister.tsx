import React from 'react'
import { Form } from 'react-router'

const CompanyRegister = () => {
  return (
    <div>
      <h1>Sign Up for Free Employer Account</h1>
    <Form method="post" className='flex flex-col'>

      <input type="email" name='email' placeholder='E-mail' />

      <input type="password" required name='password' placeholder='password' />

      <input type="password" required name='password_confirmation'  placeholder='password_confirmation'/>
  
  <input type="text" name="name" placeholder="Company Name" required />
  
  <textarea name="description" placeholder="Company Description" required />
  
  <input type="text" name="logo" placeholder="Logo URL" />
  
  <input type="text" name="location" placeholder="Location (e.g., Yangon)" />
  
  <input type="text" name="website" placeholder="Company Website URL" />
  
  <button type="submit">Save Company</button>
</Form>
    </div>
  )
}

export default CompanyRegister