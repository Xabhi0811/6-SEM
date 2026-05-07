import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { OverviewPage } from './pages/OverviewPage';
import { LiveAnalyticsPage } from './pages/LiveAnalyticsPage';
import { AIPredictionPage } from './pages/AIPredictionPage';
import { StreamMonitoringPage } from './pages/StreamMonitoringPage';
import { DatasetUploadPage } from './pages/DatasetUploadPage';
import { MetricsPage } from './pages/MetricsPage';
import { AlertsPage } from './pages/AlertsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="live-analytics" element={<LiveAnalyticsPage />} />
        <Route path="ai-prediction" element={<AIPredictionPage />} />
        <Route path="stream-monitoring" element={<StreamMonitoringPage />} />
        <Route path="dataset-upload" element={<DatasetUploadPage />} />
        <Route path="model-metrics" element={<MetricsPage />} />
        <Route path="alerts" element={<AlertsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
