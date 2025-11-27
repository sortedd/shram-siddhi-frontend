import React, { useState, useEffect } from 'react';
import { NavigationProvider } from '../../components/ui/ContextualNavigation';
import ContextualNavigation from '../../components/ui/ContextualNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FormHeader from './components/FormHeader';
import CompanyDetailsSection from './components/CompanyDetailsSection';
import ProjectRequirementsSection from './components/ProjectRequirementsSection';
import ContactPreferencesSection from './components/ContactPreferencesSection';
import SubmitSection from './components/SubmitSection';
import SuccessModal from './components/SuccessModal';
import { apiService } from '../../services/api';

const ClientRequestForm = () => {
  const [formData, setFormData] = useState({
    // Company Details
    clientType: '',
    companyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    pincode: '',

    // Project Requirements
    projectName: '',
    projectType: '',
    workerCount: '',
    requiredSkills: [],
    duration: '',
    budget: '',
    projectDescription: '',
    projectLocation: '',

    // Contact Preferences
    contactMethod: '',
    urgency: '',
    contactTime: '',
    alternatePhone: '',
    specialRequirements: '',
    receiveUpdates: false,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [requestId, setRequestId] = useState('');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      // Language will be set by NavigationProvider
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Company Details validation
    if (!formData?.clientType) newErrors.clientType = 'Client type is required';
    if (!formData?.companyName?.trim()) newErrors.companyName = 'Company/Individual name is required';
    if (!formData?.contactPerson?.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData?.mobile?.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[+]?[0-9]{10,15}$/?.test(formData?.mobile?.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state) newErrors.state = 'State is required';
    if (!formData?.pincode?.trim()) newErrors.pincode = 'Pin code is required';
    else if (!/^[0-9]{6}$/?.test(formData?.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pin code';
    }

    // Project Requirements validation
    if (!formData?.projectName?.trim()) newErrors.projectName = 'Project name is required';
    if (!formData?.projectType) newErrors.projectType = 'Project type is required';
    if (!formData?.workerCount) newErrors.workerCount = 'Number of workers is required';
    else if (parseInt(formData?.workerCount) < 1 || parseInt(formData?.workerCount) > 100) {
      newErrors.workerCount = 'Number of workers must be between 1 and 100';
    }
    if (formData?.requiredSkills?.length === 0) newErrors.requiredSkills = 'Please select at least one skill';
    if (!formData?.duration) newErrors.duration = 'Project duration is required';
    if (!formData?.budget) newErrors.budget = 'Budget range is required';
    if (!formData?.projectDescription?.trim()) newErrors.projectDescription = 'Project description is required';
    else if (formData?.projectDescription?.trim()?.length < 20) {
      newErrors.projectDescription = 'Please provide a detailed description (minimum 20 characters)';
    }
    if (!formData?.projectLocation?.trim()) newErrors.projectLocation = 'Project location is required';

    // Contact Preferences validation
    if (!formData?.contactMethod) newErrors.contactMethod = 'Preferred contact method is required';
    if (!formData?.urgency) newErrors.urgency = 'Urgency level is required';
    if (!formData?.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const generateRequestId = () => {
    const timestamp = Date.now()?.toString()?.slice(-6);
    const random = Math.random()?.toString(36)?.substring(2, 6)?.toUpperCase();
    return `CR${timestamp}${random}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Real API call
      const response = await apiService.clientRequests.create(formData);

      // Generate request ID from response or fallback
      const newRequestId = response.id ? `CR${response.id}` : generateRequestId();
      setRequestId(newRequestId);

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        clientType: '',
        companyName: '',
        contactPerson: '',
        mobile: '',
        email: '',
        city: '',
        state: '',
        pincode: '',
        projectName: '',
        projectType: '',
        workerCount: '',
        requiredSkills: [],
        duration: '',
        budget: '',
        projectDescription: '',
        projectLocation: '',
        contactMethod: '',
        urgency: '',
        contactTime: '',
        alternatePhone: '',
        specialRequirements: '',
        receiveUpdates: false,
        agreeTerms: false
      });

    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (show error message)
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData?.clientType &&
      formData?.companyName?.trim() &&
      formData?.contactPerson?.trim() &&
      formData?.mobile?.trim() &&
      formData?.email?.trim() &&
      formData?.city?.trim() &&
      formData?.state &&
      formData?.pincode?.trim() &&
      formData?.projectName?.trim() &&
      formData?.projectType &&
      formData?.workerCount &&
      formData?.requiredSkills?.length > 0 &&
      formData?.duration &&
      formData?.budget &&
      formData?.projectDescription?.trim() &&
      formData?.projectLocation?.trim() &&
      formData?.contactMethod &&
      formData?.urgency &&
      formData?.agreeTerms;
  };

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background">
        <ContextualNavigation />

        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbTrail />

            <FormHeader />

            <form onSubmit={(e) => e?.preventDefault()} className="space-y-8">
              <CompanyDetailsSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />

              <ProjectRequirementsSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />

              <ContactPreferencesSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />

              <SubmitSection
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isValid={isFormValid()}
              />
            </form>
          </div>
        </main>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          requestId={requestId}
        />
      </div>
    </NavigationProvider>
  );
};

export default ClientRequestForm;