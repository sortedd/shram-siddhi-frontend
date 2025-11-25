import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const { language } = useNavigation();

  const ctaContent = {
    en: {
      title: "Get Started Today",
      subtitle: "Choose Your Path to Success",
      description: "Join thousands of workers and employers who are already benefiting from our platform. Take the first step towards a more organized and efficient workforce ecosystem.",
      actions: [
        {
          title: "Enroll as Worker",
          description: "Register yourself as a skilled worker and connect with employment opportunities in your area.",
          icon: "UserPlus",
          link: "/worker-enrollment-form",
          variant: "default",
          benefits: [
            "Digital identity creation",
            "Skill verification",
            "Job matching",
            "Secure profile management"
          ]
        },
        {
          title: "Request Workers",
          description: "Find and hire verified skilled workers for your projects through our comprehensive database.",
          icon: "Search",
          link: "/client-request-form",
          variant: "outline",
          benefits: [
            "Access to verified workers",
            "Skill-based matching",
            "Project management",
            "Secure hiring process"
          ]
        },
        {
          title: "Become a Franchise",
          description: "Partner with us to expand our network and create employment opportunities in your region.",
          icon: "Building2",
          link: "/client-request-form",
          variant: "secondary",
          benefits: [
            "Business opportunity",
            "Local network expansion",
            "Revenue sharing",
            "Training & support"
          ]
        }
      ],
      trustSignals: {
        title: "Trusted by Thousands",
        stats: [
          { number: "10,000+", label: "Active Workers" },
          { number: "500+", label: "Employers" },
          { number: "25+", label: "Cities" },
          { number: "99%", label: "Success Rate" }
        ]
      }
    },
    hi: {
      title: "आज ही शुरुआत करें",
      subtitle: "सफलता के लिए अपना रास्ता चुनें",
      description: "हजारों श्रमिकों और नियोक्ताओं में शामिल हों जो पहले से ही हमारे प्लेटफॉर्म से लाभ उठा रहे हैं। अधिक संगठित और कुशल कार्यबल पारिस्थितिकी तंत्र की दिशा में पहला कदम उठाएं।",
      actions: [
        {
          title: "श्रमिक के रूप में नामांकन",
          description: "अपने आप को एक कुशल श्रमिक के रूप में पंजीकृत करें और अपने क्षेत्र में रोजगार के अवसरों से जुड़ें।",
          icon: "UserPlus",
          link: "/worker-enrollment-form",
          variant: "default",
          benefits: [
            "डिजिटल पहचान निर्माण",
            "कौशल सत्यापन",
            "नौकरी मैचिंग",
            "सुरक्षित प्रोफ़ाइल प्रबंधन"
          ]
        },
        {
          title: "श्रमिकों का अनुरोध",
          description: "हमारे व्यापक डेटाबेस के माध्यम से अपनी परियोजनाओं के लिए सत्यापित कुशल श्रमिकों को खोजें और किराए पर लें।",
          icon: "Search",
          link: "/client-request-form",
          variant: "outline",
          benefits: [
            "सत्यापित श्रमिकों तक पहुंच",
            "कौशल-आधारित मैचिंग",
            "परियोजना प्रबंधन",
            "सुरक्षित भर्ती प्रक्रिया"
          ]
        },
        {
          title: "फ्रेंचाइजी बनें",
          description: "हमारे नेटवर्क का विस्तार करने और अपने क्षेत्र में रोजगार के अवसर बनाने के लिए हमारे साथ साझेदारी करें।",
          icon: "Building2",
          link: "/client-request-form",
          variant: "secondary",
          benefits: [
            "व्यावसायिक अवसर",
            "स्थानीय नेटवर्क विस्तार",
            "राजस्व साझाकरण",
            "प्रशिक्षण और सहायता"
          ]
        }
      ],
      trustSignals: {
        title: "हजारों द्वारा भरोसेमंद",
        stats: [
          { number: "10,000+", label: "सक्रिय श्रमिक" },
          { number: "500+", label: "नियोक्ता" },
          { number: "25+", label: "शहर" },
          { number: "99%", label: "सफलता दर" }
        ]
      }
    }
  };

  const content = ctaContent?.[language];

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

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {content?.actions?.map((action, index) => (
            <div
              key={index}
              className="bg-surface rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-md transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={action?.icon} size={32} color="white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
                  {action?.title}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {action?.description}
                </p>
              </div>

              {/* Benefits List */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {action?.benefits?.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link to={action?.link} className="block">
                <Button
                  variant={action?.variant}
                  fullWidth
                  className="touch-target group-hover:scale-105 transition-transform duration-300"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {action?.title}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="bg-gradient-to-r from-surface to-muted rounded-3xl p-12 shadow-neumorphic-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
              {content?.trustSignals?.title}
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content?.trustSignals?.stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-primary mb-2">
                  {stat?.number}
                </div>
                <div className="text-sm font-caption text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Trust Elements */}
          <div className="flex justify-center items-center space-x-8 mt-12 pt-8 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                {language === 'hi' ? 'आधार सत्यापित' : 'Aadhaar Verified'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                {language === 'hi' ? 'सुरक्षित डेटा' : 'Secure Data'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                {language === 'hi' ? '24/7 सहायता' : '24/7 Support'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;