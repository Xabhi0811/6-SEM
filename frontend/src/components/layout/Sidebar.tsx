import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, Upload, BellRing, Brain, Boxes, Gauge, Home } from 'lucide-react';
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
  return (
    <aside className="hidden w-72 border-r border-white/10 bg-slate-950/70 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-white/5 p-4 shadow-glow">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
            <BarChart3 size={22} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">StreamScope Pro</p>
            <p className="text-xs text-slate-400">Real-time Data Science Command Center</p>
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
                isActive ? 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900/30 to-violet-500/10 p-4 text-sm text-slate-300">
        <p className="font-semibold text-white">Live telemetry</p>
        <p className="mt-1 text-slate-400">Socket.IO stream, ML inference, and activity alerts auto-refresh every few seconds.</p>
      </div>
    </aside>
  );
}
