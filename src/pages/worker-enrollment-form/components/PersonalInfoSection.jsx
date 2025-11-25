import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  language 
}) => {
  const genderOptions = [
    { 
      value: 'male', 
      label: language === 'hi' ? 'पुरुष' : 'Male' 
    },
    { 
      value: 'female', 
      label: language === 'hi' ? 'महिला' : 'Female' 
    },
    { 
      value: 'other', 
      label: language === 'hi' ? 'अन्य' : 'Other' 
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="User" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'अपनी बुनियादी जानकारी भरें' : 'Fill in your basic details'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label={language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
            type="text"
            name="fullName"
            value={formData?.fullName}
            onChange={onInputChange}
            placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
            error={errors?.fullName}
            required
            className="mb-4"
          />
        </div>

        <Input
          label={language === 'hi' ? 'उम्र *' : 'Age *'}
          type="number"
          name="age"
          value={formData?.age}
          onChange={onInputChange}
          placeholder={language === 'hi' ? 'आपकी उम्र' : 'Your age'}
          error={errors?.age}
          required
          min="18"
          max="65"
          className="mb-4"
        />

        <Select
          label={language === 'hi' ? 'लिंग *' : 'Gender *'}
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => onInputChange({ target: { name: 'gender', value } })}
          placeholder={language === 'hi' ? 'लिंग चुनें' : 'Select gender'}
          error={errors?.gender}
          required
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;