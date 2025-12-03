import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import ProjectsPage from './components/ProjectsPage';
import ProjectsGallery from './components/ProjectsGallery';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';
import Bookshelf from './components/Bookshelf';
import MapPage from './components/MapPage';
import CityManager from './components/CityManager';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery" element={<ProjectsGallery />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/city-manager" element={<CityManager />} />
      </Routes>
    </Router>
  );
}

export default App;