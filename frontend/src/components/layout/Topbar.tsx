import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MoonStar, SunMedium, LogOut, Activity, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useStream } from '../../context/StreamContext';

const searchTargets = [
  { label: 'Overview', path: '/' },
  { label: 'Live Analytics', path: '/live-analytics' },
  { label: 'AI Prediction', path: '/ai-prediction' },
  { label: 'Stream Monitoring', path: '/stream-monitoring' },
  { label: 'Dataset Upload', path: '/dataset-upload' },
  { label: 'Model Metrics', path: '/model-metrics' },
  { label: 'Alerts', path: '/alerts' }
];

export function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { connected } = useStream();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return searchTargets.filter((target) => target.label.toLowerCase().includes(normalized) || target.path.includes(normalized));
  }, [query]);

  const goToTarget = (path: string) => {
    navigate(path);
    setQuery('');
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matches[0]) {
      goToTarget(matches[0].path);
    }
  };

  return (
    <header className={theme === 'dark' ? 'sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8' : 'sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8'}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Production Data Science Dashboard</p>
          <h1 className={theme === 'dark' ? 'mt-1 font-display text-2xl font-semibold text-white' : 'mt-1 font-display text-2xl font-semibold text-slate-900'}>Real-time analytics operations panel</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={theme === 'dark' ? 'flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300' : 'flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600'}>
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search analytics, alerts, datasets"
                className={theme === 'dark' ? 'w-56 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400' : 'w-56 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400'}
              />
            </div>

            {matches.length > 0 ? (
              <div className={theme === 'dark' ? 'absolute right-0 top-[calc(100%+0.5rem)] z-30 w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-xl' : 'absolute right-0 top-[calc(100%+0.5rem)] z-30 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl'}>
                {matches.map((target) => (
                  <button
                    key={target.path}
                    type="button"
                    onClick={() => goToTarget(target.path)}
                    className={theme === 'dark' ? 'flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5' : 'flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100'}
                  >
                    <span>{target.label}</span>
                    <ArrowRight size={14} className={location.pathname === target.path ? 'text-cyan-300' : 'text-slate-400'} />
                  </button>
                ))}
              </div>
            ) : null}
          </form>

          <button onClick={toggleTheme} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          </button>

          <button onClick={() => navigate('/live-analytics')} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
            <Activity size={16} className={connected ? 'text-emerald-400' : 'text-rose-400'} />
            <span>{connected ? 'Live' : 'Offline'}</span>
          </button>

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
