import React from 'react';
import { NavLink, useLoaderData, useSearchParams } from 'react-router';
import type { Job } from '../types/types';
import { 
  MapPin, 
  Building2, 
  ArrowRight, 
  Frown, 
  Home, 
  Sparkles 
} from 'lucide-react';
import jobSearchBg from '../assets/job search.avif';

const SearchResults = () => {
  const searchJobResponse = useLoaderData() as any;
  const jobs = searchJobResponse?.data as Job[];
  const links = searchJobResponse?.meta?.links || [];
  const [searchParams] = useSearchParams();
  
  const title = searchParams.get("title");
  const location = searchParams.get("location");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Banner with fully visible, clear background image */}
      <div className="relative bg-blue-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src={jobSearchBg} 
            alt="Job Search Background" 
            className="w-full h-full object-contain md:object-cover object-center opacity-40 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/75 to-indigo-950/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/15 shadow-sm">
            <Sparkles size={14} className="text-blue-400" /> Career Discovery Portal
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Search Results for: <span className="text-blue-400">"{title || "All Jobs"}"</span>
          </h1>
          {location && (
            <p className="text-blue-100/90 text-sm sm:text-base flex items-center justify-center gap-1.5 font-medium">
              <MapPin size={16} className="text-blue-400" /> Location Filter: {location}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl w-full mx-auto px-4 py-12 flex-grow">
        
        {/* Results Info Counter */}
        <div className="flex items-center justify-between mb-6 px-2">
          <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Showing {jobs ? jobs.length : 0} open positions
          </p>
        </div>

        {/* Results Listing */}
        <div className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((j) => (
              <div 
                key={j.id} 
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-gray-200/80 rounded-2xl shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Company Logo - Fully visible without cropping */}
                  <NavLink to={`/allcompanies/${j.company.id}`} className="flex-shrink-0">
                    <img 
                      src={j.company.logo} 
                      alt={j.company.name} 
                      className="w-16 h-16 object-contain bg-gray-50 rounded-2xl border border-gray-200 p-1 shadow-xs group-hover:scale-105 transition-transform" 
                    />
                  </NavLink>
                  
                  {/* Job Info */}
                  <div className="flex flex-col">
                    <NavLink 
                      to={`/userJobs/${j.id}`} 
                      className="text-base sm:text-lg font-bold text-gray-900 hover:text-blue-600 transition tracking-tight"
                    >
                      {j.title}
                    </NavLink>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-gray-700">
                        <Building2 size={14} className="text-blue-600" /> {j.company.name}
                      </span>
                      {j.location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <MapPin size={13} /> {j.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* View Details Action Button */}
                <NavLink 
                  to={`/userJobs/${j.id}`} 
                  className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs shrink-0"
                >
                  View Details <ArrowRight size={15} />
                </NavLink>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl shadow-xs p-8 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Frown size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No jobs found matching your criteria.</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">Try checking your spelling or adjusting your keywords and location filter to find more job openings.</p>
              <div className="pt-2">
                <NavLink 
                  to="/" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  <Home size={16} /> Return to Home
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 justify-center items-center">
            {links.map((link: any, index: number) => {
              const pageParam = link.url ? new URL(link.url).searchParams.get("page") : null;
              return (
                <NavLink
                  key={index}
                  to={link.url ? `/search-results?title=${encodeURIComponent(title || '')}&location=${encodeURIComponent(location || '')}&page=${pageParam}` : "#"}
                  className={`px-4 py-2.5 border rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1 ${
                    link.active 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30' 
                      : link.url 
                        ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: link.label }} />
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;