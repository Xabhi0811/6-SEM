import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function GlassCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={theme === 'dark' ? 'glass rounded-3xl p-5' : 'rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]'}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className={theme === 'dark' ? 'font-display text-lg font-semibold text-white' : 'font-display text-lg font-semibold text-slate-900'}>{title}</h2>
          {subtitle ? <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
