export function HeatmapPanel({ data }: { data: Array<{ row: string; col: string; value: number }> }) {
  const rows = [...new Set(data.map((item) => item.row))];
  const cols = [...new Set(data.map((item) => item.col))];

  const cell = (row: string, col: string) => data.find((item) => item.row === row && item.col === col)?.value ?? 0;

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[320px] grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2">
        <div />
        {cols.map((col) => (
          <div key={col} className="text-center text-xs uppercase tracking-[0.2em] text-slate-400">
            {col}
          </div>
        ))}
        {rows.map((row) => (
          <div key={row} className="contents">
            <div className="text-sm text-slate-300">{row}</div>
            {cols.map((col) => {
              const value = cell(row, col);
              return (
                <div
                  key={`${row}-${col}`}
                  className="h-10 rounded-2xl border border-white/10"
                  style={{ background: `rgba(34, 211, 238, ${0.08 + value * 0.7})` }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
