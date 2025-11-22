import React, { Suspense } from 'react';
import Hero3D from './components/Hero3D';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import { Logo } from './components/Logo';

const Loader = () => (
  <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white">
    <div className="animate-pulse">
      <Logo className="h-16 w-auto" />
    </div>
    <p className="mt-4 text-purple-400 text-sm tracking-widest">INITIALIZING...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-purple-500 selection:text-white">
      <Navigation />
      
      {/* Hero Section with 3D Canvas */}
      <section className="relative h-screen w-full overflow-hidden">
        <Suspense fallback={<Loader />}>
           <Hero3D />
        </Suspense>
        
        {/* Hero Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
           {/* The 3D canvas does the heavy lifting visually. We just add the title fading in. */}
           <div className="text-center space-y-4 animate-fade-in delay-1000 mix-blend-screen">
             <div className="w-32 h-32 mx-auto md:hidden mb-4">
                <Logo className="w-full h-full" />
             </div>
             <h1 className="hidden md:block text-6xl md:text-9xl font-bold tracking-tighter opacity-0 animate-[fadeIn_2s_ease-in_3.5s_forwards]">
               O₂ AGENCY
             </h1>
             <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-purple-300 opacity-0 animate-[fadeIn_2s_ease-in_4.5s_forwards]">
               BREATHE LIFE INTO YOUR BRAND
             </p>
           </div>
        </div>
        
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce z-20">
            <a href="#about" className="text-white/50 hover:text-white cursor-pointer pointer-events-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </a>
        </div>
      </section>

      <div className="relative z-20 bg-black">
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default App;
