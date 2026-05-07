import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { socket } from '../services/socket';
import type { StreamPayload, StreamPoint } from '../types';

interface StreamState {
  liveData: StreamPoint[];
  lastPayload: StreamPayload | null;
  connected: boolean;
}

const StreamContext = createContext<StreamState | null>(null);

export function StreamProvider({ children }: { children: ReactNode }) {
  const [liveData, setLiveData] = useState<StreamPoint[]>([]);
  const [lastPayload, setLastPayload] = useState<StreamPayload | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('stream:seed', (points: StreamPoint[]) => setLiveData(points));
    socket.on('stream:data', (payload: StreamPayload) => {
      setLastPayload(payload);
      setLiveData((current) => [...current.slice(-299), payload.point]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('stream:seed');
      socket.off('stream:data');
      socket.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ liveData, lastPayload, connected }), [liveData, lastPayload, connected]);

  return <StreamContext.Provider value={value}>{children}</StreamContext.Provider>;
}

export function useStream() {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error('useStream must be used inside StreamProvider');
  }
  return context;
}
