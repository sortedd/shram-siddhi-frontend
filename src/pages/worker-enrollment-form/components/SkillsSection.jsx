import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SkillsSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  language 
}) => {
  const skillOptions = [
    { value: 'mason', label: language === 'hi' ? 'राजमिस्त्री' : 'Mason' },
    { value: 'plumber', label: language === 'hi' ? 'नलसाज' : 'Plumber' },
    { value: 'carpenter', label: language === 'hi' ? 'बढ़ई' : 'Carpenter' },
    { value: 'electrician', label: language === 'hi' ? 'इलेक्ट्रीशियन' : 'Electrician' },
    { value: 'painter', label: language === 'hi' ? 'रंगसाज' : 'Painter' },
    { value: 'welder', label: language === 'hi' ? 'वेल्डर' : 'Welder' },
    { value: 'tile-worker', label: language === 'hi' ? 'टाइल मिस्त्री' : 'Tile Worker' },
    { value: 'construction-helper', label: language === 'hi' ? 'निर्माण सहायक' : 'Construction Helper' },
    { value: 'driver', label: language === 'hi' ? 'चालक' : 'Driver' },
    { value: 'gardener', label: language === 'hi' ? 'माली' : 'Gardener' },
    { value: 'cleaner', label: language === 'hi' ? 'सफाई कर्मी' : 'Cleaner' },
    { value: 'security-guard', label: language === 'hi' ? 'सुरक्षा गार्ड' : 'Security Guard' }
  ];

  const availabilityOptions = [
    { value: 'full-time', label: language === 'hi' ? 'पूर्णकालिक (8+ घंटे)' : 'Full-time (8+ hours)' },
    { value: 'part-time', label: language === 'hi' ? 'अंशकालिक (4-6 घंटे)' : 'Part-time (4-6 hours)' },
    { value: 'seasonal', label: language === 'hi' ? 'मौसमी काम' : 'Seasonal Work' },
    { value: 'contract', label: language === 'hi' ? 'ठेका आधारित' : 'Contract Based' }
  ];

  const handleWageChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '');
    onInputChange({ target: { name: 'dailyWage', value } });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="Wrench" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'कौशल और काम की जानकारी' : 'Skills & Work Information'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'अपने कौशल और काम की उपलब्धता बताएं' : 'Tell us about your skills and work availability'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label={language === 'hi' ? 'मुख्य कौशल *' : 'Primary Skill *'}
          options={skillOptions}
          value={formData?.skillType}
          onChange={(value) => onInputChange({ target: { name: 'skillType', value } })}
          placeholder={language === 'hi' ? 'अपना मुख्य कौशल चुनें' : 'Select your primary skill'}
          error={errors?.skillType}
          required
          searchable
          className="mb-4"
        />

        <Input
          label={language === 'hi' ? 'अनुभव (वर्षों में)' : 'Experience (in years)'}
          type="number"
          name="experience"
          value={formData?.experience}
          onChange={onInputChange}
          placeholder={language === 'hi' ? 'कुल कार्य अनुभव' : 'Total work experience'}
          min="0"
          max="50"
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label={language === 'hi' ? 'दैनिक मजदूरी अपेक्षा (₹) *' : 'Daily Wage Expectation (₹) *'}
              type="text"
              name="dailyWage"
              value={formData?.dailyWage}
              onChange={handleWageChange}
              placeholder={language === 'hi' ? 'प्रति दिन मजदूरी' : 'Per day wage'}
              error={errors?.dailyWage}
              required
              className="mb-4"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'hi' ? 'सामान्य दैनिक दर: ₹300-₹1500' : 'Typical daily rates: ₹300-₹1500'}
            </p>
          </div>

          <Select
            label={language === 'hi' ? 'काम की उपलब्धता *' : 'Work Availability *'}
            options={availabilityOptions}
            value={formData?.availability}
            onChange={(value) => onInputChange({ target: { name: 'availability', value } })}
            placeholder={language === 'hi' ? 'उपलब्धता चुनें' : 'Select availability'}
            error={errors?.availability}
            required
            className="mb-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'अतिरिक्त कौशल या विशेषताएं' : 'Additional Skills or Specializations'}
          </label>
          <textarea
            name="additionalSkills"
            value={formData?.additionalSkills}
            onChange={onInputChange}
            placeholder={language === 'hi' ?'कोई अन्य कौशल, प्रमाणपत्र या विशेष अनुभव का उल्लेख करें...' :'Mention any other skills, certifications or special experience...'
            }
            rows="3"
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;