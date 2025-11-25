import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AddressSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  language 
}) => {
  const stateOptions = [
    { value: 'andhra-pradesh', label: language === 'hi' ? 'आंध्र प्रदेश' : 'Andhra Pradesh' },
    { value: 'bihar', label: language === 'hi' ? 'बिहार' : 'Bihar' },
    { value: 'delhi', label: language === 'hi' ? 'दिल्ली' : 'Delhi' },
    { value: 'gujarat', label: language === 'hi' ? 'गुजरात' : 'Gujarat' },
    { value: 'haryana', label: language === 'hi' ? 'हरियाणा' : 'Haryana' },
    { value: 'karnataka', label: language === 'hi' ? 'कर्नाटक' : 'Karnataka' },
    { value: 'kerala', label: language === 'hi' ? 'केरल' : 'Kerala' },
    { value: 'madhya-pradesh', label: language === 'hi' ? 'मध्य प्रदेश' : 'Madhya Pradesh' },
    { value: 'maharashtra', label: language === 'hi' ? 'महाराष्ट्र' : 'Maharashtra' },
    { value: 'punjab', label: language === 'hi' ? 'पंजाब' : 'Punjab' },
    { value: 'rajasthan', label: language === 'hi' ? 'राजस्थान' : 'Rajasthan' },
    { value: 'tamil-nadu', label: language === 'hi' ? 'तमिल नाडु' : 'Tamil Nadu' },
    { value: 'uttar-pradesh', label: language === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh' },
    { value: 'west-bengal', label: language === 'hi' ? 'पश्चिम बंगाल' : 'West Bengal' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-neumorphic-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center shadow-neumorphic">
          <Icon name="MapPin" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {language === 'hi' ? 'पता विवरण' : 'Address Details'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'अपना पूरा पता भरें' : 'Fill in your complete address'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <Input
          label={language === 'hi' ? 'पूरा पता *' : 'Complete Address *'}
          type="text"
          name="address"
          value={formData?.address}
          onChange={onInputChange}
          placeholder={language === 'hi' ? 'मकान नंबर, गली, इलाका' : 'House no., Street, Area'}
          error={errors?.address}
          required
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={language === 'hi' ? 'शहर *' : 'City *'}
            type="text"
            name="city"
            value={formData?.city}
            onChange={onInputChange}
            placeholder={language === 'hi' ? 'अपना शहर दर्ज करें' : 'Enter your city'}
            error={errors?.city}
            required
            className="mb-4"
          />

          <Select
            label={language === 'hi' ? 'राज्य *' : 'State *'}
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => onInputChange({ target: { name: 'state', value } })}
            placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select state'}
            error={errors?.state}
            required
            searchable
            className="mb-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={language === 'hi' ? 'पिन कोड *' : 'PIN Code *'}
            type="text"
            name="pincode"
            value={formData?.pincode}
            onChange={(e) => {
              const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
              onInputChange({ target: { name: 'pincode', value } });
            }}
            placeholder={language === 'hi' ? '6 अंकों का पिन कोड' : '6-digit PIN code'}
            error={errors?.pincode}
            required
            maxLength="6"
            className="mb-4"
          />

          <Input
            label={language === 'hi' ? 'जिला' : 'District'}
            type="text"
            name="district"
            value={formData?.district}
            onChange={onInputChange}
            placeholder={language === 'hi' ? 'जिला का नाम' : 'District name'}
            className="mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;