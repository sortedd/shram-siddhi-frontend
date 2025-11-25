import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, language }) => {
  const steps = [
    {
      id: 1,
      title: language === 'hi' ? 'व्यक्तिगत' : 'Personal',
      icon: 'User'
    },
    {
      id: 2,
      title: language === 'hi' ? 'आधार' : 'Aadhaar',
      icon: 'CreditCard'
    },
    {
      id: 3,
      title: language === 'hi' ? 'संपर्क' : 'Contact',
      icon: 'Phone'
    },
    {
      id: 4,
      title: language === 'hi' ? 'पता' : 'Address',
      icon: 'MapPin'
    },
    {
      id: 5,
      title: language === 'hi' ? 'कौशल' : 'Skills',
      icon: 'Wrench'
    },
    {
      id: 6,
      title: language === 'hi' ? 'फोटो' : 'Photo',
      icon: 'Camera'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'पंजीकरण प्रगति' : 'Registration Progress'}
        </h3>
        <span className="text-sm text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {steps?.map((step) => {
          const status = getStepStatus(step?.id);
          return (
            <div key={step?.id} className="flex flex-col items-center space-y-2">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                ${status === 'completed' 
                  ? 'bg-success text-success-foreground shadow-neumorphic' 
                  : status === 'current' ?'bg-primary text-primary-foreground shadow-neumorphic-pressed' :'bg-muted text-muted-foreground'
                }
              `}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`
                text-xs font-medium text-center
                ${status === 'current' ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {step?.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;