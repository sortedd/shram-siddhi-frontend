import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  const { language } = useNavigation();

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-neumorphic-lg mb-6">
        <Icon name="FileText" size={32} color="white" />
      </div>
      
      <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
        {language === 'hi' ? 'क्लाइंट अनुरोध फॉर्म' : 'Client Request Form'}
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {language === 'hi' ?'अपनी परियोजना के लिए कुशल श्रमिकों का अनुरोध करें। हमारी टीम आपकी आवश्यकताओं के अनुसार सर्वोत्तम श्रमिक उपलब्ध कराएगी।' :'Request skilled workers for your project. Our team will connect you with the best workers based on your requirements.'
        }
      </p>
    </div>
  );
};

export default FormHeader;