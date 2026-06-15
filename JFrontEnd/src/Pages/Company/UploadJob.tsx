import React from 'react';
import { Form, useLoaderData } from 'react-router';
import type { Category } from '../../types/types';

const UploadJob = () => {
  const allcategories = useLoaderData() as Category[];

  return (
    <div>
      <h1>Upload the Job</h1>

      <Form method="post" className="flex flex-col gap-4 max-w-md">
        <input type="text" name="title" placeholder="Job Title" required className="border p-2" />
        
        <textarea name="description" placeholder="Job Description" required className="border p-2" />
        
        <input type="number" name="salary" placeholder="Salary" required className="border p-2" />

        <input type="text" name="location" placeholder="Location" required className="border p-2" />
          <textarea 
  name="requirements" 
  placeholder="Job Requirements" 
  required 
  className="border p-2" 
/>
       
        <select name="category_id" required className="border p-2">
          <option value="">Select a Category</option>
          {allcategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>


    <input type="date" name="deadline" required  />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
      </Form>
    </div>
  );
};

export default UploadJob;