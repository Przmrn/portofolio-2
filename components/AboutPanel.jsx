'use client';
import PanelOverlay from './PanelOverlay';

export default function AboutPanel({ isOpen, onClose }) {
  return (
    <PanelOverlay isOpen={isOpen} onClose={onClose} title="About Ammar">
      <div className="w-full min-h-full">

        {/* Manifesto Hero */}
        <div className="w-full bg-black text-white min-h-[80vh] flex flex-col items-center justify-center py-32 px-6 lg:px-16">
          <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-32">
            <div className="flex-1">
               <h2 className="panel-reveal text-6xl lg:text-[10vw] font-black uppercase tracking-[-0.06em] leading-[0.80] -ml-2">
                 BORN<br/>FROM<br/><span className="text-red-600">NOISE.</span>
               </h2>
            </div>
            <div className="flex-1 md:max-w-lg md:mt-[10vw]">
               <p className="panel-reveal text-xl lg:text-3xl font-medium tracking-tight leading-snug mb-8">
                 I write clean code and build robust backend architecture because scaling systems require quiet precision, not loud ego.
               </p>
               <p className="panel-reveal font-mono text-sm tracking-widest text-gray-400 leading-relaxed">
                 From computer vision models in smart traffic systems to high-concurrency ledger APIs, every component is engineered to perform invisibly. The less you notice the tools, the better they work.
               </p>
            </div>
          </div>
        </div>

        {/* About Detail Section */}
        <div className="w-full bg-white text-black pt-32 pb-40 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Core Description */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <h3 className="panel-reveal text-4xl font-black uppercase tracking-[-0.05em] leading-[0.85] -ml-1">Logic Over Ego</h3>
              <p className="panel-reveal text-gray-600 font-medium leading-relaxed">
                I am a software engineer focused on building durable backends, computer vision pipelines, and seamless frontends. I believe in architectural integrity, zero-bloat dependencies, and designing for scale from day zero.
              </p>
              <div className="panel-reveal mt-4">
                 <a href="#" className="font-mono text-sm uppercase tracking-widest text-black border-b border-black hover:text-red-600 hover:border-red-600 transition-colors pb-1">Read Full Journal</a>
              </div>
            </div>

            {/* Technical Stack */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="panel-reveal">
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Core Stack</h4>
                <ul className="text-xl font-bold uppercase tracking-tight flex flex-col gap-2">
                   <li>TypeScript / Node.js</li>
                   <li>Golang</li>
                   <li>Python / PyTorch</li>
                   <li>Next.js / React</li>
                   <li>PostgreSQL & Redis</li>
                </ul>
              </div>
              
              <div className="panel-reveal">
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Disciplines</h4>
                <ul className="text-xl font-medium tracking-tight text-gray-600 flex flex-col gap-2">
                   <li>API Design</li>
                   <li>Computer Vision</li>
                   <li>Cloud Architecture</li>
                   <li>Smart Systems</li>
                   <li>UX/UI Execution</li>
                </ul>
              </div>
            </div>

            {/* Philosophy Accent */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="panel-reveal bg-gray-100 p-10 flex flex-col items-center justify-center aspect-square text-center">
                 <span className="text-6xl text-red-600 mb-4 transition-transform hover:scale-110 duration-500 cursor-pointer">∞</span>
                 <h4 className="text-2xl font-black tracking-tight uppercase">Continuous Calibration</h4>
              </div>
            </div>

          </div>
        </div>

      </div>
    </PanelOverlay>
  );
}
