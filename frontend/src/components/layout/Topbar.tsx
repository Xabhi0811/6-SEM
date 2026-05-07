import { Search, MoonStar, SunMedium, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useStream } from '../../context/StreamContext';

export function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { connected } = useStream();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Production Data Science Dashboard</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-white">Real-time analytics operations panel</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Search size={16} />
            <span>Search analytics, alerts, datasets</span>
          </div>

          <button onClick={toggleTheme} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          </button>

          <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-200">
            <Activity size={16} className={connected ? 'text-emerald-400' : 'text-rose-400'} />
            <span>{connected ? 'Live' : 'Offline'}</span>
          </div>

          <div className="glass rounded-full px-4 py-2 text-sm text-slate-200">{user?.name}</div>

          <button onClick={logout} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
