import { useState, useEffect } from 'react';
import { Window } from './components/Window';
import { AnimatePresence, motion } from 'framer-motion';

// Define our apps
type AppId = 'about' | 'projects' | 'resume';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppId | null>(null);
  const [time, setTime] = useState("");

  // 1. Loading Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500); // 3.5 seconds boot
    return () => clearTimeout(timer);
  }, []);

  // 2. Clock Logic
  useEffect(() => {
    const updateClock = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleApp = (id: AppId) => {
    if (!openApps.includes(id)) setOpenApps([...openApps, id]);
    setFocusedApp(id);
  };

  const closeApp = (id: AppId) => {
    setOpenApps(openApps.filter(app => app !== id));
    if (focusedApp === id) setFocusedApp(null);
  };

  // --- LOADING SCREEN VIEW ---
  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        <img src="/xp-loading.gif" alt="Windows XP Loading" className="w-64" />
        <div className="mt-10 w-48 h-2 border border-gray-600 relative overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 w-12"
            animate={{ x: [-50, 200] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  // --- MAIN DESKTOP VIEW ---
  return (
    <div className="desktop-bg h-screen w-screen relative overflow-hidden select-none">
      
      {/* Desktop Icons */}
      <div className="p-6 flex flex-col gap-8 w-max">
        <DesktopIcon img="/user-icon.png" label="About Me" onDbClick={() => toggleApp('about')} />
        <DesktopIcon img="/folder-icon.png" label="My Projects" onDbClick={() => toggleApp('projects')} />
        <DesktopIcon img="/resume-icon.png" label="Resume.txt" onDbClick={() => toggleApp('resume')} />
      </div>

      {/* Windows Rendering */}
      <AnimatePresence>
        {openApps.map((app) => (
          <Window 
            key={app}
            title={app.charAt(0).toUpperCase() + app.slice(1)} 
            isActive={focusedApp === app}
            onFocus={() => setFocusedApp(app)}
            onClose={() => closeApp(app)}
          >
            {app === 'about' && (
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <img src="/user-icon.png" className="w-12 h-12" />
                  <h2 className="text-xl font-bold">Shishir XP User</h2>
                </div>
                <p>Welcome to my professional workspace.</p>
              </div>
            )}

            {app === 'resume' && (
              <div className="font-mono text-sm">
                <p>--- SHISHIR RESUME ---</p>
                <p>SKILLS: React, TypeScript, Tailwind</p>
                <p>EXPERIENCE: Building cool retro UIs</p>
                <textarea className="w-full h-32 mt-2 border p-1" defaultValue="Contact: your@email.com" />
              </div>
            )}

            {app === 'projects' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="border p-2 hover:bg-blue-100 cursor-pointer text-center">Project 1</div>
                <div className="border p-2 hover:bg-blue-100 cursor-pointer text-center">Project 2</div>
              </div>
            )}
          </Window>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-[30px] bg-[#245edb] flex items-center z-[1000] border-t border-white/40">
        <button className="h-full px-4 bg-green-600 rounded-r-xl italic font-bold text-white shadow-lg">start</button>
        <div className="flex-1 flex px-2 gap-1 overflow-hidden">
          {openApps.map(app => (
            <div 
              key={app}
              className={`px-3 py-1 text-white text-[11px] rounded border border-white/20 truncate min-w-[100px] ${focusedApp === app ? 'bg-[#3c81f3]' : 'bg-[#245edb]'}`}
              onClick={() => setFocusedApp(app)}
            >
              {app}
            </div>
          ))}
        </div>
        <div className="bg-[#0996f1] h-full px-4 flex items-center text-white text-[11px] border-l border-blue-400">{time}</div>
      </div>
    </div>
  );
}

// Sub-component for icons
function DesktopIcon({ img, label, onDbClick }: { img: string, label: string, onDbClick: () => void }) {
  return (
    <div onDoubleClick={onDbClick} className="flex flex-col items-center w-20 cursor-pointer group">
      <img src={img} className="w-12 h-12 group-active:brightness-75" alt={label} />
      <span className="text-white text-[11px] mt-1 drop-shadow-md px-1 group-hover:bg-[#0b61ff] group-active:bg-blue-800">
        {label}
      </span>
    </div>
  );
}