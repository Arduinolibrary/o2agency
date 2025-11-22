import React from 'react';

const ClientBox: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <div className={`bg-gray-100 flex items-center justify-center p-8 h-24 md:h-32 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:bg-white hover:scale-[1.02] ${className}`}>
    {/* 
      Using stylized text to represent logos as we don't have the exact SVG assets. 
      In a real scenario, <img> tags with SVGs would go here.
    */}
    <span className="text-2xl md:text-3xl font-bold text-black tracking-tighter">{name}</span>
  </div>
);

const ClientsSection: React.FC = () => {
  return (
    <section id="clients" className="py-24 bg-black text-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-64 bg-purple-900/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">OUR CLIENTS</h2>
            <p className="text-gray-400 text-lg font-light">Trusted By Brands Expanding Internationally</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ClientBox name="Midea" />
                <ClientBox name="Haier" />
                <ClientBox name="vivo" />
                <div className="bg-gray-100 flex items-center justify-center p-8 h-24 md:h-32 grayscale hover:grayscale-0 transition-all hover:bg-white">
                   <span className="text-2xl font-bold text-black flex items-center gap-1">
                     <span className="text-3xl">^</span> NIO
                   </span>
                </div>
                
                {/* Row 2 */}
                <div className="col-span-2 md:col-span-1 bg-gray-100 flex items-center justify-center p-8 h-24 md:h-32 grayscale hover:grayscale-0 transition-all hover:bg-white">
                    <div className="text-black text-center">
                        <div className="text-xs font-bold">ANT GROUP</div>
                        <div className="text-lg font-bold">蚂蚁集团</div>
                    </div>
                </div>
                
                <div className="bg-gray-100 flex items-center justify-center p-8 h-24 md:h-32 grayscale hover:grayscale-0 transition-all hover:bg-white">
                    <span className="text-xl font-bold text-black tracking-[0.2em]">AIWAYS</span>
                </div>

                <ClientBox name="GEELY" />
                <ClientBox name="TCL" />
                <ClientBox name="Hisense" />
                <ClientBox name="CHERY" />
            </div>
        </div>
    </section>
  );
};

export default ClientsSection;
