import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Array<{ _id: string; title: string; message: string; type: string }>>([]);

  useEffect(() => {
    api.get('/alerts').then(({ data }) => setAlerts(data.alerts));
  }, []);

  return (
    <GlassCard title="Alerts & Notifications" subtitle="Critical, warning, and informational notifications from the live stream">
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-white">{alert.title}</p>
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">{alert.type}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{alert.message}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
