import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./components/ui/ContextualNavigation";
import ContextualNavigation from "./components/ui/ContextualNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./pages/homepage";
import AdminDashboard from "./pages/admin-dashboard";
import WorkerEnrollmentForm from "./pages/worker-enrollment-form";
import AdminLogin from "./pages/admin-login";
import WorkerProfileDetails from "./pages/worker-profile-details";
import ClientRequestForm from "./pages/client-request-form";
import DatabaseViewer from "./pages/database-viewer";
import PitchDeck from "./pages/pitch-deck";
import FranchiseApplication from "./pages/franchise-application";
import ContactUs from "./pages/contact-us";
import NotFound from "./pages/NotFound";
import "./styles/tailwind.css";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <ContextualNavigation />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/worker-enrollment-form" element={<WorkerEnrollmentForm />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/worker-profile-details" element={<WorkerProfileDetails />} />
              <Route path="/client-request-form" element={<ClientRequestForm />} />
              <Route path="/database-viewer" element={<DatabaseViewer />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
              <Route path="/franchise-application" element={<FranchiseApplication />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;