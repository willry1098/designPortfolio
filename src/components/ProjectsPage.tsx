import React from 'react';
import { Link } from 'react-router-dom';
import Projects from './Projects';

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Navigation Header */}
      <div className="bg-soft-white border-b border-slate-gray/10 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={`${import.meta.env.BASE_URL}personalLogoV2grey.svg`}
              alt="William Ryan Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-deep-indigo hover:text-signal-blue transition-colors">
              william ryan
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              work
            </Link>
            <Link
              to="/about"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              about
            </Link>
            <Link
              to="/bookshelf"
              className="text-slate-gray hover:text-deep-indigo font-medium"
            >
              the bookshelf
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-deep-indigo text-soft-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Projects</h1>
            <p className="text-lg text-slate-gray max-w-3xl mx-auto leading-relaxed">
              A selection of projects that demonstrate the intersection of engineering expertise
              and design thinking, creating solutions that are both technically sound and user-focused.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Content */}
      <div className="py-12">
        <Projects />
      </div>

      {/* Navigation Links */}
      <div className="bg-slate-gray/5 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/about"
              className="bg-signal-blue text-soft-white px-6 py-3 rounded-lg hover:bg-signal-blue/90 transition-colors"
            >
              Learn About Me
            </Link>
            <Link
              to="/bookshelf"
              className="border border-slate-gray/30 text-deep-indigo px-6 py-3 rounded-lg hover:bg-slate-gray/5 transition-colors"
            >
              Visit The Bookshelf
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;