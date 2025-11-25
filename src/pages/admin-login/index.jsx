import React, { useEffect } from 'react';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import LanguageToggle from '../../components/ui/LanguageToggle';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityMessage from './components/SecurityMessage';
import BackToHome from './components/BackToHome';

const AdminLogin = () => {
  const { language, setLanguage } = useNavigation();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, [language, setLanguage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Card with Neumorphic Design */}
          <div className="bg-surface rounded-2xl p-8 shadow-neumorphic-lg border border-border">
            {/* Header Section */}
            <LoginHeader />

            {/* Login Form */}
            <LoginForm />

            {/* Security Message */}
            <SecurityMessage />

            {/* Back to Home Link */}
            <BackToHome />
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {language === 'hi' ?'केवल अधिकृत व्यवस्थापकों के लिए' :'For authorized administrators only'
              }
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date()?.getFullYear()} {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}. 
              {language === 'hi' ? ' सभी अधिकार सुरक्षित।' : ' All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;