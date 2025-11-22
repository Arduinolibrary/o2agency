import React from 'react';

const ServiceItem: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`p-8 md:p-12 border-white/10 flex flex-col justify-start h-full transition-colors hover:bg-white/5 ${className}`}>
    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 font-light leading-relaxed">
      {children}
    </p>
  </div>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative min-h-screen py-24 bg-black text-white flex flex-col justify-center">
        
      {/* Bottom purple glow as seen in PDF Page 3 */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-purple-900/20 blur-[120px] pointer-events-none rounded-t-full opacity-60" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Grid Layout imitating the cross dividers in the PDF */}
        <div className="grid md:grid-cols-2 border-t border-b border-white/10">
          <ServiceItem title="Influencer Marketing" className="border-b md:border-b-0 md:border-r border-white/10">
            We connect brands with creators who matter — building authentic conversations and measurable impact across YouTube, TikTok, Instagram, and beyond.
          </ServiceItem>
          
          <ServiceItem title="Creator Content Creativity">
            We co-create and produce tailor-made content with influencers to enhance storytelling and performance.
          </ServiceItem>
        </div>

        <div className="grid md:grid-cols-2 border-b border-white/10">
          <ServiceItem title="Social Media Marketing" className="border-b md:border-b-0 md:border-r border-white/10">
            We manage content, community, and paid campaigns across all major platforms — driving consistent engagement and social buzz to strengthen brand presence and growth.
          </ServiceItem>
          
          <ServiceItem title="Media Communication">
            We build visibility and influence for brands through PR strategy, press releases, media relations, and curated media events — strengthening reputation and trust across global markets.
          </ServiceItem>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">O₂ Your Brand.</h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            We bring oxygen to brands through influence, communication, and connection
          </p>
          
          <button className="mt-8 px-12 py-4 bg-gray-200 hover:bg-white text-black font-bold tracking-widest uppercase transition-all transform hover:scale-105 rounded-sm">
            Global Presence
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
