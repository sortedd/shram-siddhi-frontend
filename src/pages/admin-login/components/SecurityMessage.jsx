import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';

const SecurityMessage = () => {
  const { language } = useNavigation();

  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-start space-x-3">
        <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">
            {language === 'hi' ? 'सुरक्षा सूचना' : 'Security Notice'}
          </p>
          <ul className="space-y-1 text-xs">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>
                {language === 'hi' ?'सभी लॉगिन प्रयास रिकॉर्ड किए जाते हैं' :'All login attempts are recorded'
                }
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>
                {language === 'hi' ?'सत्र 8 घंटे बाद समाप्त हो जाता है' :'Session expires after 8 hours'
                }
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>
                {language === 'hi' ?'डेटा एन्क्रिप्टेड और सुरक्षित है' :'Data is encrypted and secure'
                }
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityMessage;