import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, Upload, BellRing, Brain, Boxes, Gauge, Home } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils';

const navItems = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/live-analytics', label: 'Live Analytics', icon: Activity },
  { to: '/ai-prediction', label: 'AI Prediction', icon: Brain },
  { to: '/stream-monitoring', label: 'Stream Monitoring', icon: Boxes },
  { to: '/dataset-upload', label: 'Dataset Upload', icon: Upload },
  { to: '/model-metrics', label: 'Model Metrics', icon: Gauge },
  { to: '/alerts', label: 'Alerts', icon: BellRing }
];

export function Sidebar() {
  const { theme } = useTheme();

  return (
    <aside className={theme === 'dark' ? 'hidden w-72 border-r border-white/10 bg-slate-950/70 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col' : 'hidden w-72 border-r border-slate-200 bg-white/80 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col'}>
      <div className={theme === 'dark' ? 'mb-8 rounded-3xl border border-cyan-400/20 bg-white/5 p-4 shadow-glow' : 'mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-50/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'}>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-500">
            <BarChart3 size={22} />
          </div>
          <div>
            <p className={theme === 'dark' ? 'font-display text-lg font-semibold text-white' : 'font-display text-lg font-semibold text-slate-900'}>StreamScope Pro</p>
            <p className={theme === 'dark' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>Real-time Data Science Command Center</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                isActive ? 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/20' : theme === 'dark' ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={theme === 'dark' ? 'mt-auto rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900/30 to-violet-500/10 p-4 text-sm text-slate-300' : 'mt-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-100/90 via-white/80 to-violet-100/90 p-4 text-sm text-slate-700'}>
        <p className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-slate-900'}>Live telemetry</p>
        <p className={theme === 'dark' ? 'mt-1 text-slate-400' : 'mt-1 text-slate-600'}>Socket.IO stream, ML inference, and activity alerts auto-refresh every few seconds.</p>
      </div>
    </aside>
  );
}
