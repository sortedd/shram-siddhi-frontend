import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  language 
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendOTP = async () => {
    if (!formData?.mobileNumber || formData?.mobileNumber?.length !== 10) {
      return;
    }

    // Mock OTP sending
    setOtpSent(true);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOTP = async () => {
    if (!formData?.otp || formData?.otp?.length !== 6) {
      return;
    }

    setIsVerifying(true);
    
    // Mock OTP verification - accept 123456 as valid OTP
    setTimeout(() => {
      if (formData?.otp === '123456') {
        setOtpVerified(true);
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleMobileChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 10);
    onInputChange({ target: { name: 'mobileNumber', value } });
    setOtpSent(false);
    setOtpVerified(false);
  };

  const handleOtpChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
    onInputChange({ target: { name: 'otp', value } });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="Phone" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'संपर्क सत्यापन' : 'Contact Verification'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'मोबाइल नंबर सत्यापन आवश्यक है' : 'Mobile number verification required'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label={language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
            type="tel"
            name="mobileNumber"
            value={formData?.mobileNumber}
            onChange={handleMobileChange}
            placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
            error={errors?.mobileNumber}
            required
            maxLength="10"
            className="mb-4"
          />
          
          {formData?.mobileNumber && formData?.mobileNumber?.length === 10 && !otpVerified && (
            <div className="absolute right-2 top-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={sendOTP}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `${countdown}s` : (language === 'hi' ? 'OTP भेजें' : 'Send OTP')}
              </Button>
            </div>
          )}

          {otpVerified && (
            <div className="absolute right-2 top-8">
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-xs">
                  {language === 'hi' ? 'सत्यापित' : 'Verified'}
                </span>
              </div>
            </div>
          )}
        </div>

        {otpSent && !otpVerified && (
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="MessageSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {language === 'hi' ? 'OTP सत्यापन' : 'OTP Verification'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              {language === 'hi' 
                ? `+91 ${formData?.mobileNumber} पर भेजा गया 6 अंकों का OTP दर्ज करें। परीक्षण के लिए 123456 का उपयोग करें।`
                : `Enter the 6-digit OTP sent to +91 ${formData?.mobileNumber}. Use 123456 for testing.`
              }
            </p>
            
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  type="text"
                  name="otp"
                  value={formData?.otp}
                  onChange={handleOtpChange}
                  placeholder={language === 'hi' ? '6 अंकों का OTP' : '6-digit OTP'}
                  maxLength="6"
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button
                variant="default"
                onClick={verifyOTP}
                loading={isVerifying}
                disabled={!formData?.otp || formData?.otp?.length !== 6 || isVerifying}
              >
                {language === 'hi' ? 'सत्यापित करें' : 'Verify'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;