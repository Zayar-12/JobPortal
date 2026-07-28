import React, { useState, useEffect } from 'react';
import { Form, useLoaderData, NavLink } from 'react-router';
import type { Category, Job, Company } from '../types/types';
import { Search, MapPin, ArrowRight, Briefcase, FolderKanban, Building2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Import background images from assets
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.jpg';

const slides = [slide1, slide2, slide3, slide4];

const Home = () => {
  const { allCategories, jobsResponse, topCompanies } = useLoaderData() as any;
  const latestJobs = jobsResponse?.data || []; 
  const links = jobsResponse?.meta?.links || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* Hero / Search Section with Background Image Carousel */}
      <section className="relative text-white py-24 px-6 rounded-b-[40px] shadow-xl mb-16 overflow-hidden bg-gray-900">
        
        {/* Carousel Background Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 6s ease-out' }}
          >
            <img 
              src={slide} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/40 backdrop-blur-[0.5px]" />
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-md transition z-20 cursor-pointer hidden sm:block"
        >
          <ChevronLeft size={22} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-md transition z-20 cursor-pointer hidden sm:block"
        >
          <ChevronRight size={22} />
        </button>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="px-4 py-1.5 bg-blue-600/80 text-white text-xs font-semibold rounded-full border border-blue-400/40 uppercase tracking-widest backdrop-blur-md shadow-lg">
            Find Your Future Today
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Dream Career</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto font-light drop-shadow">
            Explore thousands of job listings or find top industry categories tailored for your professional growth.
          </p>

          {/* Search Box Form */}
          <Form action="/search-results" method="get" className="bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto border border-white/20 mt-8">
            <div className="flex-1 flex items-center px-4 py-2.5 bg-gray-50/90 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <Briefcase size={20} className="text-gray-400 mr-3 shrink-0" />
              <input 
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none" 
                type="text" 
                name="title" 
                placeholder="Job title, keyword, or company" 
              />
            </div>
            
            <div className="flex-1 flex items-center px-4 py-2.5 bg-gray-50/90 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <MapPin size={20} className="text-gray-400 mr-3 shrink-0" />
              <input 
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none" 
                type="text" 
                name="location" 
                placeholder="City, region, or remote" 
              />
            </div>

            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer" 
              type="submit"
            >
              <Search size={18} /> Search Jobs
            </button>
          </Form>

          {/* Carousel Indicators / Dots */}
          <div className="flex justify-center gap-2 pt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Top Hiring Companies Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider flex items-center gap-1.5 w-max">
                <Sparkles size={12} /> Industry Leaders
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Top Hiring Companies
              </h2>
              <p className="text-gray-500 text-sm mt-1">Explore organizations with high application activity and active opportunities.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {topCompanies && topCompanies.length > 0 ? (
              topCompanies.map((comp: any) => (
                <NavLink 
                  key={comp.id} 
                  to={`/admin/adminspecificCompany/${comp.id}`} 
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-16 h-16 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    {comp.logo ? (
                      <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <Building2 size={28} className="text-gray-400" />
                    )}
                  </div>

                  <div className="space-y-1 w-full min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition truncate">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{comp.location || "Remote / Global"}</p>
                  </div>

                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {comp.total_applications_count || 0} Applications
                  </span>
                </NavLink>
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                No top companies found yet.
              </div>
            )}
          </div>
        </section>

        {/* Categories Grid Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider">
                Industries
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Browse by Category
              </h2>
              <p className="text-gray-500 text-sm mt-1">Find opportunities categorized by your specialized field.</p>
            </div>
            <NavLink 
              to="/jobbycategory" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition"
            >
              View all categories 
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCategories && allCategories.length > 0 ? (
              allCategories.map((cat: Category) => (
                <NavLink 
                  key={cat.id} 
                  to={`/category/${cat.id}`}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-1.5 rounded-2xl border border-blue-100/60 shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                    {cat.icon ? (
                      <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain rounded-xl scale-110" />
                    ) : (
                      <FolderKanban size={30} className="text-blue-600" />
                    )}
                  </div>

                  <div className="space-y-1 w-full">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-400">Explore open roles</p>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                No categories found.
              </div>
            )}
          </div>
        </section>

        {/* Latest Opportunities Card Layout Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wider">
                Fresh Listings
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Latest Opportunities
              </h2>
              <p className="text-gray-500 text-sm mt-1">Apply to the newest openings posted by verified employers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestJobs && latestJobs.length > 0 ? (
              latestJobs.map((job: any) => (
                <div 
                  key={job.id} 
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 bg-gray-50 p-2.5 rounded-2xl border border-gray-100 shadow-md shrink-0 flex items-center justify-center">
                      {job.company?.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <Building2 size={30} className="text-gray-400" />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <NavLink 
                        to={`/userJobs/${job.id}`} 
                        className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors block truncate"
                      >
                        {job.title}
                      </NavLink>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Building2 size={13} className="text-gray-400" /> {job.company?.name || "Confidential Company"}
                      </p>
                    </div>
                  </div>

                  <NavLink 
                    to={`/userJobs/${job.id}`}
                    className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition shrink-0 shadow-xs"
                  >
                    Details →
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                No active job listings right now.
              </div>
            )}
          </div>
        </section>

        {/* Pagination Section */}
        {links && links.length > 0 && (
          <div className="flex gap-2 mt-12 justify-center items-center flex-wrap">
            {links.map((link: any, index: number) => (
              <NavLink 
                key={index} 
                to={link.url ? `/?page=${new URL(link.url).searchParams.get("page")}` : "#"} 
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition border ${
                  link.active 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </NavLink>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;