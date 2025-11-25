import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PhotoLocationSection = ({ 
  formData, 
  errors, 
  onFileUpload, 
  onLocationCapture, 
  language 
}) => {
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileUpload('photo', file);
    }
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(language === 'hi' ? 'जीपीएस समर्थित नहीं है' : 'GPS not supported');
      return;
    }

    setIsCapturingLocation(true);
    setLocationError('');

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        onLocationCapture({
          latitude: latitude?.toFixed(6),
          longitude: longitude?.toFixed(6),
          accuracy: position?.coords?.accuracy
        });
        setIsCapturingLocation(false);
      },
      (error) => {
        let errorMessage = '';
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = language === 'hi' ? 'स्थान की अनुमति नहीं दी गई' : 'Location permission denied';
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMessage = language === 'hi' ? 'स्थान उपलब्ध नहीं है' : 'Location unavailable';
            break;
          case error?.TIMEOUT:
            errorMessage = language === 'hi' ? 'स्थान खोजने में समय समाप्त' : 'Location timeout';
            break;
          default:
            errorMessage = language === 'hi' ? 'स्थान प्राप्त करने में त्रुटि' : 'Error getting location';
            break;
        }
        setLocationError(errorMessage);
        setIsCapturingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="Camera" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'फोटो और स्थान' : 'Photo & Location'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'प्रोफाइल फोटो और वर्तमान स्थान' : 'Profile photo and current location'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Photo Upload Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'प्रोफाइल फोटो *' : 'Profile Photo *'}
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors duration-150">
            {formData?.photo ? (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-border">
                  <Image
                    src={formData?.photo}
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="ml-2">
                    {language === 'hi' ? 'फोटो बदलें' : 'Change Photo'}
                  </span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground mb-1">
                    {language === 'hi' ? 'अपनी फोटो अपलोड करें' : 'Upload your photo'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'hi' ? 'JPG या PNG (अधिकतम 2MB)' : 'JPG or PNG (Max 2MB)'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
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
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          {errors?.photo && (
            <p className="text-sm text-error mt-2">{errors?.photo}</p>
          )}
        </div>

        {/* Location Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'वर्तमान स्थान *' : 'Current Location *'}
          </label>
          <div className="bg-muted rounded-lg p-4 border border-border">
            {formData?.location ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm font-medium">
                    {language === 'hi' ? 'स्थान कैप्चर किया गया' : 'Location Captured'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    {language === 'hi' ? 'अक्षांश:' : 'Latitude:'} {formData?.location?.latitude}
                  </p>
                  <p>
                    {language === 'hi' ? 'देशांतर:' : 'Longitude:'} {formData?.location?.longitude}
                  </p>
                  <p>
                    {language === 'hi' ? 'सटीकता:' : 'Accuracy:'} ±{Math.round(formData?.location?.accuracy)}m
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={captureLocation}
                  loading={isCapturingLocation}
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="ml-2">
                    {language === 'hi' ? 'स्थान अपडेट करें' : 'Update Location'}
                  </span>
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-background rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground mb-1">
                    {language === 'hi' ? 'अपना वर्तमान स्थान कैप्चर करें' : 'Capture your current location'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'hi' ? 'काम के अवसरों के लिए आवश्यक' : 'Required for work opportunities'}
                  </p>
                </div>
                <Button
                  variant="default"
                  onClick={captureLocation}
                  loading={isCapturingLocation}
                  disabled={isCapturingLocation}
                >
                  <Icon name="MapPin" size={16} />
                  <span className="ml-2">
                    {isCapturingLocation 
                      ? (language === 'hi' ? 'स्थान खोज रहे हैं...' : 'Getting Location...') 
                      : (language === 'hi' ? 'स्थान कैप्चर करें' : 'Capture Location')
                    }
                  </span>
                </Button>
              </div>
            )}
            
            {locationError && (
              <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2 text-error">
                  <Icon name="AlertCircle" size={16} />
                  <span className="text-sm">{locationError}</span>
                </div>
              </div>
            )}
          </div>
          {errors?.location && (
            <p className="text-sm text-error mt-2">{errors?.location}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoLocationSection;