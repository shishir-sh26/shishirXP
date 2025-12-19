import { useState, useEffect } from 'react';
import { Window } from './components/Window';
import { AnimatePresence } from 'framer-motion';

type AppId = 'about' | 'projects';

export default function App() {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppId | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Clock Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleApp = (id: AppId) => {
    if (!openApps.includes(id)) setOpenApps([...openApps, id]);
    setFocusedApp(id);
    setStartMenuOpen(false); // Close start menu when app opens
  };

  const closeApp = (id: AppId) => {
    setOpenApps(openApps.filter(app => app !== id));
    if (focusedApp === id) setFocusedApp(null);
  };

  return (
    <div className="desktop-bg select-none" onClick={() => setStartMenuOpen(false)}>
      
      {/* Desktop Icons */}
      <div className="p-4 flex flex-col gap-6 w-max">
        <div 
          className="flex flex-col items-center w-20 cursor-pointer group"
          onDoubleClick={(e) => { e.stopPropagation(); toggleApp('about'); }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src="/my-computer.png" className="w-12 h-12" alt="My Computer" />
          <span className="text-white text-[11px] mt-1 drop-shadow-md px-1 group-hover:bg-[#0b61ff] border border-transparent group-hover:border-white/30">
            My Computer
          </span>
        </div>
      </div>

      {/* Windows Layer */}
      <AnimatePresence>
        {openApps.map((app) => (
          <Window 
            key={app}
            title={app === 'about' ? 'About Shishir' : 'My Projects'} 
            isActive={focusedApp === app}
            onFocus={() => setFocusedApp(app)}
            onClose={() => closeApp(app)}
          >
            {app === 'about' ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <img src="/my-computer.png" className="w-10 h-10" />
                  <div>
                    <h2 className="text-lg font-bold">ShishirXP Pro</h2>
                    <p className="text-sm">Version 2025 (Build 2600.xpsp_sp2_rtm)</p>
                  </div>
                </div>
                <hr />
                <p>Registered to: <strong>Shishir</strong></p>
                <button className="self-end px-6 py-1" onClick={() => closeApp('about')}>OK</button>
              </div>
            ) : (
              <p>Project list goes here...</p>
            )}
          </Window>
        ))}
      </AnimatePresence>

      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div 
          className="absolute bottom-8 left-0 w-64 bg-white border-2 border-[#245edb] shadow-2xl z-[2000] overflow-hidden rounded-t-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-[#1d59d1] to-[#4385f6] p-2 text-white font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-orange-500 border border-white" />
            ShishirXP
          </div>
          <div className="flex flex-col p-1 bg-white">
            <div className="hover:bg-[#316ac5] hover:text-white p-2 cursor-pointer flex items-center gap-2 text-sm" onClick={() => toggleApp('about')}>
              <span>📁</span> My Documents
            </div>
            <div className="hover:bg-[#316ac5] hover:text-white p-2 cursor-pointer flex items-center gap-2 text-sm">
              <span>🖼️</span> My Pictures
            </div>
            <hr className="my-1" />
            <div className="hover:bg-[#316ac5] hover:text-white p-2 cursor-pointer flex items-center gap-2 text-sm">
              <span>⚙️</span> Control Panel
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-[30px] bg-gradient-to-b from-[#245edb] to-[#1941a5] flex items-center z-[3000] border-t border-white/20">
        <button 
          onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
          className={`h-full px-4 flex items-center gap-1 italic font-bold text-white rounded-r-xl shadow-lg transition-all ${startMenuOpen ? 'brightness-75' : 'bg-gradient-to-b from-[#388e3c] to-[#2e7d32] hover:brightness-110'}`}
        >
          <span className="text-xl not-italic">⊞</span> start
        </button>

        <div className="flex-1 flex px-2 gap-1 h-full py-[2px]">
          {openApps.map(app => (
            <button 
              key={app}
              onClick={() => setFocusedApp(app)}
              className={`px-3 flex items-center gap-2 text-white text-[11px] rounded border border-white/10 truncate max-w-[150px] ${focusedApp === app ? 'bg-[#3c81f3] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]' : 'bg-[#245edb]'}`}
            >
              <img src="/my-computer.png" className="w-3 h-3" />
              {app === 'about' ? 'About Shishir' : 'Projects'}
            </button>
          ))}
        </div>

        <div className="bg-[#0996f1] h-full px-3 flex items-center text-white text-[11px] shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] border-l border-[#087acc]">
          {time}
        </div>
      </div>
    </div>
  );
}