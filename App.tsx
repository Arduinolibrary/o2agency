import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HeroParticles from './components/HeroParticles';
import About from './components/About';
import Services from './components/Services';
import Clients from './components/Clients';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [showHeroText, setShowHeroText] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-brand-purple selection:text-white">
      {/* 
        HERO SECTION: 3D Canvas 
        This acts as the first "screen"
      */}
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-[#10051D] to-black">
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <HeroParticles onSequenceEnd={() => setShowHeroText(true)} />
              {/* Allow subtle interaction */}
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay Text - Appears after atom forms */}
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${showHeroText ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-end mb-4">
             {/* Simple CSS shape for logo representation in text */}
             <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-white rounded-full relative mr-2">
                <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></div>
             </div>
             <span className="text-6xl md:text-8xl font-bold leading-none">2</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase mt-4 text-center">
            Agency
          </h1>
          <p className="mt-4 text-brand-accent/80 text-sm tracking-widest animate-pulse-slow">
            SCROLL TO EXPLORE
          </p>
        </div>

        {/* Scroll Indicator */}
         <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${showHeroText ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
         </div>
      </section>

      {/* Main Content Content */}
      <main className="relative z-20 bg-black">
        {/* Gradient Transition */}
        <div className="w-full h-24 bg-gradient-to-b from-transparent to-black -mt-24 relative z-20 pointer-events-none" />
        
        <About />
        <Services />
        <Clients />
        <Contact />
      </main>
    </div>
  );
};

export default App;