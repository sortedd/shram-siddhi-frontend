import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationProvider, useNavigation } from '../../components/ui/ContextualNavigation';
import ContextualNavigation from '../../components/ui/ContextualNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PersonalDetailsCard from './components/PersonalDetailsCard';
import ContactDetailsCard from './components/ContactDetailsCard';
import ProfessionalDetailsCard from './components/ProfessionalDetailsCard';
import DocumentsCard from './components/DocumentsCard';
import LocationCard from './components/LocationCard';
import EditHistoryCard from './components/EditHistoryCard';
import ActionButtons from './components/ActionButtons';
import { workerDataManager } from '../../utils/workerDataManager';
import { useLocation } from 'react-router-dom';



const WorkerProfileDetailsContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useNavigation();
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkerData = async () => {
      setLoading(true);
      try {
        // Get worker data from location state or fetch by ID
        const { workerId, workerData: stateWorkerData } = location?.state || {};

        let worker = null;
        if (stateWorkerData) {
          worker = stateWorkerData;
        } else if (workerId) {
          worker = await workerDataManager?.getWorkerById(workerId);
        }

        if (worker) {
          setWorkerData(worker);
        } else {
          // Redirect to admin dashboard if no worker found
          navigate('/admin-dashboard');
        }
      } catch (error) {
        console.error('Error loading worker data:', error);
        navigate('/admin-dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadWorkerData();
  }, [location?.state, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    if (workerData?.id) {
      const success = await workerDataManager?.updateWorkerStatus(workerData?.id, newStatus);
      if (success) {
        setWorkerData(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleVerificationToggle = async () => {
    if (workerData?.id) {
      const newVerified = !workerData?.verified;
      const success = await workerDataManager?.updateWorkerVerification(workerData?.id, newVerified);
      if (success) {
        setWorkerData(prev => ({ ...prev, verified: newVerified }));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <ContextualNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workerData) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <ContextualNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === 'hi' ? 'श्रमिक डेटा नहीं मिला' : 'Worker Data Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'hi' ? 'श्रमिक का डेटा नहीं मिल सका। कृपया वापस जाकर पुनः प्रयास करें।' : 'Could not find worker data. Please go back and try again.'}
            </p>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <ContextualNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <BreadcrumbTrail />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {workerData?.fullName}
              </h1>
              <p className="text-muted-foreground">
                {language === 'hi' ? 'श्रमिक प्रोफाइल विवरण' : 'Worker Profile Details'}
              </p>
            </div>

            <ActionButtons
              worker={workerData}
              language={language}
              onStatusUpdate={handleStatusUpdate}
              onVerificationToggle={handleVerificationToggle}
              onExport={() => { }}
              onPrint={() => { }}
            />
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Personal Details */}
          <PersonalDetailsCard workerData={workerData} language={language} />

          {/* Contact Details */}
          <ContactDetailsCard worker={workerData} language={language} />

          {/* Professional Details */}
          <ProfessionalDetailsCard worker={workerData} language={language} />

          {/* Documents */}
          <DocumentsCard worker={workerData} language={language} />
        </div>

        {/* Full Width Cards */}
        <div className="space-y-8">
          {/* Location Information */}
          <LocationCard worker={workerData} language={language} />

          {/* Edit History */}
          <EditHistoryCard worker={workerData} language={language} />
        </div>
      </div>
    </div>
  );
};

const WorkerProfileDetails = () => {
  return (
    <NavigationProvider>
      <WorkerProfileDetailsContent />
    </NavigationProvider>
  );
};

export default WorkerProfileDetails;