import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Linkedin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const handleResumeDownload = () => {
    // This would trigger the download of your PDF resume
    // You'll need to add your resume PDF to the public folder
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}resume.pdf`; // You'll need to add this file
    link.download = 'William_Ryan_Resume.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Navigation Header */}
      <div className="bg-soft-white border-b border-slate-gray/10 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={`${import.meta.env.BASE_URL}personalLogoV2grey.svg`}
              alt="William Ryan Logo"
              className="w-8 h-100"
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Profile Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <img
                src={`${import.meta.env.BASE_URL}headshot_small.jpg`}
                alt="William Ryan"
                className="w-full h-100 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-signal-blue/10 to-tech-teal/10 rounded-lg"></div>
            </div>
          </div>
          
          {/* Basic Info */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-deep-indigo mb-4">William Ryan</h2>
            
            <div className="space-y-3 text-slate-gray mb-6">
              <div>
                <h3 className="font-semibold text-deep-indigo mb-2">Current Role</h3>
                <p>Design Engineering Masters Student <br></br> (Northwestern University)</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-deep-indigo mb-2">Background</h3>
                <p>Computer Engineering (B.S.), <br></br> Computer Science Education (Grades 9-12)</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-deep-indigo mb-2">Location</h3>
                <p>Chicago, IL</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-deep-indigo mb-2">Interests</h3>
                <p>Human-Computer Interaction, Design Systems, Storytelling</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <a href="mailto:williamryan2027@u.northwestern.edu" className="p-3 bg-slate-gray/10 rounded-lg text-slate-gray hover:text-signal-blue hover:bg-signal-blue/10 transition-all duration-300">
                <Mail size={20} />
              </a>
              <a href="https://www.linkedin.com/in/william-ryan-589859133/" className="p-3 bg-slate-gray/10 rounded-lg text-slate-gray hover:text-signal-blue hover:bg-signal-blue/10 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://medium.com/@williamryan2027" className="p-3 bg-slate-gray/10 rounded-lg text-slate-gray hover:text-signal-blue hover:bg-signal-blue/10 transition-all duration-300">
                <img
                  src={`${import.meta.env.BASE_URL}medium.png`}
                  alt="Medium"
                  className="w-5 h-5"
                />
              </a>
            </div>

            {/* Resume Download */}
            <button
              onClick={handleResumeDownload}
              className="flex items-center gap-2 bg-signal-blue text-soft-white px-6 py-3 rounded-lg hover:bg-signal-blue/90 transition-colors font-medium"
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        {/* POV Statement */}
        <div className="bg-slate-gray/5 rounded-lg p-6 mb-8">
          
          
          <div className="prose max-w-none text-slate-gray leading-relaxed">
            <p className="mb-4">
              <h2 className="text-xl font-bold text-deep-indigo mb-4">Every Project a Classroom</h2>
Before pursuing my Master’s in Engineering Design and Innovation at Northwestern, I worked as a landscaper, marine ecology researcher, line cook / caterer, wine professional, wrestling and rowing coach, and teacher. With a Bachelors of Computer Engineering and a Minor in Music Theory and Composition from Columbia University and a growing lifetime of lessons learned in the workshop, on the trail, and between the bookends, I believe that there is always a new lesson to learn, an adventure to experience, and a story to tell.


              <br></br>
              <br></br>
<h2 className="text-xl font-bold text-deep-indigo mb-4">More Than 1's and 0's</h2>
While teaching high school computer science and mentoring student projects, I reaffirmed my love for computers while seeking engaging ways to share this passion with the next generation. In the classroom, I bridged the gap between introductory programming and mechatronics. Outside the classroom, pursuing my love for computer systems meant tailoring a personal LLM project to serve as a literary educator and critical reading companion, essentially a "book group in pocket." I believe that Design has the ability to improve the convenience of our narratives, enabling us to focus on the most important part of storytelling: humanity.

              <br></br>
              <br></br>

              <h2 className="text-xl font-bold text-deep-indigo mb-4">Beyond Remembering</h2>
Today, I am continuing to widen my skillset as a designer to realize a long-standing dream of creating immersive reality experiences which give students, enthusiasts, and story-lovers of all kinds the chance to step forward into the past. Whether by offering a virtual tour of the Acropolis through the ages, or a first-person perspective of the Battle of Thermopylae, I want to see the past faithfully reproduced for learners and dreamers alike, turning history into something we don't just study, but something we can live.
            </p>

          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="bg-deep-indigo text-soft-white px-6 py-3 rounded-lg hover:bg-deep-indigo/90 transition-colors"
            >
              View My Projects
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

export default AboutPage;