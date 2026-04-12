'use client';
import PanelOverlay from './PanelOverlay';

export default function ContactPanel({ isOpen, onClose }) {
  return (
    <PanelOverlay isOpen={isOpen} onClose={onClose} title="Contact">
      <div className="w-full min-h-full flex flex-col">

        {/* Main Contact Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 py-32">
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-end justify-between gap-16">
            
            <div className="flex-1 overflow-hidden">
               <h2 className="panel-reveal text-6xl lg:text-[10vw] font-black uppercase tracking-[-0.06em] leading-[0.80] mb-4 -ml-2">
                 LET'S<br/>BUILD<br/>IT.
               </h2>
            </div>

            <div className="flex flex-col items-start gap-8 flex-1 md:max-w-md lg:mb-8 overflow-hidden">
               <a href="mailto:hello@ammar.dev" className="panel-reveal text-2xl lg:text-4xl font-bold uppercase tracking-tight hover:text-red-600 transition-colors">
                 hello@ammar.dev
               </a>
               <div className="panel-reveal flex gap-6 text-sm font-mono tracking-widest uppercase text-gray-500">
                  <a href="#" className="hover:text-black transition-colors cursor-pointer">Github</a>
                  <a href="#" className="hover:text-black transition-colors cursor-pointer">LinkedIn</a>
                  <a href="#" className="hover:text-black transition-colors cursor-pointer">Twitter X</a>
               </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 lg:px-16 pb-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400 border-t border-black/5 pt-8">
             <p className="panel-reveal">© {new Date().getFullYear()} AMMAR</p>
             <div className="panel-reveal flex items-center gap-3">
                <span className="status-dot"></span>
                <span>Based in Logic, Operates Globally</span>
             </div>
             <p className="panel-reveal hidden md:block">ALL RIGHTS RESERVED</p>
          </div>
        </div>

      </div>
    </PanelOverlay>
  );
}
