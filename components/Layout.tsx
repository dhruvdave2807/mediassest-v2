
import React from 'react';
import { Home, ClipboardList, MessageSquare, Bell, User, PlusCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/library', icon: ClipboardList, label: 'Records' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/reminders', icon: Bell, label: 'Reminders' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-xl overflow-hidden relative">
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-24">
        {children}
      </main>

      {/* Floating Action Button for Upload (Mobile feel) */}
      <button
        onClick={() => navigate('/upload')}
        className="fixed bottom-24 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all z-20 md:hidden"
      >
        <PlusCircle size={28} />
      </button>

      {/* Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center py-3 px-2 z-30">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-teal-600 font-semibold' : 'text-slate-400'
                }`}
            >
              <item.icon size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
