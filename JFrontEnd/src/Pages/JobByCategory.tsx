import React from 'react'
import { NavLink, useLoaderData } from 'react-router'
import type { Category } from '../types/types'

const JobByCategory = () => {
  const allcategories= useLoaderData() as Category[];
  return (
    <div>
      <h1>All categories</h1>
      <div>{
        allcategories && allcategories.map((c)=>(
          <div key={c.id}>
            <NavLink to={`/category/${c.id}`}>{c.name}</NavLink>
          </div>
        ))
        }</div>
    </div>
  )
}

export default JobByCategory