import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatNumber } from '../../utils';

export function KpiCard({ label, value, delta, accent }: { label: string; value: number; delta: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
      className="glass rounded-3xl p-5"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-3xl font-semibold text-white">{formatNumber(value, 1)}</p>
          <p className="mt-2 flex items-center gap-1 text-sm text-emerald-400"><ArrowUpRight size={16} />{delta}</p>
        </div>
        <div className="h-12 w-12 rounded-2xl" style={{ background: accent }} />
      </div>
    </motion.div>
  );
}
