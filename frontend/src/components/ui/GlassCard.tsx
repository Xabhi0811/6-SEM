import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function GlassCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass rounded-3xl p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
