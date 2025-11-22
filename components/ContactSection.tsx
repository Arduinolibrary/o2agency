import React from 'react';
import { Logo } from './Logo';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-12 animate-fade-in">
        <div className="transform scale-150 md:scale-[2.5]">
          <Logo className="w-48 h-32" />
        </div>
        
        <div className="text-center space-y-4">
            <h3 className="text-purple-400 tracking-widest text-sm md:text-base uppercase">Contact Us</h3>
            <a 
                href="mailto:info@o2agency.net" 
                className="block text-3xl md:text-5xl font-light text-white hover:text-purple-400 transition-colors duration-300 border-b border-transparent hover:border-purple-400 pb-2"
            >
                info@o2agency.net
            </a>
        </div>
      </div>

      <footer className="absolute bottom-8 text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} O₂ Agency. All rights reserved.
      </footer>
    </section>
  );
};

export default ContactSection;
