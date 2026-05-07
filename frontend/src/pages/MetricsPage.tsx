import { GlassCard } from '../components/ui/GlassCard';
import { ConfusionRoc } from '../components/charts/ConfusionRoc';

export function MetricsPage() {
  return (
    <div className="space-y-6">
      <GlassCard title="Model Performance" subtitle="Core classification metrics and diagnostics">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Accuracy', '0.94'],
            ['Precision', '0.92'],
            ['Recall', '0.89'],
            ['F1 Score', '0.90']
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">{label}</p>
              <p className="mt-2 text-4xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <ConfusionRoc
        rocData={[
          { x: 0, y: 0 },
          { x: 0.1, y: 0.25 },
          { x: 0.25, y: 0.45 },
          { x: 0.45, y: 0.72 },
          { x: 0.7, y: 0.89 },
          { x: 1, y: 1 }
        ]}
        matrixData={[
          { name: 'TP', value: 93 },
          { name: 'FP', value: 7 },
          { name: 'TN', value: 91 },
          { name: 'FN', value: 9 }
        ]}
      />
    </div>
  );
}
