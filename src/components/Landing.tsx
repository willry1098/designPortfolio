import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllProjects } from '../data/projectsData';

const Landing: React.FC = () => {
  const [showHoverEffect, setShowHoverEffect] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const projects = getAllProjects();

  useEffect(() => {
    // Check if user has visited before or is navigating from another page
    const visited = sessionStorage.getItem('hasVisitedLanding');
    const isNavigatingBack = location.state?.fromNavigation;

    if (visited || isNavigatingBack) {
      setHasVisitedBefore(true);
      setShowContent(true);
      setShowHoverEffect(true);
      return;
    }

    // Mark as visited for this session
    sessionStorage.setItem('hasVisitedLanding', 'true');

    const hoverTimer = setTimeout(() => {
      setShowHoverEffect(true);
    }, 2400);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3400);

    return () => {
      clearTimeout(hoverTimer);
      clearTimeout(contentTimer);
    };
  }, [location]);

  if (!showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-white to-slate-gray/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-signal-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-tech-teal rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-warm-sand rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="text-center relative z-10">
          <div
            className={`relative transition-all duration-500 transform ${
              showHoverEffect ? 'scale-110' : 'scale-100'
            } mx-auto`}
          >
            <div className="relative w-64 h-64 mx-auto">
              <img
                src={`${import.meta.env.BASE_URL}personalLogoV2.svg`}
                alt="William Ryan Logo"
                className="w-full h-full transition-all duration-500"
              />

              <div className={`absolute inset-0 bg-signal-blue transition-all duration-1000 ${
                showHoverEffect ? 'scale-125 opacity-20' : 'scale-100 opacity-0'
              }`} style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}></div>
            </div>
          </div>

          <div className="animate-fade-in mt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-deep-indigo mb-6 tracking-tight text-center">
              William Ryan
            </h1>
            <p className="text-lg md:text-xl text-slate-gray max-w-2xl mx-auto leading-relaxed tracking-wide text-center">
              Storyteller • Designer • Hobbyist
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-gray/5 animate-fade-in">
      <nav className="bg-soft-white py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-end items-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/about')}
              className="text-slate-gray hover:text-deep-indigo transition-colors font-medium"
            >
              about
            </button>
            <button
              onClick={() => navigate('/bookshelf')}
              className="text-slate-gray hover:text-deep-indigo transition-colors font-medium"
            >
              the bookshelf
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <div className="mb-8 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}personalLogoV2grey.svg`}
              alt="William Ryan Logo"
              className="w-40 h-40"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-deep-indigo mb-6 tracking-tight">
            William Ryan
          </h1>
          <p className="text-xl md:text-2xl text-slate-gray max-w-3xl mx-auto leading-relaxed mb-6">
            Storyteller • Designer • Hobbyist
          </p>
          <p className="text-base md:text-lg text-slate-gray/80 max-w-2xl mx-auto leading-relaxed italic">
            "I love to tell stories, I embellish them, and I believe Truth is essential to the great ones."
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group cursor-pointer bg-soft-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className={`grid lg:grid-cols-2 gap-0 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={`p-10 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-signal-blue bg-signal-blue/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-deep-indigo mb-3 group-hover:text-signal-blue transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-slate-gray mb-6 leading-relaxed text-lg">
                    {project.overview}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-deep-indigo mb-2">Role:</h4>
                    <p className="text-sm text-slate-gray">{project.role}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-deep-indigo mb-2">Duration & Team:</h4>
                    <p className="text-sm text-slate-gray">{project.duration} • {project.team}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-slate-gray/10 text-deep-indigo px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`relative overflow-hidden h-full min-h-[500px] ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
