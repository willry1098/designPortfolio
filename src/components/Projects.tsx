import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllProjects } from '../data/projectsData';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(0);
  const projects = getAllProjects();

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects">
      <div className="max-w-6xl mx-auto px-6">
        {/* Project Showcase */}
        <div className="relative">
          <div className="bg-deep-indigo rounded-2xl overflow-hidden mb-6 min-h-[500px] flex items-center">
            <div className="grid lg:grid-cols-2 items-stretch w-full">
              <div className="order-2 lg:order-1 p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-signal-blue bg-signal-blue/10 px-3 py-1 rounded-full">
                    {projects[currentProject].category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-deep-indigo mb-3 text-soft-white">
                  {projects[currentProject].title}
                </h3>

                <p className="text-soft-white/80 mb-4 leading-relaxed">
                  {projects[currentProject].overview}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-soft-white mb-2">Role:</h4>
                  <p className="text-sm text-soft-white/70">{projects[currentProject].role}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-soft-white mb-2">Duration & Team:</h4>
                  <p className="text-sm text-soft-white/70">{projects[currentProject].duration} • {projects[currentProject].team}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentProject].tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-soft-white/10 text-soft-white px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/projects/${projects[currentProject].id}`)}
                    className="flex items-center gap-2 bg-signal-blue text-soft-white px-4 py-2 rounded-lg hover:bg-signal-blue/90 transition-colors"
                  >
                    View Full Project
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div
                className="order-1 lg:order-2 relative group cursor-pointer overflow-hidden"
                onClick={() => navigate(`/projects/${projects[currentProject].id}`)}
              >
                <img
                  src={projects[currentProject].heroImage}
                  alt={projects[currentProject].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={prevProject}
              className="p-2 text-deep-indigo hover:text-signal-blue transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <>
              <div className="flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentProject ? 'bg-signal-blue w-8' : 'bg-slate-gray/30'
                    }`}
                  />
                ))}
              </div>
            </>
            
            <button 
              onClick={nextProject}
              className="p-2 text-deep-indigo hover:text-signal-blue transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;