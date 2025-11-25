import React from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';

const RoadmapSection = () => {
  const { language } = useNavigation();

  const roadmapContent = {
    en: {
      title: "Future Roadmap",
      subtitle: "Upcoming Features & Innovations",
      description: "Our commitment to continuous innovation drives us to expand platform capabilities and enhance user experience across all touchpoints.",
      features: [
        {
          icon: "Store",
          title: "Franchise Login",
          description: "Dedicated portal for franchise partners to manage local operations and worker networks.",
          status: "Q1 2025",
          category: "Business"
        },
        {
          icon: "Cloud",
          title: "Agent SaaS",
          description: "Software-as-a-Service platform for recruitment agents to streamline worker placement.",
          status: "Q2 2025",
          category: "Technology"
        },
        {
          icon: "QrCode",
          title: "Worker QR Codes",
          description: "Unique QR codes for instant worker verification and profile access.",
          status: "Q1 2025",
          category: "Identity"
        },
        {
          icon: "CreditCard",
          title: "Payroll Management",
          description: "Integrated payroll system for automated salary processing and tax compliance.",
          status: "Q3 2025",
          category: "Finance"
        },
        {
          icon: "Clock",
          title: "Attendance Tracking",
          description: "Real-time attendance monitoring with GPS verification and reporting.",
          status: "Q2 2025",
          category: "Operations"
        },
        {
          icon: "Building",
          title: "Client Portal",
          description: "Comprehensive dashboard for clients to manage projects and worker assignments.",
          status: "Q3 2025",
          category: "Business"
        },
        {
          icon: "GraduationCap",
          title: "Training Programs",
          description: "Skill development courses and certification programs for worker upskilling.",
          status: "Q4 2025",
          category: "Education"
        },
        {
          icon: "Star",
          title: "Rating System",
          description: "Mutual rating system for workers and employers to build trust and quality.",
          status: "Q2 2025",
          category: "Quality"
        },
        {
          icon: "Wallet",
          title: "Payment Gateway",
          description: "Secure payment processing with multiple payment options and escrow services.",
          status: "Q3 2025",
          category: "Finance"
        },
        {
          icon: "Globe",
          title: "Multilingual Support",
          description: "Extended language support including Bengali, Marathi, Tamil, and more regional languages.",
          status: "Q4 2025",
          category: "Accessibility"
        }
      ]
    },
    hi: {
      title: "भविष्य की रोडमैप",
      subtitle: "आगामी सुविधाएं और नवाचार",
      description: "निरंतर नवाचार के प्रति हमारी प्रतिबद्धता हमें प्लेटफॉर्म क्षमताओं का विस्तार करने और सभी टचपॉइंट्स पर उपयोगकर्ता अनुभव को बढ़ाने के लिए प्रेरित करती है।",
      features: [
        {
          icon: "Store",
          title: "फ्रेंचाइजी लॉगिन",
          description: "स्थानीय संचालन और श्रमिक नेटवर्क प्रबंधन के लिए फ्रेंचाइजी भागीदारों के लिए समर्पित पोर्टल।",
          status: "Q1 2025",
          category: "व्यवसाय"
        },
        {
          icon: "Cloud",
          title: "एजेंट SaaS",
          description: "भर्ती एजेंटों के लिए श्रमिक प्लेसमेंट को सुव्यवस्थित करने के लिए सॉफ्टवेयर-ए-सर्विस प्लेटफॉर्म।",
          status: "Q2 2025",
          category: "प्रौद्योगिकी"
        },
        {
          icon: "QrCode",
          title: "श्रमिक QR कोड",
          description: "तत्काल श्रमिक सत्यापन और प्रोफ़ाइल पहुंच के लिए अद्वितीय QR कोड।",
          status: "Q1 2025",
          category: "पहचान"
        },
        {
          icon: "CreditCard",
          title: "पेरोल प्रबंधन",
          description: "स्वचालित वेतन प्रसंस्करण और कर अनुपालन के लिए एकीकृत पेरोल सिस्टम।",
          status: "Q3 2025",
          category: "वित्त"
        },
        {
          icon: "Clock",
          title: "उपस्थिति ट्रैकिंग",
          description: "GPS सत्यापन और रिपोर्टिंग के साथ वास्तविक समय उपस्थिति निगरानी।",
          status: "Q2 2025",
          category: "संचालन"
        },
        {
          icon: "Building",
          title: "क्लाइंट पोर्टल",
          description: "परियोजनाओं और श्रमिक असाइनमेंट प्रबंधन के लिए ग्राहकों के लिए व्यापक डैशबोर्ड।",
          status: "Q3 2025",
          category: "व्यवसाय"
        },
        {
          icon: "GraduationCap",
          title: "प्रशिक्षण कार्यक्रम",
          description: "श्रमिक कौशल विकास के लिए कौशल विकास पाठ्यक्रम और प्रमाणन कार्यक्रम।",
          status: "Q4 2025",
          category: "शिक्षा"
        },
        {
          icon: "Star",
          title: "रेटिंग सिस्टम",
          description: "विश्वास और गुणवत्ता निर्माण के लिए श्रमिकों और नियोक्ताओं के लिए पारस्परिक रेटिंग सिस्टम।",
          status: "Q2 2025",
          category: "गुणवत्ता"
        },
        {
          icon: "Wallet",
          title: "पेमेंट गेटवे",
          description: "कई भुगतान विकल्पों और एस्क्रो सेवाओं के साथ सुरक्षित भुगतान प्रसंस्करण।",
          status: "Q3 2025",
          category: "वित्त"
        },
        {
          icon: "Globe",
          title: "बहुभाषी समर्थन",
          description: "बंगाली, मराठी, तमिल और अधिक क्षेत्रीय भाषाओं सहित विस्तारित भाषा समर्थन।",
          status: "Q4 2025",
          category: "पहुंच"
        }
      ]
    }
  };

  const content = roadmapContent?.[language];

  const categoryColors = {
    'Business': 'bg-blue-500',
    'व्यवसाय': 'bg-blue-500',
    'Technology': 'bg-purple-500',
    'प्रौद्योगिकी': 'bg-purple-500',
    'Identity': 'bg-green-500',
    'पहचान': 'bg-green-500',
    'Finance': 'bg-yellow-500',
    'वित्त': 'bg-yellow-500',
    'Operations': 'bg-red-500',
    'संचालन': 'bg-red-500',
    'Education': 'bg-indigo-500',
    'शिक्षा': 'bg-indigo-500',
    'Quality': 'bg-pink-500',
    'गुणवत्ता': 'bg-pink-500',
    'Accessibility': 'bg-teal-500',
    'पहुंच': 'bg-teal-500'
  };

  return (
    <section className="py-20 px-4 bg-muted">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {content?.features?.map((feature, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-6 shadow-neumorphic hover:shadow-neumorphic-md transition-all duration-300 group"
            >
              {/* Feature Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={feature?.icon} size={24} color="white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${categoryColors?.[feature?.category]}`}>
                    {feature?.category}
                  </span>
                </div>
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {feature?.title}
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                {feature?.description}
              </p>

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-caption text-muted-foreground">
                  {language === 'hi' ? 'लक्षित रिलीज़' : 'Target Release'}
                </span>
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                  {feature?.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="bg-surface rounded-3xl p-8 shadow-neumorphic-lg">
          <h3 className="text-2xl font-heading font-semibold text-foreground mb-8 text-center">
            {language === 'hi' ? 'रिलीज़ टाइमलाइन 2025' : 'Release Timeline 2025'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']?.map((quarter, index) => {
              const quarterFeatures = content?.features?.filter(f => f?.status === quarter);
              return (
                <div key={quarter} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-heading font-bold">
                      Q{index + 1}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    {quarter}
                  </h4>
                  <div className="space-y-1">
                    {quarterFeatures?.map((feature, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        {feature?.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;