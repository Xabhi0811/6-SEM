import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { socket } from '../services/socket';
import type { MarketPayload, StreamPayload, StreamPoint } from '../types';

interface StreamState {
  liveData: StreamPoint[];
  marketData: StreamPoint[];
  lastPayload: StreamPayload | null;
  lastMarketPayload: MarketPayload | null;
  connected: boolean;
}

const StreamContext = createContext<StreamState | null>(null);

export function StreamProvider({ children }: { children: ReactNode }) {
  const [liveData, setLiveData] = useState<StreamPoint[]>([]);
  const [marketData, setMarketData] = useState<StreamPoint[]>([]);
  const [lastPayload, setLastPayload] = useState<StreamPayload | null>(null);
  const [lastMarketPayload, setLastMarketPayload] = useState<MarketPayload | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('stream:seed', (points: StreamPoint[]) => setLiveData(points));
    socket.on('market:seed', (points: StreamPoint[]) => setMarketData(points));
    socket.on('stream:data', (payload: StreamPayload) => {
      setLastPayload(payload);
      setLiveData((current) => [...current.slice(-299), payload.point]);
    });
    socket.on('market:data', (payload: MarketPayload) => {
      setLastMarketPayload(payload);
      setMarketData((current) => [...current.slice(-299), payload.point]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('stream:seed');
      socket.off('market:seed');
      socket.off('stream:data');
      socket.off('market:data');
      socket.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ liveData, marketData, lastPayload, lastMarketPayload, connected }), [liveData, marketData, lastPayload, lastMarketPayload, connected]);

  return <StreamContext.Provider value={value}>{children}</StreamContext.Provider>;
}

export function useStream() {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error('useStream must be used inside StreamProvider');
  }
  return context;
}
