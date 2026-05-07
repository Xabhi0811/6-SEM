import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useTheme } from '../../context/ThemeContext';

export function Layout() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-dashboard-gradient text-slate-100' : 'min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(139,92,246,.12),_transparent_24%),linear-gradient(180deg,_rgba(248,250,252,1),_rgba(226,232,240,1))] text-slate-900'}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Topbar />
          <div className="scrollbar h-[calc(100vh-88px)] overflow-y-auto px-4 pb-8 pt-2 md:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
