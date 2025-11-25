import React from 'react';
import { useNavigation } from './ContextualNavigation';
import Button from './Button';
import Icon from '../AppIcon';

const LanguageToggle = ({ className = '', showLabel = true, size = 'sm' }) => {
  const { language, setLanguage } = useNavigation();

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleLanguageToggle}
      className={`flex items-center space-x-2 touch-target ${className}`}
      title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <Icon name="Globe" size={size === 'sm' ? 16 : 20} />
      {showLabel && (
        <span className="text-xs font-medium">
          {language === 'hi' ? 'EN' : 'हि'}
        </span>
      )}
    </Button>
  );
};

export default LanguageToggle;