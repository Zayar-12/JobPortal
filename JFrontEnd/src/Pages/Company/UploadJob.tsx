// import React from 'react';
// import { Form, useLoaderData } from 'react-router';
// import type { Category } from '../../types/types';

// const UploadJob = () => {
//   const allcategories = useLoaderData() as Category[];

//   return (
//     <div>
//       <h1>Upload the Job</h1>

//       <Form method="post" className="flex flex-col gap-4 max-w-md">
//         <input type="text" name="title" placeholder="Job Title" required className="border p-2" />
        
//         <textarea name="description" placeholder="Job Description" required className="border p-2" />
        
//         <input type="number" name="salary" placeholder="Salary" required className="border p-2" />

//         <input type="text" name="location" placeholder="Location" required className="border p-2" />
//           <textarea 
//   name="requirements" 
//   placeholder="Job Requirements" 
//   required 
//   className="border p-2" 
// />
       
//         <select name="category_id" required className="border p-2">
//           <option value="">Select a Category</option>
//           {allcategories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>


//     <input type="date" name="deadline" required  />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Post Job
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default UploadJob;


import React from 'react';
import { Form, useLoaderData } from 'react-router';
import type { Category } from '../../types/types';

const UploadJob = () => {
  const allcategories = useLoaderData() as Category[];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-sm text-gray-500 mt-2">Fill in the details below to publish your opening to our platform.</p>
        </div>

        {/* Form */}
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" name="title" required placeholder="e.g. Senior Software Engineer" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Salary (Monthly)</label>
              <input type="number" name="salary" required placeholder="e.g. 5000" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" required placeholder="e.g. Yangon, Myanmar" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Category</label>
              <select name="category_id" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition bg-white">
                <option value="">Select a Category</option>
                {allcategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea name="description" rows={4} required placeholder="Describe the role responsibilities..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Requirements</label>
            <textarea name="requirements" rows={4} required placeholder="List necessary skills and qualifications..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <input type="date" name="deadline" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm">
            Post Job Opening
          </button>
        </Form>
      </div>
    </div>
  );
};

export default UploadJob;