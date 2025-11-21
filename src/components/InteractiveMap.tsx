import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  bannerImage: string;
  description: string;
  ruler: string;
  ideology: string;
  dateFirstVisited: string;
}

interface InteractiveMapProps {
  mapImage: string;
  cities: City[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ mapImage, cities }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;
  const ZOOM_STEP = 0.2;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scaleRatio = newScale / scale;
      const newX = mouseX - (mouseX - position.x) * scaleRatio;
      const newY = mouseY - (mouseY - position.y) * scaleRatio;

      setPosition({ x: newX, y: newY });
    }

    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.city-marker')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(MAX_SCALE, prev + ZOOM_STEP));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(MIN_SCALE, prev - ZOOM_STEP));
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleCityClick = (city: City, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCity(city);
  };

  const closePopup = () => {
    setSelectedCity(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCity) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCity]);

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={mapRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <div className="relative">
            <img
              src={mapImage}
              alt="Interactive Map"
              className="max-w-none select-none"
              draggable={false}
            />

            {cities.map((city) => (
              <button
                key={city.id}
                className="city-marker absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${city.x}%`,
                  top: `${city.y}%`,
                }}
                onClick={(e) => handleCityClick(city, e)}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
                aria-label={`View details for ${city.name}`}
              >
                <div className="relative">
                  <div className={`
                    w-4 h-4 rounded-full border-2 border-white shadow-lg
                    transition-all duration-200
                    ${hoveredCity === city.id ? 'bg-signal-blue scale-150' : 'bg-deep-indigo'}
                  `} />
                  <div className="absolute inset-0 rounded-full animate-ping bg-signal-blue opacity-75"
                       style={{ animationDuration: '2s' }} />

                  {hoveredCity === city.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
                      <div className="bg-deep-indigo text-soft-white px-3 py-1 rounded text-sm font-medium shadow-lg">
                        {city.name}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          className="bg-soft-white text-deep-indigo p-3 rounded-lg shadow-lg hover:bg-slate-gray/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn size={24} />
        </button>
        <button
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          className="bg-soft-white text-deep-indigo p-3 rounded-lg shadow-lg hover:bg-slate-gray/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut size={24} />
        </button>
        <button
          onClick={resetView}
          className="bg-soft-white text-deep-indigo p-3 rounded-lg shadow-lg hover:bg-slate-gray/10 transition-colors"
          aria-label="Reset view"
        >
          <Maximize2 size={24} />
        </button>
      </div>

      <div className="absolute bottom-6 left-6 bg-soft-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-10">
        <p className="text-sm text-deep-indigo font-medium">
          Zoom: {Math.round(scale * 100)}%
        </p>
      </div>

      {selectedCity && (
        <div
          className="fixed inset-0 bg-deep-indigo/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-labelledby="city-popup-title"
        >
          <div
            className="bg-soft-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedCity.bannerImage}
                alt={selectedCity.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 bg-deep-indigo/80 text-soft-white p-2 rounded-full hover:bg-deep-indigo transition-colors"
                aria-label="Close popup"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <h2 id="city-popup-title" className="text-4xl font-bold text-deep-indigo mb-6">
                {selectedCity.name}
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-lg text-slate-gray leading-relaxed whitespace-pre-line">
                    {selectedCity.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-gray/20">
                  <div>
                    <h3 className="text-sm font-semibold text-deep-indigo uppercase tracking-wide mb-1">
                      Ruler
                    </h3>
                    <p className="text-lg text-slate-gray">{selectedCity.ruler}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-deep-indigo uppercase tracking-wide mb-1">
                      Ideology
                    </h3>
                    <p className="text-lg text-slate-gray">{selectedCity.ideology}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-gray/20">
                  <h3 className="text-sm font-semibold text-deep-indigo uppercase tracking-wide mb-1">
                    Date First Visited
                  </h3>
                  <p className="text-lg text-slate-gray">{selectedCity.dateFirstVisited}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
