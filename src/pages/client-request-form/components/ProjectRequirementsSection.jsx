import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ProjectRequirementsSection = ({ formData, setFormData, errors }) => {
  const { language } = useNavigation();

  const skillOptions = [
    { value: 'mason', label: language === 'hi' ? 'राजमिस्त्री' : 'Mason' },
    { value: 'plumber', label: language === 'hi' ? 'प्लंबर' : 'Plumber' },
    { value: 'carpenter', label: language === 'hi' ? 'बढ़ई' : 'Carpenter' },
    { value: 'electrician', label: language === 'hi' ? 'इलेक्ट्रीशियन' : 'Electrician' },
    { value: 'painter', label: language === 'hi' ? 'पेंटर' : 'Painter' },
    { value: 'welder', label: language === 'hi' ? 'वेल्डर' : 'Welder' },
    { value: 'helper', label: language === 'hi' ? 'सहायक' : 'Helper' },
    { value: 'supervisor', label: language === 'hi' ? 'सुपरवाइजर' : 'Supervisor' }
  ];

  const projectTypeOptions = [
    { value: 'residential', label: language === 'hi' ? 'आवासीय' : 'Residential' },
    { value: 'commercial', label: language === 'hi' ? 'व्यावसायिक' : 'Commercial' },
    { value: 'industrial', label: language === 'hi' ? 'औद्योगिक' : 'Industrial' },
    { value: 'infrastructure', label: language === 'hi' ? 'अवसंरचना' : 'Infrastructure' },
    { value: 'renovation', label: language === 'hi' ? 'नवीनीकरण' : 'Renovation' },
    { value: 'maintenance', label: language === 'hi' ? 'रखरखाव' : 'Maintenance' }
  ];

  const durationOptions = [
    { value: '1-7', label: language === 'hi' ? '1-7 दिन' : '1-7 days' },
    { value: '1-4', label: language === 'hi' ? '1-4 सप्ताह' : '1-4 weeks' },
    { value: '1-3', label: language === 'hi' ? '1-3 महीने' : '1-3 months' },
    { value: '3-6', label: language === 'hi' ? '3-6 महीने' : '3-6 months' },
    { value: '6+', label: language === 'hi' ? '6+ महीने' : '6+ months' },
    { value: 'ongoing', label: language === 'hi' ? 'निरंतर' : 'Ongoing' }
  ];

  const budgetOptions = [
    { value: '0-50000', label: language === 'hi' ? '₹0 - ₹50,000' : '₹0 - ₹50,000' },
    { value: '50000-100000', label: language === 'hi' ? '₹50,000 - ₹1,00,000' : '₹50,000 - ₹1,00,000' },
    { value: '100000-500000', label: language === 'hi' ? '₹1,00,000 - ₹5,00,000' : '₹1,00,000 - ₹5,00,000' },
    { value: '500000-1000000', label: language === 'hi' ? '₹5,00,000 - ₹10,00,000' : '₹5,00,000 - ₹10,00,000' },
    { value: '1000000+', label: language === 'hi' ? '₹10,00,000+' : '₹10,00,000+' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (skillValue, checked) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: checked 
        ? [...prev?.requiredSkills, skillValue]
        : prev?.requiredSkills?.filter(skill => skill !== skillValue)
    }));
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-neumorphic-lg mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="Briefcase" size={20} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {language === 'hi' ? 'परियोजना आवश्यकताएं' : 'Project Requirements'}
        </h2>
      </div>
      <div className="space-y-6">
        <Input
          label={language === 'hi' ? 'परियोजना का नाम' : 'Project Name'}
          type="text"
          placeholder={language === 'hi' ? 'परियोजना का नाम दर्ज करें' : 'Enter project name'}
          value={formData?.projectName}
          onChange={(e) => handleInputChange('projectName', e?.target?.value)}
          error={errors?.projectName}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={language === 'hi' ? 'परियोजना प्रकार' : 'Project Type'}
            placeholder={language === 'hi' ? 'प्रकार चुनें' : 'Select type'}
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
            error={errors?.projectType}
            required
          />

          <Input
            label={language === 'hi' ? 'आवश्यक श्रमिकों की संख्या' : 'Number of Workers Required'}
            type="number"
            placeholder={language === 'hi' ? '5' : '5'}
            value={formData?.workerCount}
            onChange={(e) => handleInputChange('workerCount', e?.target?.value)}
            error={errors?.workerCount}
            required
            min={1}
            max={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {language === 'hi' ? 'आवश्यक कौशल' : 'Required Skills'} *
          </label>
          <CheckboxGroup error={errors?.requiredSkills}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skillOptions?.map((skill) => (
                <Checkbox
                  key={skill?.value}
                  label={skill?.label}
                  checked={formData?.requiredSkills?.includes(skill?.value)}
                  onChange={(e) => handleSkillChange(skill?.value, e?.target?.checked)}
                  size="sm"
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={language === 'hi' ? 'परियोजना अवधि' : 'Project Duration'}
            placeholder={language === 'hi' ? 'अवधि चुनें' : 'Select duration'}
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            error={errors?.duration}
            required
          />

          <Select
            label={language === 'hi' ? 'बजट रेंज' : 'Budget Range'}
            placeholder={language === 'hi' ? 'बजट चुनें' : 'Select budget'}
            options={budgetOptions}
            value={formData?.budget}
            onChange={(value) => handleInputChange('budget', value)}
            error={errors?.budget}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'hi' ? 'परियोजना विवरण' : 'Project Description'} *
          </label>
          <textarea
            className="w-full min-h-[120px] px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical shadow-neumorphic-sm"
            placeholder={language === 'hi' ?'अपनी परियोजना के बारे में विस्तार से बताएं...' :'Describe your project in detail...'
            }
            value={formData?.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e?.target?.value)}
            rows={4}
          />
          {errors?.projectDescription && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors?.projectDescription}
            </p>
          )}
        </div>

        <Input
          label={language === 'hi' ? 'परियोजना स्थान' : 'Project Location'}
          type="text"
          placeholder={language === 'hi' ? 'पूरा पता दर्ज करें' : 'Enter complete address'}
          value={formData?.projectLocation}
          onChange={(e) => handleInputChange('projectLocation', e?.target?.value)}
          error={errors?.projectLocation}
          required
          description={language === 'hi' ? 'कार्य स्थल का पूरा पता' : 'Complete address of work site'}
        />
      </div>
    </div>
  );
};

export default ProjectRequirementsSection;