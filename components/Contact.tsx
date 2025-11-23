import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 bg-gradient-to-t from-brand-purple/20 to-black relative">
       
       <div className="flex flex-col items-center gap-8 mb-12">
           {/* Large O2 Logo */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 border-[6px] md:border-[8px] border-white rounded-full flex items-center justify-center">
                <div className="absolute top-6 right-6 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full" />
                <span className="absolute -bottom-2 -right-6 md:-bottom-4 md:-right-10 text-6xl md:text-8xl font-bold text-white">2</span>
            </div>
       </div>

      <div className="text-center space-y-2 z-10">
        <h3 className="text-brand-accent tracking-[0.2em] text-sm md:text-base font-light">CONTACT US</h3>
        <a 
          href="mailto:info@o2agency.net" 
          className="text-2xl md:text-4xl font-light text-white hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent pb-1"
        >
          info@o2agency.net
        </a>
      </div>

      <footer className="absolute bottom-4 text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} O₂ Agency. All rights reserved.
      </footer>
    </section>
  );
};

export default Contact;