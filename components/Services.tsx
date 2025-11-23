import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Influencer Marketing",
    description: "We connect brands with creators who matter — building authentic conversations and measurable impact across YouTube, TikTok, Instagram, and beyond."
  },
  {
    title: "Creator Content Creativity",
    description: "We co-create and produce tailor-made content with influencers to enhance storytelling and performance."
  },
  {
    title: "Social Media Marketing",
    description: "We manage content, community, and paid campaigns across all major platforms — driving consistent engagement and social buzz to strengthen brand presence and growth."
  },
  {
    title: "Media Communication",
    description: "We build visibility and influence for brands through PR strategy, press releases, media relations, and curated media events — strengthening reputation and trust across global markets."
  }
];

const Services: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-black/40 backdrop-blur-sm">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">O₂ Your Brand.</h2>
          <p className="text-gray-400 text-lg">We bring oxygen to brands through influence, communication, and connection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative">
          {/* Central Divider lines (visual approximation) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          {services.map((service, index) => (
            <div key={index} className="flex flex-col gap-4 p-6 hover:bg-white/5 transition-colors duration-300 rounded-lg group">
              <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-8 py-3 bg-gray-200 text-black font-bold tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 rounded-sm">
            GLOBAL PRESENCE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;