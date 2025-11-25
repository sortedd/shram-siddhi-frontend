import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang) {
      setLanguage(storedLang);
    }

    // Listen for language changes
    const handleStorageChange = () => {
      const newLang = localStorage.getItem('preferred-language');
      if (newLang) setLanguage(newLang);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const slides = [
    {
      id: 'cover',
      title: language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi',
      subtitle: language === 'hi' ? 'श्रमिक सशक्तिकरण मंच' : 'Worker Empowerment Platform',
      content: language === 'hi'
        ? 'भारत के श्रमिकों को डिजिटल रूप से सशक्त बनाना'
        : 'Digitally Empowering India\'s Workforce'
    },
    {
      id: 'problem',
      title: language === 'hi' ? 'समस्या' : 'The Problem',
      subtitle: language === 'hi' ? 'भारत में श्रमिक चुनौतियां' : 'Worker Challenges in India',
      stats: [
        {
          number: '500M+',
          label: language === 'hi' ? 'असंगठित श्रमिक' : 'Unorganized Workers',
          description: language === 'hi' ? 'भारत में असंगठित क्षेत्र के श्रमिक' : 'Workers in India\'s unorganized sector'
        },
        {
          number: '70%',
          label: language === 'hi' ? 'डिजिटल पहुंच की कमी' : 'Lack Digital Access',
          description: language === 'hi' ? 'श्रमिकों के पास डिजिटल प्लेटफॉर्म तक पहुंच नहीं' : 'Workers lack access to digital platforms'
        },
        {
          number: '₹2.5L Cr',
          label: language === 'hi' ? 'वार्षिक बाजार' : 'Annual Market Size',
          description: language === 'hi' ? 'भारत का श्रमिक सेवा बाजार' : 'India\'s labor services market'
        }
      ]
    },
    {
      id: 'solution',
      title: language === 'hi' ? 'समाधान' : 'Our Solution',
      subtitle: language === 'hi' ? 'श्रम सिद्धि प्लेटफॉर्म' : 'Shram Siddhi Platform',
      features: [
        {
          icon: 'UserPlus',
          title: language === 'hi' ? 'डिजिटल पंजीकरण' : 'Digital Registration',
          description: language === 'hi' ? 'आसान ऑनलाइन श्रमिक पंजीकरण' : 'Easy online worker registration'
        },
        {
          icon: 'Search',
          title: language === 'hi' ? 'स्मार्ट मैचिंग' : 'Smart Matching',
          description: language === 'hi' ? 'AI-आधारित कौशल मैचिंग' : 'AI-powered skill matching'
        },
        {
          icon: 'Shield',
          title: language === 'hi' ? 'सत्यापन प्रणाली' : 'Verification System',
          description: language === 'hi' ? 'आधार-आधारित पहचान सत्यापन' : 'Aadhaar-based identity verification'
        },
        {
          icon: 'CreditCard',
          title: language === 'hi' ? 'डिजिटल भुगतान' : 'Digital Payments',
          description: language === 'hi' ? 'सुरक्षित ऑनलाइन लेनदेन' : 'Secure online transactions'
        }
      ]
    },
    {
      id: 'market',
      title: language === 'hi' ? 'बाजार अवसर' : 'Market Opportunity',
      subtitle: language === 'hi' ? 'विशाल बाजार क्षमता' : 'Massive Market Potential',
      marketData: [
        {
          segment: language === 'hi' ? 'निर्माण श्रमिक' : 'Construction Workers',
          size: '50M+',
          growth: '+15%',
          revenue: '₹80,000 Cr'
        },
        {
          segment: language === 'hi' ? 'घरेलू सेवाएं' : 'Domestic Services',
          size: '20M+',
          growth: '+25%',
          revenue: '₹45,000 Cr'
        },
        {
          segment: language === 'hi' ? 'तकनीकी सेवाएं' : 'Technical Services',
          size: '15M+',
          growth: '+30%',
          revenue: '₹60,000 Cr'
        }
      ]
    },
    {
      id: 'business-model',
      title: language === 'hi' ? 'व्यापारिक मॉडल' : 'Business Model',
      subtitle: language === 'hi' ? 'राजस्व धाराएं' : 'Revenue Streams',
      revenueStreams: [
        {
          stream: language === 'hi' ? 'कमीशन फीस' : 'Commission Fees',
          percentage: '3-5%',
          description: language === 'hi' ? 'प्रत्येक लेनदेन पर कमीशन' : 'Commission on each transaction'
        },
        {
          stream: language === 'hi' ? 'प्रीमियम सदस्यता' : 'Premium Subscriptions',
          percentage: '₹299/month',
          description: language === 'hi' ? 'श्रमिकों के लिए प्रीमियम सुविधाएं' : 'Premium features for workers'
        },
        {
          stream: language === 'hi' ? 'विज्ञापन राजस्व' : 'Advertisement Revenue',
          percentage: '₹50/click',
          description: language === 'hi' ? 'टूल्स और सामग्री विज्ञापन' : 'Tools and materials advertising'
        },
        {
          stream: language === 'hi' ? 'डेटा एनालिटिक्स' : 'Data Analytics',
          percentage: '₹5L/report',
          description: language === 'hi' ? 'श्रम बाजार अंतर्दृष्टि रिपोर्ट' : 'Labor market insights reports'
        }
      ]
    },
    {
      id: 'technology',
      title: language === 'hi' ? 'तकनीकी स्टैक' : 'Technology Stack',
      subtitle: language === 'hi' ? 'आधुनिक और स्केलेबल' : 'Modern & Scalable',
      techStack: [
        {
          category: 'Frontend',
          technologies: ['React.js', 'Tailwind CSS', 'PWA'],
          icon: 'Monitor'
        },
        {
          category: 'Backend',
          technologies: ['Node.js', 'Express.js', 'SQLite/PostgreSQL'],
          icon: 'Server'
        },
        {
          category: 'Mobile',
          technologies: ['React Native', 'Offline Support'],
          icon: 'Smartphone'
        },
        {
          category: 'AI/ML',
          technologies: ['TensorFlow', 'Skill Matching', 'Demand Prediction'],
          icon: 'Brain'
        }
      ]
    },
    {
      id: 'traction',
      title: language === 'hi' ? 'प्रगति' : 'Traction',
      subtitle: language === 'hi' ? 'हमारी उपलब्धियां' : 'Our Achievements',
      milestones: [
        {
          metric: language === 'hi' ? 'पंजीकृत श्रमिक' : 'Registered Workers',
          value: '10,000+',
          growth: '+150% MoM',
          icon: 'Users'
        },
        {
          metric: language === 'hi' ? 'पूर्ण परियोजनाएं' : 'Completed Projects',
          value: '2,500+',
          growth: '+200% MoM',
          icon: 'CheckCircle'
        },
        {
          metric: language === 'hi' ? 'मासिक राजस्व' : 'Monthly Revenue',
          value: '₹15L',
          growth: '+180% MoM',
          icon: 'TrendingUp'
        },
        {
          metric: language === 'hi' ? 'शहरों में उपस्थिति' : 'Cities Covered',
          value: '25',
          growth: '+5 cities/month',
          icon: 'MapPin'
        }
      ]
    },
    {
      id: 'competition',
      title: language === 'hi' ? 'प्रतिस्पर्धा विश्लेषण' : 'Competitive Analysis',
      subtitle: language === 'hi' ? 'हमारा अंतर' : 'Our Differentiation',
      competitors: [
        {
          name: 'Urban Company',
          strength: language === 'hi' ? 'ब्रांड पहचान' : 'Brand Recognition',
          weakness: language === 'hi' ? 'महंगी सेवाएं' : 'Expensive Services',
          ourAdvantage: language === 'hi' ? 'किफायती मूल्य' : 'Affordable Pricing'
        },
        {
          name: 'TaskRabbit',
          strength: language === 'hi' ? 'अंतर्राष्ट्रीय उपस्थिति' : 'International Presence',
          weakness: language === 'hi' ? 'भारतीय बाजार समझ की कमी' : 'Limited Indian Market Understanding',
          ourAdvantage: language === 'hi' ? 'स्थानीय भाषा समर्थन' : 'Local Language Support'
        },
        {
          name: 'Local Contractors',
          strength: language === 'hi' ? 'व्यक्तिगत संबंध' : 'Personal Relationships',
          weakness: language === 'hi' ? 'डिजिटल उपस्थिति नहीं' : 'No Digital Presence',
          ourAdvantage: language === 'hi' ? 'डिजिटल प्लेटफॉर्म' : 'Digital Platform'
        }
      ]
    },
    {
      id: 'financials',
      title: language === 'hi' ? 'वित्तीय प्रक्षेपण' : 'Financial Projections',
      subtitle: language === 'hi' ? '5 साल का रोडमैप' : '5-Year Roadmap',
      projections: [
        {
          year: 'Year 1',
          revenue: '₹2 Cr',
          users: '50K',
          cities: '10',
          funding: 'Seed: ₹5 Cr'
        },
        {
          year: 'Year 2',
          revenue: '₹8 Cr',
          users: '200K',
          cities: '25',
          funding: 'Series A: ₹25 Cr'
        },
        {
          year: 'Year 3',
          revenue: '₹25 Cr',
          users: '500K',
          cities: '50',
          funding: 'Series B: ₹75 Cr'
        },
        {
          year: 'Year 4',
          revenue: '₹60 Cr',
          users: '1M',
          cities: '100',
          funding: 'Series C: ₹150 Cr'
        },
        {
          year: 'Year 5',
          revenue: '₹150 Cr',
          users: '2.5M',
          cities: '200',
          funding: 'IPO Ready'
        }
      ]
    },
    {
      id: 'funding',
      title: language === 'hi' ? 'फंडिंग आवश्यकता' : 'Funding Requirements',
      subtitle: language === 'hi' ? 'निवेश का उपयोग' : 'Use of Investment',
      fundingBreakdown: [
        {
          category: language === 'hi' ? 'तकनीकी विकास' : 'Technology Development',
          percentage: '40%',
          amount: '₹2 Cr',
          description: language === 'hi' ? 'AI/ML, मोबाइल ऐप, स्केलिंग' : 'AI/ML, Mobile App, Scaling'
        },
        {
          category: language === 'hi' ? 'मार्केटिंग और अधिग्रहण' : 'Marketing & Acquisition',
          percentage: '30%',
          amount: '₹1.5 Cr',
          description: language === 'hi' ? 'उपयोगकर्ता अधिग्रहण, ब्रांडिंग' : 'User acquisition, Branding'
        },
        {
          category: language === 'hi' ? 'टीम विस्तार' : 'Team Expansion',
          percentage: '20%',
          amount: '₹1 Cr',
          description: language === 'hi' ? 'इंजीनियरिंग, सेल्स, ऑपरेशन्स' : 'Engineering, Sales, Operations'
        },
        {
          category: language === 'hi' ? 'कार्यशील पूंजी' : 'Working Capital',
          percentage: '10%',
          amount: '₹50L',
          description: language === 'hi' ? 'ऑपरेशनल खर्च, आकस्मिकता' : 'Operational expenses, Contingency'
        }
      ]
    },
    {
      id: 'roadmap',
      title: language === 'hi' ? 'भविष्य की योजना' : 'Future Roadmap',
      subtitle: language === 'hi' ? 'आगे का रास्ता' : 'The Path Ahead',
      roadmapItems: [
        {
          phase: 'Q1 2025',
          title: language === 'hi' ? 'मोबाइल ऐप लॉन्च' : 'Mobile App Launch',
          description: language === 'hi' ? 'iOS और Android ऐप्स' : 'iOS and Android apps'
        },
        {
          phase: 'Q2 2025',
          title: language === 'hi' ? 'AI मैचिंग इंजन' : 'AI Matching Engine',
          description: language === 'hi' ? 'स्मार्ट स्किल मैचिंग' : 'Smart skill matching'
        },
        {
          phase: 'Q3 2025',
          title: language === 'hi' ? '10 नए शहर' : '10 New Cities',
          description: language === 'hi' ? 'भौगोलिक विस्तार' : 'Geographic expansion'
        },
        {
          phase: 'Q4 2025',
          title: language === 'hi' ? 'फिनटेक इंटीग्रेशन' : 'Fintech Integration',
          description: language === 'hi' ? 'लोन और बीमा सेवाएं' : 'Loan and insurance services'
        }
      ]
    },
    {
      id: 'ask',
      title: language === 'hi' ? 'निवेश प्रस्ताव' : 'Investment Ask',
      subtitle: language === 'hi' ? 'हमारे साथ जुड़ें' : 'Join Our Journey',
      investmentDetails: {
        amount: '₹5 Crores',
        equity: '15%',
        valuation: '₹33 Crores',
        useOfFunds: language === 'hi' ? 'तकनीकी विकास और बाजार विस्तार' : 'Technology development and market expansion',
        timeline: language === 'hi' ? '18 महीने का रनवे' : '18-month runway'
      }
    }
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault(); // Prevent scrolling for space
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const renderSlideContent = (slide) => {
    switch (slide.id) {
      case 'cover':
        return (
          <div className="text-center py-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-neumorphic-lg">
                <Icon name="Zap" size={48} color="white" />
              </div>
              <h1 className="text-6xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h1>
              <p className="text-2xl text-primary font-medium mb-6">
                {slide.subtitle}
              </p>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {slide.content}
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Button size="lg" className="px-8" onClick={nextSlide}>
                <Icon name="Play" size={20} />
                <span className="ml-2">
                  {language === 'hi' ? 'प्रेजेंटेशन शुरू करें' : 'Start Presentation'}
                </span>
              </Button>
            </motion.div>
          </div>
        );

      case 'problem':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic-lg p-8 text-center"
                >
                  <div className="text-4xl font-bold text-error mb-4">{stat.number}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{stat.label}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {slide.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="space-y-6">
              {slide.marketData.map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {market.segment}
                      </h3>
                      <div className="flex items-center space-x-6 text-muted-foreground">
                        <span>Market Size: {market.size}</span>
                        <span>Growth: {market.growth}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success">{market.revenue}</div>
                      <div className="text-sm text-muted-foreground">Annual Revenue</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'business-model':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.revenueStreams.map((stream, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {stream.stream}
                    </h3>
                    <div className="text-xl font-bold text-primary">
                      {stream.percentage}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {stream.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slide.techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6 text-center"
                >
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={tech.icon} size={32} color="white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {tech.category}
                  </h3>
                  <div className="space-y-1">
                    {tech.technologies.map((technology, techIndex) => (
                      <div key={techIndex} className="text-sm text-muted-foreground">
                        {technology}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'traction':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slide.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6 text-center"
                >
                  <div className="w-16 h-16 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={milestone.icon} size={32} color="white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {milestone.value}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {milestone.metric}
                  </h3>
                  <div className="text-xs text-success font-medium">
                    {milestone.growth}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'competition':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.competitors.map((competitor, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">{competitor.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Strength</div>
                      <div className="font-medium text-success">{competitor.strength}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Weakness</div>
                      <div className="font-medium text-error">{competitor.weakness}</div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-xs text-primary font-bold mb-1">Our Advantage</div>
                      <div className="font-medium text-primary">{competitor.ourAdvantage}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'financials':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="overflow-x-auto">
              <motion.table
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-card rounded-lg shadow-neumorphic"
              >
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Year</th>
                    <th className="text-left p-4 font-semibold text-foreground">Revenue</th>
                    <th className="text-left p-4 font-semibold text-foreground">Users</th>
                    <th className="text-left p-4 font-semibold text-foreground">Cities</th>
                    <th className="text-left p-4 font-semibold text-foreground">Funding</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.projections.map((projection, index) => (
                    <motion.tr
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="p-4 font-medium text-foreground">{projection.year}</td>
                      <td className="p-4 text-success font-semibold">{projection.revenue}</td>
                      <td className="p-4 text-muted-foreground">{projection.users}</td>
                      <td className="p-4 text-muted-foreground">{projection.cities}</td>
                      <td className="p-4 text-primary font-medium">{projection.funding}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          </div>
        );

      case 'funding':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.fundingBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.category}
                    </h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{item.percentage}</div>
                      <div className="text-sm text-muted-foreground">{item.amount}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {slide.roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-neumorphic p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {item.phase}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'ask':
        return (
          <div className="py-20 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2 className="text-4xl font-heading font-bold text-foreground mb-8">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                {slide.subtitle}
              </p>

              <div className="bg-card rounded-lg shadow-neumorphic-lg p-12 max-w-2xl mx-auto">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {slide.investmentDetails.amount}
                    </div>
                    <div className="text-muted-foreground">
                      {language === 'hi' ? 'निवेश राशि' : 'Investment Amount'}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-success mb-2">
                      {slide.investmentDetails.equity}
                    </div>
                    <div className="text-muted-foreground">
                      {language === 'hi' ? 'इक्विटी' : 'Equity'}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="text-2xl font-semibold text-foreground mb-2">
                    {language === 'hi' ? 'वैल्यूएशन:' : 'Valuation:'} {slide.investmentDetails.valuation}
                  </div>
                  <p className="text-muted-foreground">
                    {slide.investmentDetails.useOfFunds}
                  </p>
                </div>

                <Button size="lg" className="px-12">
                  <Icon name="Mail" size={20} />
                  <span className="ml-2">
                    {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <div className="py-12">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pt-16 pb-20 h-screen flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute top-0 left-0 w-full h-full overflow-y-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl mx-auto min-h-full flex items-center justify-center">
                <div className="w-full py-8">
                  {renderSlideContent(slides[currentSlide])}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-4 rounded-full shadow-lg backdrop-blur-md transition-colors ${currentSlide === 0
                  ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                  : 'bg-surface/80 text-primary hover:bg-surface border border-primary/20'
                }`}
            >
              <Icon name="ChevronLeft" size={24} />
            </motion.button>

            {/* Progress Indicator */}
            <div className="flex flex-col items-center space-y-2 bg-surface/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30 hover:bg-primary/50'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                {language === 'hi' ? 'स्लाइड' : 'Slide'} {currentSlide + 1} / {slides.length}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
            >
              <Icon name={currentSlide === slides.length - 1 ? "Check" : "ChevronRight"} size={24} />
            </motion.button>
          </div>
        </div>

        {/* Keyboard Hint */}
        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            {language === 'hi' ? 'नेविगेट करने के लिए कीबोर्ड का उपयोग करें' : 'Use Keyboard Arrows to Navigate'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;