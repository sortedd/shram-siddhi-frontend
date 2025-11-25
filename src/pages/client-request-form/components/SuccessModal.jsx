import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, requestId }) => {
  const { language } = useNavigation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-2xl p-8 shadow-neumorphic-lg max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-2xl shadow-neumorphic-lg">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              {language === 'hi' ? 'अनुरोध सफलतापूर्वक सबमिट!' : 'Request Successfully Submitted!'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'hi' ?'आपका अनुरोध हमें प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।' :'Your request has been received. Our team will contact you soon.'
              }
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {language === 'hi' ? 'अनुरोध ID:' : 'Request ID:'}
              </span>
              <span className="font-mono font-medium text-foreground">
                {requestId}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ?'आगे क्या होगा:' :'What happens next:'
              }
            </p>
            <div className="text-left space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
                <p className="text-sm text-foreground">
                  {language === 'hi' ?'हमारी टीम आपके अनुरोध की समीक्षा करेगी' :'Our team will review your request'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <p className="text-sm text-foreground">
                  {language === 'hi' ?'24 घंटे के भीतर आपसे संपर्क करेंगे' :'Contact you within 24 hours'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <p className="text-sm text-foreground">
                  {language === 'hi' ?'उपयुक्त श्रमिकों का चयन करेंगे' :'Match you with suitable workers'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/homepage" className="flex-1">
              <Button variant="outline" className="w-full" iconName="Home" iconPosition="left">
                {language === 'hi' ? 'होम पेज' : 'Homepage'}
              </Button>
            </Link>
            <Button 
              variant="default" 
              onClick={onClose}
              className="flex-1"
              iconName="X"
              iconPosition="right"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;