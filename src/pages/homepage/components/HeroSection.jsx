import React from 'react';

import { useNavigation } from '../../../components/ui/ContextualNavigation';

import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const { language } = useNavigation();

  const heroContent = {
    en: {
      title: "Empowering India\'s Workforce",
      subtitle: "Shram Siddhi",
      description: "Connecting unorganized sector workers with employment opportunities through digital transformation and comprehensive workforce management.",
      vision: "Our Vision",
      visionText: "To digitize India's unorganized labor sector by providing workers with self-enrollment capabilities, employers with worker access, and administrators with comprehensive workforce management tools.",
      mission: "Our Mission",
      missionText: "Creating stability and organization in informal employment markets through technology-driven solutions that empower workers and streamline hiring processes."
    },
    hi: {
      title: "भारत की श्रमशक्ति को सशक्त बनाना",
      subtitle: "श्रम सिद्धि",
      description: "डिजिटल परिवर्तन और व्यापक कार्यबल प्रबंधन के माध्यम से असंगठित क्षेत्र के श्रमिकों को रोजगार के अवसरों से जोड़ना।",
      vision: "हमारा दृष्टिकोण",
      visionText: "भारत के असंगठित श्रम क्षेत्र को डिजिटल बनाना, श्रमिकों को स्व-पंजीकरण क्षमताएं प्रदान करना, नियोक्ताओं को श्रमिक पहुंच और प्रशासकों को व्यापक कार्यबल प्रबंधन उपकरण प्रदान करना।",
      mission: "हमारा मिशन",
      missionText: "प्रौद्योगिकी-संचालित समाधानों के माध्यम से अनौपचारिक रोजगार बाजारों में स्थिरता और संगठन बनाना जो श्रमिकों को सशक्त बनाता है और भर्ती प्रक्रियाओं को सुव्यवस्थित करता है।"
    }
  };

  const content = heroContent?.[language];

  return (
    <section className="relative bg-gradient-to-br from-surface via-background to-muted py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-secondary"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-accent"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* Logo and Brand */}
          <div className="flex justify-center items-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-neumorphic-lg mr-4">
              <Icon name="Zap" size={40} color="white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                {content?.subtitle}
              </h1>
              <p className="text-lg font-caption text-muted-foreground">
                {content?.title}
              </p>
            </div>
          </div>

          {/* Main Description */}
          <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            {content?.description}
          </p>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-neumorphic-lg hover:shadow-neumorphic-md transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                <Icon name="Eye" size={24} color="white" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-foreground">
                {content?.vision}
              </h3>
            </div>
            <p className="text-foreground leading-relaxed">
              {content?.visionText}
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-surface rounded-2xl p-8 shadow-neumorphic-lg hover:shadow-neumorphic-md transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mr-4">
                <Icon name="Target" size={24} color="white" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-foreground">
                {content?.mission}
              </h3>
            </div>
            <p className="text-foreground leading-relaxed">
              {content?.missionText}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500M+", label: language === 'hi' ? 'असंगठित श्रमिक' : 'Unorganized Workers' },
            { number: "93%", label: language === 'hi' ? 'अनौपचारिक रोजगार' : 'Informal Employment' },
            { number: "45%", label: language === 'hi' ? 'GDP योगदान' : 'GDP Contribution' },
            { number: "24/7", label: language === 'hi' ? 'प्लेटफॉर्म सहायता' : 'Platform Support' }
          ]?.map((stat, index) => (
            <div key={index} className="text-center bg-surface rounded-xl p-6 shadow-neumorphic">
              <div className="text-3xl font-heading font-bold text-primary mb-2">
                {stat?.number}
              </div>
              <div className="text-sm font-caption text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;