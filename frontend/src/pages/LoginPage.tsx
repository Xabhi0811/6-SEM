import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('admin@dashboard.dev');
  const [password, setPassword] = useState('Admin@12345');
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success('Authenticated successfully');
      navigate('/');
    } catch {
      toast.error('Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dashboard-gradient px-4">
      <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="glass w-full max-w-md rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">StreamScope Pro</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white">Sign in to the analytics cockpit</h1>
        <p className="mt-2 text-sm text-slate-400">Use the demo credentials from `.env.example` or your own JWT-enabled account.</p>

        <label className="mt-6 block text-sm text-slate-300">
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 focus:border-cyan-400" />
        </label>

        <label className="mt-4 block text-sm text-slate-300">
          Password
          <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-cyan-400" />
        </label>

        <button disabled={busy} className="mt-6 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? 'Signing in...' : 'Enter dashboard'}
        </button>
      </motion.form>
    </div>
  );
}
