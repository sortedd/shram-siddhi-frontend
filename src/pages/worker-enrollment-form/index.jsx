import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationProvider, useNavigation } from '../../components/ui/ContextualNavigation';
import ContextualNavigation from '../../components/ui/ContextualNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import form components
import FormProgress from './components/FormProgress';
import PersonalInfoSection from './components/PersonalInfoSection';
import AadhaarSection from './components/AadhaarSection';
import ContactSection from './components/ContactSection';
import AddressSection from './components/AddressSection';
import SkillsSection from './components/SkillsSection';
import PhotoLocationSection from './components/PhotoLocationSection';

import { workerDataManager } from '../../utils/workerDataManager';

const WorkerEnrollmentFormContent = () => {
  const navigate = useNavigate();
  const { language } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    age: '',
    gender: '',
    
    // Aadhaar Information
    aadhaarNumber: '',
    aadhaarImage: null,
    
    // Contact Information
    mobileNumber: '',
    otp: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    district: '',
    
    // Skills Information
    skillType: '',
    experience: '',
    dailyWage: '',
    availability: '',
    additionalSkills: '',
    
    // Photo and Location
    photo: null,
    location: null
  });

  // Form errors state
  const [errors, setErrors] = useState({});

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== language) {
      // Language will be set by the navigation context
    }
  }, [language]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file uploads
  const handleFileUpload = (fieldName, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  // Handle location capture
  const handleLocationCapture = (locationData) => {
    setFormData(prev => ({
      ...prev,
      location: locationData
    }));
  };

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData?.fullName?.trim()) {
          newErrors.fullName = language === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
        }
        if (!formData?.age || formData?.age < 18 || formData?.age > 65) {
          newErrors.age = language === 'hi' ? 'उम्र 18-65 के बीच होनी चाहिए' : 'Age must be between 18-65';
        }
        if (!formData?.gender) {
          newErrors.gender = language === 'hi' ? 'लिंग चुनना आवश्यक है' : 'Gender selection is required';
        }
        break;

      case 2: // Aadhaar Information
        if (!formData?.aadhaarNumber || formData?.aadhaarNumber?.length !== 12) {
          newErrors.aadhaarNumber = language === 'hi' ? '12 अंकों का आधार नंबर आवश्यक है' : '12-digit Aadhaar number is required';
        }
        if (!formData?.aadhaarImage) {
          newErrors.aadhaarImage = language === 'hi' ? 'आधार कार्ड की फोटो आवश्यक है' : 'Aadhaar card photo is required';
        }
        break;

      case 3: // Contact Information
        if (!formData?.mobileNumber || formData?.mobileNumber?.length !== 10) {
          newErrors.mobileNumber = language === 'hi' ? '10 अंकों का मोबाइल नंबर आवश्यक है' : '10-digit mobile number is required';
        }
        break;

      case 4: // Address Information
        if (!formData?.address?.trim()) {
          newErrors.address = language === 'hi' ? 'पूरा पता आवश्यक है' : 'Complete address is required';
        }
        if (!formData?.city?.trim()) {
          newErrors.city = language === 'hi' ? 'शहर का नाम आवश्यक है' : 'City name is required';
        }
        if (!formData?.state) {
          newErrors.state = language === 'hi' ? 'राज्य चुनना आवश्यक है' : 'State selection is required';
        }
        if (!formData?.pincode || formData?.pincode?.length !== 6) {
          newErrors.pincode = language === 'hi' ? '6 अंकों का पिन कोड आवश्यक है' : '6-digit PIN code is required';
        }
        break;

      case 5: // Skills Information
        if (!formData?.skillType) {
          newErrors.skillType = language === 'hi' ? 'मुख्य कौशल चुनना आवश्यक है' : 'Primary skill selection is required';
        }
        if (!formData?.dailyWage || parseInt(formData?.dailyWage) < 100) {
          newErrors.dailyWage = language === 'hi' ? 'दैनिक मजदूरी कम से कम ₹100 होनी चाहिए' : 'Daily wage should be at least ₹100';
        }
        if (!formData?.availability) {
          newErrors.availability = language === 'hi' ? 'काम की उपलब्धता चुनना आवश्यक है' : 'Work availability selection is required';
        }
        break;

      case 6: // Photo and Location
        if (!formData?.photo) {
          newErrors.photo = language === 'hi' ? 'प्रोफाइल फोटो आवश्यक है' : 'Profile photo is required';
        }
        if (!formData?.location) {
          newErrors.location = language === 'hi' ? 'वर्तमान स्थान कैप्चर करना आवश्यक है' : 'Current location capture is required';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(6)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save data using real API
      const savedWorker = await workerDataManager?.saveWorkerData(formData);
      
      if (savedWorker) {
        setSubmitSuccess(true);
        
        // Show success and redirect
        setTimeout(() => {
          navigate('/homepage');
        }, 3000);
      } else {
        throw new Error('Failed to save worker data');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      // Add error handling UI if needed
      alert(language === 'hi' 
        ? `पंजीकरण में त्रुटि हुई: ${error.message}। कृपया पुनः प्रयास करें।`
        : `Registration error: ${error.message}. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            language={language}
          />
        );
      case 2:
        return (
          <AadhaarSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onFileUpload={handleFileUpload}
            language={language}
          />
        );
      case 3:
        return (
          <ContactSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            language={language}
          />
        );
      case 4:
        return (
          <AddressSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            language={language}
          />
        );
      case 5:
        return (
          <SkillsSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            language={language}
          />
        );
      case 6:
        return (
          <PhotoLocationSection
            formData={formData}
            errors={errors}
            onFileUpload={handleFileUpload}
            onLocationCapture={handleLocationCapture}
            language={language}
          />
        );
      default:
        return null;
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <ContextualNavigation />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-card rounded-xl p-8 shadow-neumorphic-lg border border-border text-center">
            <div className="w-20 h-20 mx-auto bg-success rounded-full flex items-center justify-center mb-6 shadow-neumorphic">
              <Icon name="CheckCircle" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              {language === 'hi' ? 'पंजीकरण सफल!' : 'Registration Successful!'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'hi' ?'आपका पंजीकरण सफलतापूर्वक पूरा हो गया है। आपको जल्द ही काम के अवसरों की जानकारी मिलेगी।' :'Your registration has been completed successfully. You will be notified about work opportunities soon.'
              }
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>
                {language === 'hi' ? 'होमपेज पर वापस जा रहे हैं...' : 'Redirecting to homepage...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualNavigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {language === 'hi' ? 'श्रमिक पंजीकरण फॉर्म' : 'Worker Enrollment Form'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'hi' ?'श्रम सिद्धि प्लेटफॉर्म पर अपना पंजीकरण कराएं और बेहतर रोजगार के अवसर पाएं' :'Register on Shram Siddhi platform and get access to better employment opportunities'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <FormProgress 
            currentStep={currentStep} 
            totalSteps={6} 
            language={language} 
          />

          {/* Form Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="min-w-[120px]"
            >
              <Icon name="ChevronLeft" size={16} />
              <span className="ml-2">
                {language === 'hi' ? 'पिछला' : 'Previous'}
              </span>
            </Button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                {language === 'hi' ? 'चरण' : 'Step'} {currentStep} {language === 'hi' ? 'का' : 'of'} 6
              </span>
            </div>

            {currentStep < 6 ? (
              <Button
                variant="default"
                onClick={handleNext}
                className="min-w-[120px]"
              >
                <span className="mr-2">
                  {language === 'hi' ? 'अगला' : 'Next'}
                </span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                <Icon name="Send" size={16} />
                <span className="ml-2">
                  {isSubmitting 
                    ? (language === 'hi' ? 'जमा कर रहे हैं...' : 'Submitting...') 
                    : (language === 'hi' ? 'पंजीकरण पूरा करें' : 'Complete Registration')
                  }
                </span>
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ?'सहायता चाहिए? हमसे संपर्क करें: +91 98765 43210' :'Need help? Contact us: +91 98765 43210'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkerEnrollmentForm = () => {
  return (
    <NavigationProvider>
      <WorkerEnrollmentFormContent />
    </NavigationProvider>
  );
};

export default WorkerEnrollmentForm;