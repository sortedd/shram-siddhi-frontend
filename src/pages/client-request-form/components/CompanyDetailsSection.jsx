import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CompanyDetailsSection = ({ formData, setFormData, errors }) => {
  const { language } = useNavigation();

  const clientTypeOptions = [
    { 
      value: 'individual', 
      label: language === 'hi' ? 'व्यक्तिगत' : 'Individual' 
    },
    { 
      value: 'company', 
      label: language === 'hi' ? 'कंपनी' : 'Company' 
    },
    { 
      value: 'contractor', 
      label: language === 'hi' ? 'ठेकेदार' : 'Contractor' 
    },
    { 
      value: 'government', 
      label: language === 'hi' ? 'सरकारी संस्था' : 'Government Agency' 
    }
  ];

  const stateOptions = [
    { value: 'delhi', label: language === 'hi' ? 'दिल्ली' : 'Delhi' },
    { value: 'maharashtra', label: language === 'hi' ? 'महाराष्ट्र' : 'Maharashtra' },
    { value: 'karnataka', label: language === 'hi' ? 'कर्नाटक' : 'Karnataka' },
    { value: 'tamil-nadu', label: language === 'hi' ? 'तमिल नाडु' : 'Tamil Nadu' },
    { value: 'gujarat', label: language === 'hi' ? 'गुजरात' : 'Gujarat' },
    { value: 'rajasthan', label: language === 'hi' ? 'राजस्थान' : 'Rajasthan' },
    { value: 'uttar-pradesh', label: language === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh' },
    { value: 'west-bengal', label: language === 'hi' ? 'पश्चिम बंगाल' : 'West Bengal' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-neumorphic-lg mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="Building2" size={20} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {language === 'hi' ? 'कंपनी/व्यक्तिगत विवरण' : 'Company/Personal Details'}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={language === 'hi' ? 'क्लाइंट प्रकार' : 'Client Type'}
          placeholder={language === 'hi' ? 'प्रकार चुनें' : 'Select type'}
          options={clientTypeOptions}
          value={formData?.clientType}
          onChange={(value) => handleInputChange('clientType', value)}
          error={errors?.clientType}
          required
          className="md:col-span-2"
        />

        <Input
          label={language === 'hi' ? 'कंपनी/व्यक्ति का नाम' : 'Company/Individual Name'}
          type="text"
          placeholder={language === 'hi' ? 'नाम दर्ज करें' : 'Enter name'}
          value={formData?.companyName}
          onChange={(e) => handleInputChange('companyName', e?.target?.value)}
          error={errors?.companyName}
          required
        />

        <Input
          label={language === 'hi' ? 'संपर्क व्यक्ति' : 'Contact Person'}
          type="text"
          placeholder={language === 'hi' ? 'संपर्क व्यक्ति का नाम' : 'Contact person name'}
          value={formData?.contactPerson}
          onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
          error={errors?.contactPerson}
          required
        />

        <Input
          label={language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
          type="tel"
          placeholder={language === 'hi' ? '+91 98765 43210' : '+91 98765 43210'}
          value={formData?.mobile}
          onChange={(e) => handleInputChange('mobile', e?.target?.value)}
          error={errors?.mobile}
          required
        />

        <Input
          label={language === 'hi' ? 'ईमेल पता' : 'Email Address'}
          type="email"
          placeholder={language === 'hi' ? 'example@email.com' : 'example@email.com'}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label={language === 'hi' ? 'शहर' : 'City'}
          type="text"
          placeholder={language === 'hi' ? 'शहर का नाम' : 'City name'}
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />

        <Select
          label={language === 'hi' ? 'राज्य' : 'State'}
          placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select state'}
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => handleInputChange('state', value)}
          error={errors?.state}
          required
          searchable
        />

        <Input
          label={language === 'hi' ? 'पिन कोड' : 'Pin Code'}
          type="text"
          placeholder={language === 'hi' ? '110001' : '110001'}
          value={formData?.pincode}
          onChange={(e) => handleInputChange('pincode', e?.target?.value)}
          error={errors?.pincode}
          required
          maxLength={6}
        />
      </div>
    </div>
  );
};

export default CompanyDetailsSection;