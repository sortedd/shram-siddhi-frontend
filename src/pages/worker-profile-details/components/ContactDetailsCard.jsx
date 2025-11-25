import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactDetailsCard = ({ worker, language }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="Phone" size={20} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'संपर्क विवरण' : 'Contact Details'}
        </h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
          </label>
          <div className="flex items-center space-x-3">
            <p className="text-foreground font-mono text-lg">{worker?.mobileNumber}</p>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-xs text-success font-medium">
                {language === 'hi' ? 'सत्यापित' : 'Verified'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {language === 'hi' ? 'पूरा पता' : 'Complete Address'}
          </label>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-foreground leading-relaxed">{worker?.address?.full}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <span className="text-xs text-muted-foreground block">
                  {language === 'hi' ? 'शहर' : 'City'}
                </span>
                <span className="text-sm font-medium text-foreground">{worker?.address?.city}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  {language === 'hi' ? 'राज्य' : 'State'}
                </span>
                <span className="text-sm font-medium text-foreground">{worker?.address?.state}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  {language === 'hi' ? 'पिनकोड' : 'Pincode'}
                </span>
                <span className="text-sm font-medium text-foreground font-mono">{worker?.address?.pincode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsCard;