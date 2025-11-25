import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmitSection = ({ onSubmit, isSubmitting, isValid }) => {
  const { language } = useNavigation();

  return (
    <div className="bg-card rounded-2xl p-6 shadow-neumorphic-lg">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-success rounded-xl shadow-neumorphic mb-4">
          <Icon name="Send" size={24} color="white" />
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'अनुरोध सबमिट करें' : 'Submit Request'}
        </h3>
        
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {language === 'hi' ?'आपका अनुरोध सबमिट करने के बाद, हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।' :'After submitting your request, our team will contact you within 24 hours.'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history?.back()}
            className="w-full sm:w-auto"
            iconName="ArrowLeft"
            iconPosition="left"
          >
            {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={onSubmit}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            className="w-full sm:w-auto"
            iconName="Send"
            iconPosition="right"
          >
            {isSubmitting 
              ? (language === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...')
              : (language === 'hi' ? 'अनुरोध सबमिट करें' : 'Submit Request')
            }
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-4">
          <Icon name="Shield" size={14} />
          <span>
            {language === 'hi' ?'आपकी जानकारी सुरक्षित और गोपनीय है' :'Your information is secure and confidential'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubmitSection;