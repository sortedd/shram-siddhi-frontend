import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalDetailsCard = ({ workerData, language }) => {
  const personalInfo = [
    {
      label: language === 'hi' ? 'पूरा नाम' : 'Full Name',
      value: workerData?.fullName || 'N/A',
      icon: 'User'
    },
    {
      label: language === 'hi' ? 'उम्र' : 'Age',
      value: workerData?.age ? `${workerData?.age} ${language === 'hi' ? 'साल' : 'years'}` : 'N/A',
      icon: 'Calendar'
    },
    {
      label: language === 'hi' ? 'लिंग' : 'Gender',
      value: workerData?.gender ? 
        (language === 'hi' ? 
          (workerData?.gender === 'male' ? 'पुरुष' : 
           workerData?.gender === 'female' ? 'महिला' : 'अन्य') : 
          workerData?.gender) : 'N/A',
      icon: 'Users'
    },
    {
      label: language === 'hi' ? 'आधार नंबर' : 'Aadhaar Number',
      value: workerData?.aadhaarNumber ? `XXXX XXXX ${workerData?.aadhaarNumber?.slice(-4)}` : 'N/A',
      icon: 'CreditCard'
    },
    {
      label: language === 'hi' ? 'पंजीकरण दिनांक' : 'Registration Date',
      value: workerData?.enrollmentDate ? 
        new Date(workerData?.enrollmentDate)?.toLocaleDateString() : 'N/A',
      icon: 'Calendar'
    },
    {
      label: language === 'hi' ? 'स्थिति' : 'Status',
      value: workerData?.status,
      icon: 'CheckCircle',
      isStatus: true
    }
  ];

  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalInfo?.map((info, index) => (
          <div key={index} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                {info?.label}
              </label>
              <p className="text-foreground font-medium">{info?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetailsCard;