import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import { apiService } from '../../../services/api';


const QuickActions = () => {
  const { language } = useNavigation();

  const actions = [
    {
      id: 1,
      title: language === 'hi' ? 'नया श्रमिक जोड़ें' : 'Add New Worker',
      description: language === 'hi' ? 'मैन्युअल रूप से श्रमिक पंजीकरण' : 'Manual worker registration',
      icon: 'UserPlus',
      color: 'bg-primary',
      link: '/worker-enrollment-form'
    },
    {
      id: 2,
      title: language === 'hi' ? 'डेटा निर्यात करें' : 'Export Data',
      description: language === 'hi' ? 'CSV/Excel में डाउनलोड करें' : 'Download as CSV/Excel',
      icon: 'Download',
      color: 'bg-secondary',
      action: 'export'
    },
    {
      id: 3,
      title: language === 'hi' ? 'रिपोर्ट जेनरेट करें' : 'Generate Report',
      description: language === 'hi' ? 'विस्तृत विश्लेषण रिपोर्ट' : 'Detailed analytics report',
      icon: 'FileText',
      color: 'bg-accent',
      action: 'report'
    },
    {
      id: 4,
      title: language === 'hi' ? 'सिस्टम सेटिंग्स' : 'System Settings',
      description: language === 'hi' ? 'प्लेटफॉर्म कॉन्फ़िगरेशन' : 'Platform configuration',
      icon: 'Settings',
      color: 'bg-muted-foreground',
      action: 'settings'
    }
  ];

  const handleAction = async (actionType) => {
    switch (actionType) {
      case 'export':
        try {
          // Use the real API to download the CSV
          const response = await apiService.workers.exportCSV();

          // Create a blob from the response data
          const blob = new Blob([response.data], { type: 'text/csv' });
          const url = window.URL?.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `workers_export_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          window.URL?.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Export failed:', error);
          alert(language === 'hi' ? 'डेटा निर्यात करने में विफल' : 'Failed to export data');
        }
        break;
      case 'report':
        alert(language === 'hi' ? 'रिपोर्ट जेनरेशन शुरू हो गई है...' : 'Report generation started...');
        break;
      case 'settings':
        alert(language === 'hi' ? 'सेटिंग्स पैनल जल्द ही उपलब्ध होगा' : 'Settings panel coming soon');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-neumorphic-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {language === 'hi' ? 'सामान्य प्रबंधन कार्यों के लिए शॉर्टकट' : 'Shortcuts for common management tasks'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div key={action?.id}>
            {action?.link ? (
              <Link to={action?.link}>
                <div className="group p-4 rounded-lg border border-border hover:shadow-neumorphic-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon name={action?.icon} size={20} color="white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {action?.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action?.description}
                  </p>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action?.action)}
                className="group w-full p-4 rounded-lg border border-border hover:shadow-neumorphic-md transition-all duration-200 text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon name={action?.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action?.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;