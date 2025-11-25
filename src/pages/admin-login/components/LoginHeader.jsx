import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const { language } = useNavigation();

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/homepage" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-neumorphic-md">
          <Icon name="Zap" size={28} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}
          </h1>
          <p className="text-sm font-caption text-muted-foreground">
            {language === 'hi' ? 'प्रबंधक पोर्टल' : 'Admin Portal'}
          </p>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {language === 'hi' ? 'स्वागत है' : 'Welcome Back'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'hi' ?'कृपया अपने खाते में लॉगिन करें' :'Please sign in to your account'
          }
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;