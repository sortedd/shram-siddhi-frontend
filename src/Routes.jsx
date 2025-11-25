import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { NavigationProvider } from "components/ui/ContextualNavigation";
import ContextualNavigation from "components/ui/ContextualNavigation";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import WorkerEnrollmentForm from './pages/worker-enrollment-form';
import AdminLogin from './pages/admin-login';
import WorkerProfileDetails from './pages/worker-profile-details';
import ClientRequestForm from './pages/client-request-form';
import Homepage from './pages/homepage';
import DatabaseViewer from './pages/database-viewer';
import PitchDeck from './pages/pitch-deck';

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <ContextualNavigation />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<Homepage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/worker-enrollment-form" element={<WorkerEnrollmentForm />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/worker-profile-details" element={<WorkerProfileDetails />} />
            <Route path="/client-request-form" element={<ClientRequestForm />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/database-viewer" element={<DatabaseViewer />} />
            <Route path="/pitch-deck" element={<PitchDeck />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default Routes;