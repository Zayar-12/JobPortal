import React from 'react';
import { NavLink } from 'react-router';
import { Briefcase, Users, TrendingUp, ShieldCheck } from 'lucide-react';

// Import employer background image from assets
import employerBg from '../../assets/employer bg.webp';

const CompanyHome = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* Hero Section with Employer Background */}
      <section className="relative text-white py-28 px-6 rounded-b-[40px] shadow-xl mb-16 overflow-hidden bg-gray-900">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={employerBg} 
            alt="Employer Background" 
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="px-4 py-1.5 bg-blue-600/80 text-white text-xs font-semibold rounded-full border border-blue-400/40 uppercase tracking-widest backdrop-blur-md shadow-lg inline-block">
            Employer Portal
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Connect with top talent, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">effortlessly.</span>
          </h1>
          
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto font-light drop-shadow leading-relaxed">
            Join our growing network of industry-leading companies. Manage your job postings, 
            track incoming applications, and find the perfect candidate to drive your business forward.
          </p>

          {/* Call to Action */}
          <div className="pt-4 flex justify-center">
            <NavLink 
              to="/companies/companyregister" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm"
            >
              Get Started Today <Briefcase size={18} />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Features Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Seamless Hiring</h3>
            <p className="text-sm text-gray-500">Streamlined workflows for your team to hire faster and smarter.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Global Reach</h3>
            <p className="text-sm text-gray-500">Access top-tier professional talent from anywhere in the region.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Data Driven</h3>
            <p className="text-sm text-gray-500">Manage applications and candidates securely with high precision.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CompanyHome;