import React from 'react';

const About: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col items-start gap-12 z-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full -z-10" />
      
      <div className="space-y-8 text-lg md:text-2xl font-light leading-relaxed text-gray-200 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <p>
          <span className="font-bold text-white">O₂</span> is a global marketing agency that brings oxygen to brands —<br />
          fueling their influence, flow, and growth across markets.
        </p>
        <p>
          Like oxygen gives life, we energize brands with visibility and connection,<br />
          helping them stay dynamic, relevant, and full of momentum in a changing world.
        </p>
        <p className="text-white font-medium text-3xl md:text-4xl pt-4">
          O₂ Your Brand.<br />
          Let it breathe. Let it move. Let it grow.
        </p>
      </div>

      <div className="w-full flex justify-end mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-800">
          About Us
        </h2>
      </div>
    </section>
  );
};

export default About;