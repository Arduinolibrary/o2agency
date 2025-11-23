import React from 'react';
import { ClientLogo } from '../types';

// Mocking logos with stylish text/boxes since we don't have SVGs
const clients: ClientLogo[] = [
  { name: "Midea", className: "font-serif text-4xl italic" },
  { name: "Haier", className: "font-sans text-4xl font-bold" },
  { name: "vivo", className: "font-sans text-4xl tracking-tight" },
  { name: "NIO", className: "font-sans text-4xl font-black" },
  { name: "ANT GROUP", className: "font-sans text-xl font-bold text-blue-400" },
  { name: "AIWAYS", className: "font-mono text-2xl tracking-[0.2em]" },
  { name: "GEELY", className: "font-sans text-3xl font-bold uppercase" },
  { name: "TCL", className: "font-sans text-5xl font-bold text-red-500/80" },
  { name: "Hisense", className: "font-sans text-3xl font-bold tracking-wide" },
  { name: "CHERY", className: "font-serif text-3xl uppercase tracking-widest" },
];

const Clients: React.FC = () => {
  return (
    <section className="w-full py-24 bg-black relative overflow-hidden">
        {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-900/30 blur-[60px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">OUR CLIENTS</h2>
          <p className="text-gray-400 font-light">Trusted By Brands Expanding Internationally</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="h-24 bg-white flex items-center justify-center rounded-sm hover:scale-105 transition-transform duration-300 cursor-default"
            >
              <span className={`text-black ${client.className || 'text-xl font-bold'}`}>
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;