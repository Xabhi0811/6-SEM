import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617'
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          rose: '#fb7185',
          emerald: '#34d399'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.15), 0 20px 50px rgba(15, 23, 42, 0.45)'
      },
      backgroundImage: {
        'dashboard-gradient': 'radial-gradient(circle at top left, rgba(34,211,238,.18), transparent 25%), radial-gradient(circle at top right, rgba(139,92,246,.18), transparent 25%), linear-gradient(180deg, rgba(2,6,23,1), rgba(15,23,42,1))'
      },
      fontFamily: {
        display: ['Avenir Next', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
} satisfies Config;
