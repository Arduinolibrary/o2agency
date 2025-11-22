import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-24 bg-black overflow-hidden">
      {/* Background ambient gradient matching PDF style */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-purple-900/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 opacity-90">
              About Us
            </h2>
            <div className="w-24 h-1 bg-purple-500"></div>
          </div>

          <div className="text-lg md:text-xl leading-relaxed text-gray-300 space-y-6 font-light">
            <p>
              <span className="text-white font-bold">O₂ is a global marketing agency</span> that brings oxygen to brands — fueling their influence, flow, and growth across markets.
            </p>
            <p>
              Like oxygen gives life, we energize brands with visibility and connection, helping them stay dynamic, relevant, and full of momentum in a changing world.
            </p>
            <div className="pt-6">
              <h3 className="text-3xl font-semibold text-white mb-2">O₂ Your Brand.</h3>
              <p className="text-purple-400 text-xl tracking-wide">Let it breathe. Let it move. Let it grow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
