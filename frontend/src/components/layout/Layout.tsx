import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-dashboard-gradient text-slate-100">
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
