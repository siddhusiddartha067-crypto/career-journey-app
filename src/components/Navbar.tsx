import React from 'react';
import { 
  Home, 
  Map, 
  CheckSquare, 
  FolderGit2, 
  Code2, 
  GraduationCap, 
  User, 
  Flame,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types/career';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  streakDays: number;
  studentName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  studentName
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'daily', label: 'Daily', icon: CheckSquare },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'career', label: 'Career', icon: GraduationCap },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Header - Strict 3-zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <button 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Career Journey
            </span>
          </button>

          {/* Zone 2: Desktop clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Streak Counter & Profile quick link */}
          <div className="flex items-center gap-2.5">
            <div 
              title={`${streakDays} days active learning streak!`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-semibold tabular-nums cursor-default select-none shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{streakDays}d Streak</span>
            </div>

            <button
              onClick={() => onSelectTab('profile')}
              title={`View ${studentName}'s profile`}
              className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center hover:ring-2 hover:ring-indigo-500 transition-all shadow-xs"
            >
              {studentName ? studentName.charAt(0).toUpperCase() : 'S'}
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Bottom Navigation Bar - Mobile Thumb-Zone Friendly */}
      <nav 
        aria-label="Bottom Navigation" 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg md:hidden"
      >
        <div className="grid grid-cols-7 items-center h-16 max-w-lg mx-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] rounded-lg ${
                  isActive 
                    ? 'text-indigo-600' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`relative p-1 rounded-md transition-transform ${isActive ? 'scale-110' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap truncate max-w-[48px] ${
                  isActive ? 'font-bold text-indigo-700' : 'font-medium text-slate-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
