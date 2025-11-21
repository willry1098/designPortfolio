import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users as UsersIcon, Target, User, FileText, Lightbulb, Wrench, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectById } from '../data/projectsData';
import type { ProjectSection } from '../data/projectsData';

interface TimelineItem {
  id: string;
  label: string;
  IconComponent: React.ElementType;
}

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const project = id ? getProjectById(id) : undefined;

  const timelineItems: TimelineItem[] = [
    ...(project?.overview ? [{ id: 'overview', label: 'Overview', IconComponent: FileText }] : []),
    ...(project?.outcome ? [{ id: 'outcome', label: 'Outcome', IconComponent: Target }] : []),
    ...(project?.hcdPhases.theory ? [{ id: 'theory', label: 'Theory', IconComponent: FileText }] : []),
    ...(project?.hcdPhases['cooking-in-quarantine'] ? [{ id: 'cooking-in-quarantine', label: 'Cooking in Quarantine', IconComponent: FileText }] : []),
    ...(project?.hcdPhases['from-moms-kitchen'] ? [{ id: 'from-moms-kitchen', label: "From Mom's Kitchen", IconComponent: FileText }] : []),
    ...(project?.hcdPhases['meet-the-players'] ? [{ id: 'meet-the-players', label: 'Meet the Players', IconComponent: User }] : []),
    ...(project?.hcdPhases['explore-the-world'] ? [{ id: 'explore-the-world', label: 'Explore the World', IconComponent: FileText }] : []),
    ...(project?.hcdPhases.user ? [{ id: 'user', label: 'User', IconComponent: User }] : []),
    ...(project?.hcdPhases.define ? [{ id: 'define', label: 'Define', IconComponent: Target }] : []),
    ...(project?.hcdPhases.ideate ? [{ id: 'ideate', label: 'Ideate', IconComponent: Lightbulb }] : []),
    ...(project?.hcdPhases.prototype ? [{ id: 'prototype', label: 'Prototype', IconComponent: Wrench }] : []),
    ...(project?.hcdPhases.test ? [{ id: 'test', label: 'Test', IconComponent: CheckCircle }] : []),
    ...(project?.sections && project.sections.length > 0 ? [{ id: 'detailed-journey', label: 'Understanding The Journey', IconComponent: FileText }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of timelineItems) {
        const element = sectionRefs.current[item.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-indigo mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-signal-blue hover:underline">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const renderSection = (section: ProjectSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="max-w-3xl mx-auto px-6 py-12">
            {section.title && (
              <h2 className="text-3xl font-bold text-deep-indigo mb-4">{section.title}</h2>
            )}
            {section.subtitle && (
              <h3 className="text-xl text-slate-gray mb-4">{section.subtitle}</h3>
            )}
            <p className="text-lg text-slate-gray leading-relaxed">{section.content}</p>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="w-full py-12">
            <div className="max-w-5xl mx-auto px-6">
              <img
                src={section.image}
                alt={section.imageAlt || 'Project image'}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        );

      case 'split':
        return (
          <div key={index} className="max-w-6xl mx-auto px-6 py-12">
            <div className={`grid lg:grid-cols-2 gap-8 items-center ${
              section.imagePosition === 'left' ? 'lg:grid-flow-dense' : ''
            }`}>
              <div className={section.imagePosition === 'left' ? 'lg:col-start-2' : ''}>
                {section.title && (
                  <h2 className="text-3xl font-bold text-deep-indigo mb-4">{section.title}</h2>
                )}
                {section.subtitle && (
                  <h3 className="text-xl text-slate-gray mb-4">{section.subtitle}</h3>
                )}
                <p className="text-lg text-slate-gray leading-relaxed">{section.content}</p>
              </div>
              <div className={section.imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <img
                  src={section.image}
                  alt={section.imageAlt || 'Project image'}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div key={index} className="max-w-4xl mx-auto px-6 py-12">
            <div className="bg-signal-blue/5 border-l-4 border-signal-blue rounded-r-lg p-8">
              <blockquote className="text-2xl font-medium text-deep-indigo mb-4 italic">
                "{section.quote}"
              </blockquote>
              {section.author && (
                <cite className="text-slate-gray not-italic">— {section.author}</cite>
              )}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div key={index} className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-6">
              {section.stats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-gray/5 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-signal-blue mb-2">{stat.value}</div>
                  <div className="text-slate-gray">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'video':
        return (
          <div key={index} className="w-full py-12">
            <div className="max-w-5xl mx-auto px-6">
              <video
                className="w-full rounded-lg shadow-lg"
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) {
                    const observer = new IntersectionObserver(
                      (entries) => {
                        entries.forEach((entry) => {
                          if (entry.isIntersecting) {
                            el.play();
                          } else {
                            el.pause();
                          }
                        });
                      },
                      { threshold: 0.5 }
                    );
                    observer.observe(el);
                  }
                }}
              >
                <source src={section.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div key={index} className="w-full py-12">
            <div className="max-w-5xl mx-auto px-6">
              <div className="bg-slate-gray/5 rounded-lg p-4 shadow-lg">
                <iframe
                  src={`${section.pdf}#view=FitH`}
                  className="w-full h-[800px] rounded"
                  title={section.pdfAlt || 'PDF viewer'}
                />
              </div>
            </div>
          </div>
        );

      case 'pdfSplit':
        return (
          <div key={index} className="w-full py-16 bg-slate-gray/5">
            <div className="max-w-6xl mx-auto px-6">
              <div className={`grid md:grid-cols-2 gap-8 items-start ${section.pdfPosition === 'left' ? 'md:grid-flow-dense' : ''}`}>
                <div className={`${section.pdfPosition === 'left' ? 'md:col-start-2' : ''}`}>
                  {section.title && (
                    <h3 className="text-3xl font-semibold text-deep-indigo mb-6">
                      {section.title}
                    </h3>
                  )}
                  <p className="text-slate-gray leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
                <div className={`${section.pdfPosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
                    <iframe
                      src={`${section.pdf}#view=FitH`}
                      className="w-full h-[700px]"
                      title={section.pdfAlt || 'PDF viewer'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'carousel':
        return <ImageCarousel key={index} images={section.images || []} />;

      case 'playerTabs':
        return <PlayerTabs key={index} players={section.players || []} />;

      case 'imageWithDisclaimer':
        return (
          <div key={index} className="w-full py-12">
            <div className="max-w-5xl mx-auto px-6">
              <div className="mb-6 relative group cursor-pointer">
                <Link to="/map">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full rounded-lg shadow-lg transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-deep-indigo/0 group-hover:bg-deep-indigo/20 transition-colors rounded-lg flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-signal-blue text-soft-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg">
                      Explore Interactive Map
                    </span>
                  </div>
                </Link>
              </div>
              <p className="text-xs text-slate-gray/70 text-center leading-relaxed max-w-3xl mx-auto">
                {section.disclaimer}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderHCDPhase = (phaseName: string, sections: ProjectSection[] | undefined) => {
    if (!sections || sections.length === 0) return null;

    const phaseConfig: Record<string, { bg: string; text: string; IconComponent: React.ElementType; displayName?: string }> = {
      theory: { bg: '', text: 'text-deep-indigo', IconComponent: FileText, displayName: 'Theory' },
      'cooking-in-quarantine': { bg: '', text: 'text-deep-indigo', IconComponent: FileText, displayName: 'Cooking in Quarantine' },
      'from-moms-kitchen': { bg: '', text: 'text-deep-indigo', IconComponent: FileText, displayName: "From Mom's Kitchen: Desserts" },
      'meet-the-players': { bg: '', text: 'text-deep-indigo', IconComponent: User, displayName: 'Meet the Players' },
      'explore-the-world': { bg: '', text: 'text-deep-indigo', IconComponent: FileText, displayName: 'Explore the World' },
      user: { bg: 'bg-tech-teal/10', text: 'text-tech-teal', IconComponent: User, displayName: 'User' },
      define: { bg: 'bg-signal-blue/10', text: 'text-signal-blue', IconComponent: Target, displayName: 'Define' },
      ideate: { bg: 'bg-warm-sand/20', text: 'text-warm-sand', IconComponent: Lightbulb, displayName: 'Ideate' },
      prototype: { bg: 'bg-deep-indigo/10', text: 'text-deep-indigo', IconComponent: Wrench, displayName: 'Prototype' },
      test: { bg: 'bg-slate-gray/10', text: 'text-slate-gray', IconComponent: CheckCircle, displayName: 'Test' },
    };

    const phase = phaseConfig[phaseName] || phaseConfig.define;
    const isCustomPhase = ['theory', 'cooking-in-quarantine', 'from-moms-kitchen', 'meet-the-players', 'explore-the-world'].includes(phaseName);

    return (
      <div
        ref={(el) => (sectionRefs.current[phaseName] = el)}
        className={isCustomPhase ? '' : 'max-w-6xl mx-auto px-6 py-12'}
      >
        {!isCustomPhase && (
          <div className={`${phase.bg} rounded-lg p-8 mb-8`}>
            <div className="flex items-center gap-3 mb-6">
              <phase.IconComponent className={phase.text} size={32} strokeWidth={1.5} />
              <h2 className={`text-3xl font-bold ${phase.text}`}>{phase.displayName}</h2>
            </div>
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx}>
                  {renderSection(section, idx)}
                </div>
              ))}
            </div>
          </div>
        )}
        {isCustomPhase && (
          <>
            {['meet-the-players', 'explore-the-world'].includes(phaseName) && (
              <div className="bg-slate-gray/5 py-16">
                <div className="max-w-3xl mx-auto px-6 text-center">
                  <h1 className="text-3xl font-bold text-deep-indigo mb-4">{phase.displayName}</h1>
                </div>
              </div>
            )}
            <div className={phaseName === 'explore-the-world' ? 'bg-soft-white' : 'space-y-0'}>
              {sections.map((section, idx) => (
                <div key={idx}>
                  {renderSection(section, idx)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <div
        className="fixed top-0 left-0 h-1 bg-signal-blue z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="bg-soft-white border-b border-slate-gray/10 py-4 sticky top-0 z-40 backdrop-blur-sm bg-soft-white/90">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2 text-slate-gray hover:text-deep-indigo transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">All Projects</span>
          </button>

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
        </div>
      </div>

      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/80 via-deep-indigo/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-soft-white max-w-4xl px-6">
            <div className="mb-4">
              <span className="text-sm font-medium bg-signal-blue px-4 py-2 rounded-full">
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl font-light">{project.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-gray/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="text-signal-blue" size={20} />
              <h3 className="font-semibold text-deep-indigo">Role</h3>
            </div>
            <p className="text-slate-gray">{project.role}</p>
          </div>
          <div className="bg-slate-gray/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-signal-blue" size={20} />
              <h3 className="font-semibold text-deep-indigo">Duration</h3>
            </div>
            <p className="text-slate-gray">{project.duration}</p>
          </div>
          <div className="bg-slate-gray/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <UsersIcon className="text-signal-blue" size={20} />
              <h3 className="font-semibold text-deep-indigo">Team</h3>
            </div>
            <p className="text-slate-gray">{project.team}</p>
          </div>
        </div>

        {project.overview && (
          <div ref={(el) => (sectionRefs.current.overview = el)} className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-deep-indigo mb-4">Overview</h2>
            <p className="text-lg text-slate-gray leading-relaxed mb-6">{project.overview}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-signal-blue/10 text-signal-blue px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project as any).headerQuote && (
              <div className="mt-8 pt-6 border-t border-slate-gray/20">
                <p className="text-lg text-slate-gray italic leading-relaxed">
                  {(project as any).headerQuote}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {project.outcome && (
        <div ref={(el) => (sectionRefs.current.outcome = el)} className="bg-signal-blue/5 py-16 mb-12">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-deep-indigo mb-4">Outcome</h2>
            <p className="text-xl text-slate-gray leading-relaxed">{project.outcome}</p>
          </div>
        </div>
      )}

      {project.hcdPhases.theory && renderHCDPhase('theory', project.hcdPhases.theory)}
      {project.hcdPhases['cooking-in-quarantine'] && renderHCDPhase('cooking-in-quarantine', project.hcdPhases['cooking-in-quarantine'])}
      {project.hcdPhases['from-moms-kitchen'] && renderHCDPhase('from-moms-kitchen', project.hcdPhases['from-moms-kitchen'])}
      {project.hcdPhases['meet-the-players'] && renderHCDPhase('meet-the-players', project.hcdPhases['meet-the-players'])}
      {project.hcdPhases['explore-the-world'] && renderHCDPhase('explore-the-world', project.hcdPhases['explore-the-world'])}
      {project.hcdPhases.user && renderHCDPhase('user', project.hcdPhases.user)}
      {project.hcdPhases.define && renderHCDPhase('define', project.hcdPhases.define)}
      {project.hcdPhases.ideate && renderHCDPhase('ideate', project.hcdPhases.ideate)}
      {project.hcdPhases.prototype && renderHCDPhase('prototype', project.hcdPhases.prototype)}
      {project.hcdPhases.test && renderHCDPhase('test', project.hcdPhases.test)}

      {project.sections && project.sections.length > 0 && (
        <>
          <div
            ref={(el) => (sectionRefs.current['detailed-journey'] = el)}
            className="bg-slate-gray/5 py-16"
          >
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h1 className="text-3xl font-bold text-deep-indigo mb-4">
                {id === 'teaching-testimonials' ? 'In Their Own Words' : 'The Story Behind the Project'}
              </h1>
            </div>
          </div>

          {project.sections.map((section, index) => renderSection(section, index))}
        </>
      )}

      <div className="bg-deep-indigo text-soft-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Interested in continuing the story?</h3>
              <p className="text-slate-gray">Let's write another chapter together.</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="border border-soft-white text-soft-white px-6 py-3 rounded-lg hover:bg-soft-white hover:text-deep-indigo transition-colors"
              >
                View Other Projects
              </Link>
              <Link
                to="/about"
                className="bg-signal-blue text-soft-white px-6 py-3 rounded-lg hover:bg-signal-blue/90 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCarousel: React.FC<{ images: Array<{ src: string; alt: string }> }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full py-12 bg-slate-gray/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-deep-indigo p-3 rounded-full shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-deep-indigo p-3 rounded-full shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-signal-blue w-8' : 'bg-slate-gray/30'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PlayerTabs: React.FC<{ players: Array<{ name: string; image: string; description: string }> }> = ({ players }) => {
  const [activePlayer, setActivePlayer] = useState(0);

  if (!players || players.length === 0) return null;

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {players.map((player, idx) => (
            <button
              key={idx}
              onClick={() => setActivePlayer(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                idx === activePlayer
                  ? 'bg-signal-blue text-soft-white'
                  : 'bg-slate-gray/10 text-slate-gray hover:bg-slate-gray/20'
              }`}
            >
              {player.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-gray/5 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img
                src={players[activePlayer].image}
                alt={players[activePlayer].name}
                className="w-full aspect-[1/2] object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-deep-indigo mb-4">
                {players[activePlayer].name}
              </h3>
              <p className="text-slate-gray leading-relaxed">
                {players[activePlayer].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
