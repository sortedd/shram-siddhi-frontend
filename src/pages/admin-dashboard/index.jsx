import React, { useEffect } from 'react';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCards from './components/MetricsCards';
import WorkerEnrollmentMap from './components/WorkerEnrollmentMap';
import EnrollmentAnalytics from './components/EnrollmentAnalytics';
import WorkerManagementTable from './components/WorkerManagementTable';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const { language, setLanguage } = useNavigation();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, [language, setLanguage]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <BreadcrumbTrail />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {language === 'hi' ? 'प्रबंधक डैशबोर्ड' : 'Admin Dashboard'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'hi' ?'श्रमिक नामांकन और डेटा अंतर्दृष्टि का व्यापक अवलोकन' :'Comprehensive overview of worker enrollment and data insights'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>
                  {language === 'hi' ? 'अंतिम अपडेट:' : 'Last updated:'} {new Date()?.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Metrics Cards */}
        <MetricsCards />

        {/* Worker Enrollment Map */}
        <div className="mb-8">
          <WorkerEnrollmentMap />
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <EnrollmentAnalytics />
        </div>

        {/* Worker Management Table */}
        <WorkerManagementTable />

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} />
                <span>
                  {language === 'hi' ? 'डेटा सिंक: सक्रिय' : 'Data Sync: Active'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>
                  {language === 'hi' ? 'सुरक्षित कनेक्शन' : 'Secure Connection'}
                </span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4 sm:mt-0">
              {language === 'hi' 
                ? `© ${new Date()?.getFullYear()} श्रम सिद्धि। सभी अधिकार सुरक्षित।`
                : `© ${new Date()?.getFullYear()} Shram Siddhi. All rights reserved.`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;