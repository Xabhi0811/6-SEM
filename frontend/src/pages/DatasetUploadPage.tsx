import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';

export function DatasetUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('Portfolio Dataset');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!file) return;
    setBusy(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('rowCount', '0');
    try {
      await api.post('/datasets/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Dataset uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <GlassCard title="Dataset Upload" subtitle="Upload CSV or JSON data for live analysis and ML inference">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Dataset name
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-cyan-400" />
        </label>
        <label className="block text-sm text-slate-300">
          File
          <input type="file" accept=".csv,.json" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm" />
        </label>
      </div>
      <button onClick={submit} disabled={busy} className="mt-5 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
        {busy ? 'Uploading...' : 'Upload dataset'}
      </button>
    </GlassCard>
  );
}
