import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  const { language } = useNavigation();

  const aboutContent = {
    en: {
      title: "About Shram Siddhi",
      subtitle: "Transforming India\'s Labor Landscape",
      description: "Shram Siddhi is a revolutionary labor-tech platform designed to bridge the gap between India's vast unorganized workforce and employment opportunities. Our comprehensive digital solution empowers workers, streamlines hiring processes, and creates sustainable employment ecosystems.",
      objectives: [
        {
          icon: "Users",
          title: "Worker Empowerment",
          description: "Providing digital identity and skill recognition to unorganized sector workers through comprehensive enrollment and profile management."
        },
        {
          icon: "Building2",
          title: "Employer Connection",
          description: "Connecting employers with verified, skilled workers through our intelligent matching system and comprehensive worker database."
        },
        {
          icon: "BarChart3",
          title: "Data-Driven Insights",
          description: "Leveraging analytics and reporting to understand labor market trends and optimize workforce allocation across industries."
        },
        {
          icon: "Shield",
          title: "Trust & Security",
          description: "Ensuring secure transactions, verified identities, and transparent processes through Aadhaar integration and robust authentication."
        }
      ],
      impact: "Our Impact",
      impactDescription: "Since our inception, we've been committed to creating meaningful change in India's labor sector through technology-driven solutions that benefit all stakeholders."
    },
    hi: {
      title: "श्रम सिद्धि के बारे में",
      subtitle: "भारत के श्रम परिदृश्य को बदलना",
      description: "श्रम सिद्धि एक क्रांतिकारी श्रम-तकनीक मंच है जो भारत की विशाल असंगठित कार्यबल और रोजगार के अवसरों के बीच की खाई को पाटने के लिए डिज़ाइन किया गया है। हमारा व्यापक डिजिटल समाधान श्रमिकों को सशक्त बनाता है, भर्ती प्रक्रियाओं को सुव्यवस्थित करता है, और टिकाऊ रोजगार पारिस्थितिकी तंत्र बनाता है।",
      objectives: [
        {
          icon: "Users",
          title: "श्रमिक सशक्तिकरण",
          description: "व्यापक नामांकन और प्रोफ़ाइल प्रबंधन के माध्यम से असंगठित क्षेत्र के श्रमिकों को डिजिटल पहचान और कौशल मान्यता प्रदान करना।"
        },
        {
          icon: "Building2",
          title: "नियोक्ता कनेक्शन",
          description: "हमारे बुद्धिमान मैचिंग सिस्टम और व्यापक श्रमिक डेटाबेस के माध्यम से नियोक्ताओं को सत्यापित, कुशल श्रमिकों से जोड़ना।"
        },
        {
          icon: "BarChart3",
          title: "डेटा-संचालित अंतर्दृष्टि",
          description: "श्रम बाजार के रुझानों को समझने और उद्योगों में कार्यबल आवंटन को अनुकूलित करने के लिए विश्लेषण और रिपोर्टिंग का लाभ उठाना।"
        },
        {
          icon: "Shield",
          title: "विश्वास और सुरक्षा",
          description: "आधार एकीकरण और मजबूत प्रमाणीकरण के माध्यम से सुरक्षित लेनदेन, सत्यापित पहचान और पारदर्शी प्रक्रियाओं को सुनिश्चित करना।"
        }
      ],
      impact: "हमारा प्रभाव",
      impactDescription: "अपनी स्थापना के बाद से, हम प्रौद्योगिकी-संचालित समाधानों के माध्यम से भारत के श्रम क्षेत्र में सार्थक परिवर्तन लाने के लिए प्रतिबद्ध हैं जो सभी हितधारकों को लाभान्वित करते हैं।"
    }
  };

  const content = aboutContent?.[language];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {content?.title}
          </h2>
          <p className="text-xl font-caption text-primary mb-6">
            {content?.subtitle}
          </p>
          <p className="text-lg text-foreground max-w-4xl mx-auto leading-relaxed">
            {content?.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-surface rounded-3xl p-8 shadow-neumorphic-lg">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Workers collaborating on construction site"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-neumorphic-lg">
                <Icon name="TrendingUp" size={32} color="white" />
              </div>
            </div>
          </div>

          {/* Objectives Grid */}
          <div className="space-y-6">
            {content?.objectives?.map((objective, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl p-6 shadow-neumorphic hover:shadow-neumorphic-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={objective?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      {objective?.title}
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      {objective?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center shadow-neumorphic-lg">
          <h3 className="text-3xl font-heading font-bold text-white mb-4">
            {content?.impact}
          </h3>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
            {content?.impactDescription}
          </p>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: language === 'hi' ? 'पंजीकृत श्रमिक' : 'Registered Workers' },
              { number: "500+", label: language === 'hi' ? 'सक्रिय नियोक्ता' : 'Active Employers' },
              { number: "15+", label: language === 'hi' ? 'कौशल श्रेणियां' : 'Skill Categories' },
              { number: "25+", label: language === 'hi' ? 'शहर कवर' : 'Cities Covered' }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-heading font-bold text-white mb-2">
                  {stat?.number}
                </div>
                <div className="text-sm font-caption text-white opacity-80">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;