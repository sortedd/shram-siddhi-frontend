import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactPreferencesSection = ({ formData, setFormData, errors }) => {
  const { language } = useNavigation();

  const contactMethodOptions = [
    { value: 'phone', label: language === 'hi' ? 'फोन कॉल' : 'Phone Call' },
    { value: 'email', label: language === 'hi' ? 'ईमेल' : 'Email' },
    { value: 'whatsapp', label: language === 'hi' ? 'व्हाट्सऐप' : 'WhatsApp' },
    { value: 'sms', label: language === 'hi' ? 'SMS' : 'SMS' }
  ];

  const urgencyOptions = [
    { value: 'immediate', label: language === 'hi' ? 'तत्काल (24 घंटे)' : 'Immediate (24 hours)' },
    { value: 'urgent', label: language === 'hi' ? 'जल्दी (2-3 दिन)' : 'Urgent (2-3 days)' },
    { value: 'normal', label: language === 'hi' ? 'सामान्य (1 सप्ताह)' : 'Normal (1 week)' },
    { value: 'flexible', label: language === 'hi' ? 'लचीला (2+ सप्ताह)' : 'Flexible (2+ weeks)' }
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
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="MessageSquare" size={20} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {language === 'hi' ? 'संपर्क प्राथमिकताएं' : 'Contact Preferences'}
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={language === 'hi' ? 'पसंदीदा संपर्क विधि' : 'Preferred Contact Method'}
            placeholder={language === 'hi' ? 'विधि चुनें' : 'Select method'}
            options={contactMethodOptions}
            value={formData?.contactMethod}
            onChange={(value) => handleInputChange('contactMethod', value)}
            error={errors?.contactMethod}
            required
          />

          <Select
            label={language === 'hi' ? 'तत्काल आवश्यकता' : 'Urgency Level'}
            placeholder={language === 'hi' ? 'तत्काल स्तर चुनें' : 'Select urgency'}
            options={urgencyOptions}
            value={formData?.urgency}
            onChange={(value) => handleInputChange('urgency', value)}
            error={errors?.urgency}
            required
          />
        </div>

        <Input
          label={language === 'hi' ? 'प्राथमिक संपर्क समय' : 'Best Time to Contact'}
          type="text"
          placeholder={language === 'hi' ? 'जैसे: सुबह 9-12 बजे' : 'e.g., Morning 9-12 AM'}
          value={formData?.contactTime}
          onChange={(e) => handleInputChange('contactTime', e?.target?.value)}
          error={errors?.contactTime}
          description={language === 'hi' ? 'आपके लिए सुविधाजनक समय बताएं' : 'Specify your convenient time'}
        />

        <Input
          label={language === 'hi' ? 'वैकल्पिक संपर्क नंबर' : 'Alternative Contact Number'}
          type="tel"
          placeholder={language === 'hi' ? '+91 98765 43210' : '+91 98765 43210'}
          value={formData?.alternatePhone}
          onChange={(e) => handleInputChange('alternatePhone', e?.target?.value)}
          error={errors?.alternatePhone}
          description={language === 'hi' ? 'वैकल्पिक (यदि कोई हो)' : 'Optional alternative number'}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'विशेष आवश्यकताएं या टिप्पणियां' : 'Special Requirements or Comments'}
          </label>
          <textarea
            className="w-full min-h-[100px] px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical shadow-neumorphic-sm"
            placeholder={language === 'hi' ?'कोई विशेष आवश्यकताएं या अतिरिक्त जानकारी...' :'Any special requirements or additional information...'
            }
            value={formData?.specialRequirements}
            onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <Checkbox
            label={language === 'hi' ?'मैं श्रम सिद्धि से अपडेट और ऑफर प्राप्त करना चाहता हूं' :'I want to receive updates and offers from Shram Siddhi'
            }
            checked={formData?.receiveUpdates}
            onChange={(e) => handleInputChange('receiveUpdates', e?.target?.checked)}
          />

          <Checkbox
            label={language === 'hi' ?'मैं नियम और शर्तों से सहमत हूं' :'I agree to the terms and conditions'
            }
            checked={formData?.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
            error={errors?.agreeTerms}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPreferencesSection;