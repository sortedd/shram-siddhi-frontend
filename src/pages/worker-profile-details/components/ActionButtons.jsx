import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ worker, language, onStatusUpdate, onExport, onPrint }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Mock edit functionality - in real app would navigate to edit form
    alert(language === 'hi' ? 'संपादन सुविधा जल्द ही आएगी' : 'Edit functionality coming soon');
  };

  const handleStatusToggle = () => {
    const newStatus = worker?.status === 'Active' ? 'Inactive' : 'Active';
    onStatusUpdate(newStatus);
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
        {language === 'hi' ? 'क्रियाएं' : 'Actions'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="default"
          onClick={handleEdit}
          iconName="Edit"
          iconPosition="left"
          className="w-full"
        >
          {language === 'hi' ? 'संपादित करें' : 'Edit Profile'}
        </Button>

        <Button
          variant={worker?.status === 'Active' ? 'destructive' : 'success'}
          onClick={handleStatusToggle}
          iconName={worker?.status === 'Active' ? 'UserX' : 'UserCheck'}
          iconPosition="left"
          className="w-full"
        >
          {worker?.status === 'Active' 
            ? (language === 'hi' ? 'निष्क्रिय करें' : 'Deactivate')
            : (language === 'hi' ? 'सक्रिय करें' : 'Activate')
          }
        </Button>

        <Button
          variant="outline"
          onClick={onExport}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          {language === 'hi' ? 'निर्यात करें' : 'Export Data'}
        </Button>

        <Button
          variant="ghost"
          onClick={onPrint}
          iconName="Printer"
          iconPosition="left"
          className="w-full"
        >
          {language === 'hi' ? 'प्रिंट करें' : 'Print'}
        </Button>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => navigate('/admin-dashboard')}
          iconName="ArrowLeft"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          {language === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;