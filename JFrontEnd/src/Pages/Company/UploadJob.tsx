import React from 'react';
import { Form, useLoaderData } from 'react-router';
import type { Category } from '../../types/types';
import { 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Send 
} from 'lucide-react';
import uploadImg from '../../assets/upload img.png';

const UploadJob = () => {
  const allcategories = useLoaderData() as Category[];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Container Card Split into Left & Right */}
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Illustration / Image Panel */}
        <div className="lg:col-span-5 relative bg-blue-950 p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Illustration Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={uploadImg} 
              alt="Upload Illustration" 
              className="w-full h-full object-cover object-center opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20">
              <Briefcase size={14} /> Employer Portal
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
              Find the Right Talent for Your Team
            </h2>
            <p className="text-blue-100/80 text-sm leading-relaxed">
              Publish your job openings to reach qualified professionals and streamline your hiring process from one central dashboard.
            </p>
          </div>

          <div className="relative z-10 pt-12">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-white space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Did you know?</p>
              <p className="text-xs text-blue-100 leading-relaxed">
                Detailed descriptions and clear requirements attract up to 3x more relevant candidate applications.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Job Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Post a New Job Opening</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Fill in the specification details below to publish your opening.</p>
          </div>

          {/* Form */}
          <Form method="post" className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Job Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase size={14} className="text-blue-600" /> Job Title
                </label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="e.g. Senior Software Engineer" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800" 
                />
              </div>

              {/* Salary */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign size={14} className="text-blue-600" /> Salary (Monthly)
                </label>
                <input 
                  type="number" 
                  name="salary" 
                  required 
                  placeholder="e.g. 5000" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-600" /> Location
                </label>
                <input 
                  type="text" 
                  name="location" 
                  required 
                  placeholder="e.g. Yangon, Myanmar" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800" 
                />
              </div>

              {/* Job Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-600" /> Job Category
                </label>
                <select 
                  name="category_id" 
                  required 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800 cursor-pointer"
                >
                  <option value="">Select a Category</option>
                  {allcategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600" /> Job Description
              </label>
              <textarea 
                name="description" 
                rows={3} 
                required 
                placeholder="Describe the role responsibilities, team structure, and daily tasks..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800 resize-y" 
              />
            </div>

            {/* Requirements */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600" /> Requirements & Qualifications
              </label>
              <textarea 
                name="requirements" 
                rows={3} 
                required 
                placeholder="List necessary skills, experience levels, and qualifications..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800 resize-y" 
              />
            </div>

            {/* Application Deadline */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-600" /> Application Deadline
              </label>
              <input 
                type="date" 
                name="deadline" 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm font-medium text-gray-800 cursor-pointer" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-3.5 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} /> Post Job Opening
            </button>
          </Form>
        </div>

      </div>
    </div>
  );
};

export default UploadJob;