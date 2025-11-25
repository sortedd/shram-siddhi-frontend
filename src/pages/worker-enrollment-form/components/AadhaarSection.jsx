import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const AadhaarSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  onFileUpload, 
  language 
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);

  const validateAadhaar = async () => {
    if (!formData?.aadhaarNumber || formData?.aadhaarNumber?.length !== 12) {
      return;
    }

    setIsValidating(true);
    
    // Mock validation - in real app, this would call Aadhaar API
    setTimeout(() => {
      setValidationStatus('valid');
      setIsValidating(false);
    }, 2000);
  };

  const handleAadhaarChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 12);
    onInputChange({ target: { name: 'aadhaarNumber', value } });
    setValidationStatus(null);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileUpload('aadhaarImage', file);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="CreditCard" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'आधार सत्यापन' : 'Aadhaar Verification'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'पहचान सत्यापन के लिए आधार विवरण' : 'Aadhaar details for identity verification'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label={language === 'hi' ? 'आधार नंबर *' : 'Aadhaar Number *'}
            type="text"
            name="aadhaarNumber"
            value={formData?.aadhaarNumber}
            onChange={handleAadhaarChange}
            placeholder={language === 'hi' ? '12 अंकों का आधार नंबर' : '12-digit Aadhaar number'}
            error={errors?.aadhaarNumber}
            required
            maxLength="12"
            className="mb-4"
          />
          
          {formData?.aadhaarNumber && formData?.aadhaarNumber?.length === 12 && (
            <div className="absolute right-2 top-8">
              {validationStatus === 'valid' ? (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-xs">
                    {language === 'hi' ? 'सत्यापित' : 'Verified'}
                  </span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={validateAadhaar}
                  loading={isValidating}
                  disabled={isValidating}
                >
                  {language === 'hi' ? 'सत्यापित करें' : 'Verify'}
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'आधार कार्ड की फोटो *' : 'Aadhaar Card Photo *'}
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors duration-150">
            {formData?.aadhaarImage ? (
              <div className="space-y-4">
                <div className="w-32 h-20 mx-auto overflow-hidden rounded-lg border border-border">
                  <Image
                    src={formData?.aadhaarImage}
                    alt="Aadhaar Card"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('aadhaar-upload')?.click()}
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="ml-2">
                    {language === 'hi' ? 'बदलें' : 'Change'}
                  </span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground mb-1">
                    {language === 'hi' ? 'आधार कार्ड की फोटो अपलोड करें' : 'Upload Aadhaar Card Photo'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'hi' ? 'JPG, PNG या PDF (अधिकतम 5MB)' : 'JPG, PNG or PDF (Max 5MB)'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('aadhaar-upload')?.click()}
                >
                  <Icon name="Camera" size={16} />
                  <span className="ml-2">
                    {language === 'hi' ? 'फोटो चुनें' : 'Choose Photo'}
                  </span>
                </Button>
              </div>
            )}
          </div>
          <input
            id="aadhaar-upload"
            type="file"
            accept="image/*,.pdf"
            onChange={handleImageUpload}
            className="hidden"
          />
          {errors?.aadhaarImage && (
            <p className="text-sm text-error mt-2">{errors?.aadhaarImage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarSection;