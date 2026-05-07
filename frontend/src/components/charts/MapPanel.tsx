export function MapPanel({ points }: { points: Array<{ x: number; y: number; label: string }> }) {
  return (
    <div className="relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,.5) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      {points.map((point) => (
        <div
          key={point.label}
          className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          title={point.label}
        />
      ))}
      <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-300">Real-time geo pulse map</div>
    </div>
  );
}
