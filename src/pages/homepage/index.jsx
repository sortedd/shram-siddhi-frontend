import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import Icon from '../../components/AppIcon';
import { apiService } from '../../services/api';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import LoadingScreen from '../../components/ui/LoadingScreen';

// CountUp Component for Stats
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Section animation
const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay
    }
  })
};

const Homepage = () => {
  const { language, setLanguage } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    verified: 0
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 1]); // keep visible

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) setLanguage(savedLanguage);

    document.title = 'Shram Siddhi - Worker Empowerment Platform';

    const fetchStats = async () => {
      try {
        const response = await apiService.statistics.get();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch homepage stats:', error);
      }
    };

    fetchStats();

    return () => clearTimeout(timer);
  }, [setLanguage]);

  const t = (en, hi) => (language === 'hi' ? hi : en);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <main className="pt-16 relative">
          {/* Background Gradient Mesh (softened for readability) */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-15%] left-[-15%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-15%] right-[-15%] w-[45%] h-[45%] bg-secondary/10 rounded-full blur-[120px]" />
            <div className="absolute top-[45%] left-[45%] w-[28%] h-[28%] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          {/* HERO */}
          <section className="py-16 md:py-20 px-4 relative">
            <motion.div
              className="max-w-6xl mx-auto"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              {/* Top Badge Row */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <motion.div
                  className="flex items-center gap-2 bg-surface/80 backdrop-blur-xl border border-primary/30 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                    {t(
                      'Project Name: Shram Siddhi Pvt. Ltd.',
                      'परियोजना: श्रम सिद्धि प्राइवेट लिमिटेड'
                    )}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 bg-surface/80 backdrop-blur-xl border border-secondary/30 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Briefcase" size={16} className="text-secondary" />
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
                    {t(
                      'Hybrid Tech-Enabled Labor Management',
                      'हाइब्रिड टेक-समर्थित श्रम प्रबंधन'
                    )}
                  </span>
                </motion.div>
              </motion.div>

              {/* Logo + Title */}
              <motion.div
                className="flex flex-col md:flex-row items-center justify-center mb-10 gap-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-neumorphic-lg relative"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-[3px] bg-background/40 rounded-3xl backdrop-blur-md" />
                  <Icon name="Zap" size={44} className="relative z-10 text-primary-foreground" />
                </motion.div>

                <div className="text-center md:text-left max-w-2xl">
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-3"
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                  >
                    <span className="inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-xl">
                      {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-2xl font-semibold text-foreground mb-4 leading-snug"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                  >
                    {t(
                      'Work for every hand, stability for every family.',
                      'हर हाथ को काम, हर परिवार को स्थिरता।'
                    )}
                  </motion.p>

                  <motion.div
                    className="inline-flex items-center gap-3 bg-surface/90 backdrop-blur-xl border border-accent/40 rounded-2xl px-5 py-3 shadow-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon name="Quote" size={18} className="text-accent" />
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      {t(
                        'Punch Line: "म से सिद्धि तक" – A journey from मेहनत (hard work) to सफलता (success).',
                        'पंच लाइन: "म से सिद्धि तक" – मेहनत से सफलता तक की यात्रा।'
                      )}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Hero Description */}
              <motion.div
                className="max-w-4xl mx-auto text-center mb-12"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
              >
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {t(
                    'A unified digital ecosystem that connects India\'s unorganized workers, small contractors, vendors and franchises through a powerful web and mobile platform.',
                    'एक ऐसा डिजिटल इकोसिस्टम जो भारत के असंगठित श्रमिकों, छोटे कॉन्ट्रैक्टर्स, विक्रेताओं और फ्रेंचाइज़ को एक सशक्त वेब और मोबाइल प्लेटफॉर्म से जोड़ता है।'
                  )}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5">
                    <Icon name="Smartphone" size={16} className="text-primary" />
                    <span className="text-xs md:text-sm font-medium text-primary">
                      {t('Web + Mobile', 'वेब + मोबाइल')}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-3 py-1.5">
                    <Icon name="Users2" size={16} className="text-secondary" />
                    <span className="text-xs md:text-sm font-medium text-secondary">
                      {t('Multi-Stakeholder', 'बहु-हितधारक')}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5">
                    <Icon name="Zap" size={16} className="text-accent" />
                    <span className="text-xs md:text-sm font-medium text-accent">
                      {t('Tech-Enabled', 'टेक-समर्थित')}
                    </span>
                  </span>
                </div>
              </motion.div>

              {/* Objective Strip */}
              <motion.div
                className="max-w-4xl mx-auto mb-14 bg-surface/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-secondary/15 rounded-full blur-3xl" />

                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <Icon name="Target" size={22} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                      {t('Core Objective', 'मुख्य उद्देश्य')}
                    </p>
                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                      {t(
                        'To take India\'s unorganized workforce towards a digital, organized and self-reliant future through structured labor management and tech-enabled services.',
                        'भारत के असंगठित श्रमिक वर्ग को तकनीक-सक्षम सेवाओं और संरचित श्रम प्रबंधन के माध्यम से डिजिटल, संगठित और आत्मनिर्भर भविष्य की ओर ले जाना।'
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-4 md:mb-8">
                {[
                  {
                    number: stats.total > 0 ? stats.total : 500,
                    suffix: stats.total > 0 ? '+' : 'K+',
                    label: t('Registered Workers (Vision)', 'पंजीकृत श्रमिक (विजन)'),
                    icon: 'Users',
                    color: 'text-primary'
                  },
                  {
                    number: stats.active > 0 ? stats.active : 93,
                    suffix: '%',
                    label: t('Active Workforce (Target)', 'सक्रित कार्यबल (लक्ष्य)'),
                    icon: 'Activity',
                    color: 'text-secondary'
                  },
                  {
                    number: stats.verified > 0 ? stats.verified : 45,
                    suffix: '%',
                    label: t('Verified Digital Profiles', 'सत्यापित डिजिटल प्रोफाइल'),
                    icon: 'ShieldCheck',
                    color: 'text-accent'
                  },
                  {
                    number: 24,
                    suffix: '/7',
                    label: t('Platform Ready for Support', '24x7 प्लेटफॉर्म सपोर्ट'),
                    icon: 'Headphones',
                    color: 'text-success'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-surface/80 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-neumorphic hover:shadow-neumorphic-lg transition-all"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className={`mb-2 flex justify-center ${stat.color}`}>
                      <Icon name={stat.icon} size={24} />
                    </div>
                    <div
                      className={`text-2xl md:text-3xl font-heading font-bold ${stat.color} mb-1`}
                    >
                      <CountUp end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] md:text-xs font-caption text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </section>

          {/* BUSINESS SNAPSHOT */}
          <motion.section
            className="px-4 pb-14 md:pb-16"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 md:mb-10">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">
                    {t('Business Snapshot', 'व्यवसाय का संक्षिप्त परिचय')}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    {t(
                      'Shram Siddhi Pvt. Ltd. is a digital-first manpower facilitation and labor management company delivering services via a unified website and Android-first mobile app.',
                      'श्रम सिद्धि प्रा. लि. एक डिजिटल-फर्स्ट मैनपावर फ़ैसिलिटेशन और श्रम प्रबंधन कंपनी है, जो वेबसाइट और एंड्रॉयड-फ़र्स्ट मोबाइल ऐप के माध्यम से सेवाएँ प्रदान करती है।'
                    )}
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-4 gap-5">
                {[
                  {
                    icon: 'Layers',
                    title: t('Business Nature', 'व्यवसाय प्रकृति'),
                    lines: [
                      t(
                        'Hybrid tech-enabled labor management & manpower services.',
                        'हाइब्रिड टेक-समर्थित श्रम प्रबंधन और मैनपावर सेवाएँ।'
                      )
                    ]
                  },
                  {
                    icon: 'Building2',
                    title: t('Business Type', 'व्यवसाय प्रकार'),
                    lines: [t('Private Limited Company.', 'प्राइवेट लिमिटेड कंपनी।')]
                  },
                  {
                    icon: 'Smartphone',
                    title: t('Platform Type', 'प्लेटफॉर्म प्रकार'),
                    lines: [
                      t(
                        'Website + Mobile App (Android first).',
                        'वेबसाइट + मोबाइल ऐप (पहले एंड्रॉयड)।'
                      )
                    ]
                  },
                  {
                    icon: 'Grid3X3',
                    title: t('Industry Classification', 'उद्योग वर्गीकरण'),
                    lines: [
                      t('Business Services', 'व्यवसाय सेवाएँ'),
                      t('Manpower Supply & HR Tech', 'मैनपावर सप्लाई और HR टेक'),
                      t('SaaS Labor/Staff Management', 'SaaS लेबर/स्टाफ प्रबंधन')
                    ]
                  }
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="bg-surface/90 backdrop-blur border border-white/15 rounded-2xl p-4 shadow-neumorphic hover:shadow-neumorphic-lg transition-all relative overflow-hidden"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute -top-6 -right-6 w-14 h-14 bg-primary/5 rounded-full blur-2xl" />
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-neumorphic-sm">
                        <Icon name={card.icon} size={18} className="text-primary-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold">{card.title}</h3>
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {card.lines.map((l, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-[3px]">
                            <Icon name="Dot" size={10} />
                          </span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CORE PORTALS & USER TYPES */}
          <motion.section
            className="px-4 pb-14 md:pb-16"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 md:mb-10">
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">
                    {t('Core Portals & User Types', 'मुख्य पोर्टल और उपयोगकर्ता प्रकार')}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(
                      'Shram Siddhi brings all stakeholders into one ecosystem – from the general public searching for workers to franchises managing large manpower deployments.',
                      'श्रम सिद्धि सभी हितधारकों को एक इकोसिस्टम में लाता है – आम जनता से लेकर बड़े मैनपावर प्रोजेक्ट संभालने वाली फ्रेंचाइज़ तक।'
                    )}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-7">
                {/* Jan Seva Portal */}
                <motion.div
                  className="bg-surface/90 backdrop-blur border border-white/20 rounded-3xl p-6 shadow-neumorphic-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1 text-[11px] font-semibold text-primary">
                      <Icon name="Users" size={14} />
                      <span>{t('Jan Seva Portal', 'जन सेवा पोर्टल')}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t('General Public View', 'सामान्य जनता दृश्य')}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {t(
                        'Any citizen can search for workers or services at zero cost and gets connected to verified franchises or local service providers.',
                        'कोई भी नागरिक बिना शुल्क के श्रमिक / सेवाएँ खोज सकता है और सत्यापित फ्रेंचाइज़ या स्थानीय सेवा प्रदाताओं से जुड़ सकता है।'
                      )}
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <Icon name="CheckCircle2" size={14} />
                        <span>{t('Free search for labor & services.', 'श्रम और सेवाओं के लिए निःशुल्क खोज।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="ShieldCheck" size={14} />
                        <span>{t('Connections only with verified partners.', 'सिर्फ सत्यापित पार्टनर से कनेक्शन।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="SmilePlus" size={14} />
                        <span>{t('No platform charges for citizens.', 'सामान्य नागरिकों के लिए कोई शुल्क नहीं।')}</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Agent Login */}
                <motion.div
                  className="bg-surface/90 backdrop-blur border border-white/20 rounded-3xl p-6 shadow-neumorphic-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 }}
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-3xl" />
                  <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-3 py-1 text-[11px] font-semibold text-secondary">
                      <Icon name="IdCard" size={14} />
                      <span>{t('Agent Login (SaaS Users)', 'एजेंट लॉगिन (SaaS उपयोगकर्ता)')}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t('Contractors • Shop Owners • Transporters', 'कॉन्ट्रैक्टर • दुकानदार • ट्रांसपोर्टर्स')}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {t(
                        'For contractors and businesses employing workers on daily or monthly wages, with digital tools to manage the entire worker lifecycle.',
                        'उन कॉन्ट्रैक्टरों और व्यवसायों के लिए जो श्रमिकों को दैनिक / मासिक मजदूरी पर रखते हैं और पूरे वर्कर लाइफसाइकिल को डिजिटल तरीके से मैनेज करना चाहते हैं।'
                      )}
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <Icon name="QrCode" size={14} />
                        <span>
                          {t(
                            'QR-based worker IDs linked with Aadhaar & bank account.',
                            'आधार और बैंक अकाउंट से लिंक्ड QR आधारित वर्कर ID।'
                          )}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="Clock4" size={14} />
                        <span>
                          {t(
                            'Payroll, attendance & performance records.',
                            'पेरोल, उपस्थिति और प्रदर्शन रिकॉर्ड।'
                          )}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="MapPin" size={14} />
                        <span>{t('GPS tracking & daily work logs.', 'GPS ट्रैकिंग और दैनिक कार्य लॉग।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="CreditCard" size={14} />
                        <span>
                          {t(
                            'Affordable SaaS subscription: monthly / annual plans.',
                            'सुलभ SaaS सब्सक्रिप्शन: मासिक / वार्षिक प्लान।'
                          )}
                        </span>
                      </li>
                    </ul>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {t(
                        'Illustrative slabs: ₹99, ₹149, ₹199 – configurable as per category & number of employees.',
                        'उदाहरण स्लैब: ₹99, ₹149, ₹199 – श्रेणी और कर्मचारियों की संख्या के अनुसार।'
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Franchise Login */}
                <motion.div
                  className="bg-surface/90 backdrop-blur border border-white/20 rounded-3xl p-6 shadow-neumorphic-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.26 }}
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl" />
                  <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-3 py-1 text-[11px] font-semibold text-accent">
                      <Icon name="Handshake" size={14} />
                      <span>{t('Franchise Login', 'फ्रेंचाइज़ लॉगिन')}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t('Authorized Franchise Partners', 'अधिकृत फ्रेंचाइज़ पार्टनर')}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {t(
                        'Local partners who onboard workers, serve B2B clients and manage large construction or project-based manpower.',
                        'स्थानीय पार्टनर जो श्रमिकों को ऑनबोर्ड करते हैं, B2B क्लाइंट्स को सेवाएँ देते हैं और बड़े कंस्ट्रक्शन या प्रोजेक्ट-आधारित मैनपावर प्रोजेक्ट संभालते हैं।'
                      )}
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <Icon name="UserCog" size={14} />
                        <span>{t('Full access to agent features plus project tools.', 'एजेंट की सभी सुविधाएँ + प्रोजेक्ट टूल्स।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="BadgeIndianRupee" size={14} />
                        <span>{t('Entry fee, recurring SaaS fee & incentives.', 'एंट्री फीस, मासिक SaaS फीस और इंसेंटिव।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="Building" size={14} />
                        <span>
                          {t(
                            'Construction, industrial and large manpower deployment.',
                            'कंस्ट्रक्शन, इंडस्ट्रियल और बड़े मैनपावर प्रोजेक्ट।'
                          )}
                        </span>
                      </li>
                    </ul>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {t(
                        'Illustrative entry fee: ₹10,000 to ₹99,000 based on brand value; platform + service fee approx. ₹999/month.',
                        'उदाहरण एंट्री फीस: ₹10,000 से ₹99,000 (ब्रांड वैल्यू पर निर्भर); प्लेटफॉर्म + सर्विस चार्ज ~₹999/माह।'
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Company Master Login */}
                <motion.div
                  className="bg-surface/90 backdrop-blur border border-white/20 rounded-3xl p-6 shadow-neumorphic-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.34 }}
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-success/10 rounded-full blur-3xl" />
                  <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 bg-success/10 rounded-full px-3 py-1 text-[11px] font-semibold text-success">
                      <Icon name="Shield" size={14} />
                      <span>{t('Company Master Login', 'कंपनी मास्टर लॉगिन')}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t('Central Control & Governance', 'केंद्रीय नियंत्रण और गवर्नेंस')}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {t(
                        'Admin layer to manage the platform, approve workers, monitor franchises, assign leads and track payments & compliance.',
                        'एडमिन लेयर जो प्लेटफॉर्म मैनेजमेंट, वर्कर अप्रूवल, फ्रेंचाइज़ मॉनिटरिंग, लीड असाइनमेंट और पेमेंट/कम्प्लायंस ट्रैक करती है।'
                      )}
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <Icon name="ListChecks" size={14} />
                        <span>
                          {t(
                            'Approve/reject worker registrations & franchise activities.',
                            'वर्कर रजिस्ट्रेशन और फ्रेंचाइज़ गतिविधियों की स्वीकृति/अस्वीकृति।'
                          )}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="Bell" size={14} />
                        <span>{t('Broadcast messages & manage dropdown masters.', 'ब्रॉडकास्ट मैसेज और ड्रॉपडाउन मास्टर कंट्रोल।')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="Percent" size={14} />
                        <span>{t('Configure incentive percentages & company share.', 'इंसेंटिव प्रतिशत और कंपनी कट सेटिंग।')}</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* REVENUE MODEL */}
          <motion.section
            className="px-4 pb-14 md:pb-16"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 md:mb-10">
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">
                    {t('Proposed Revenue Model', 'प्रस्तावित राजस्व मॉडल')}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(
                      'Sustainable, multi-channel revenue streams built on SaaS subscriptions, franchise economics and value-added services.',
                      'SaaS सब्सक्रिप्शन, फ्रेंचाइज़ इकोनॉमिक्स और वैल्यू-एडेड सेवाओं पर आधारित टिकाऊ मल्टी-चैनल राजस्व मॉडल।'
                    )}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-5">
                {[
                  {
                    icon: 'Repeat',
                    title: t('SaaS Subscription', 'SaaS सब्सक्रिप्शन'),
                    desc: t(
                      'Monthly / annual subscriptions from agents & franchises using the digital platform.',
                      'डिजिटल प्लेटफॉर्म उपयोग करने वाले एजेंट और फ्रेंचाइज़ से मासिक / वार्षिक सब्सक्रिप्शन।'
                    )
                  },
                  {
                    icon: 'Store',
                    title: t('Franchise Enrolment', 'फ्रेंचाइज़ एनरोलमेंट'),
                    desc: t(
                      'One-time entry fee plus annual renewals to maintain franchise rights.',
                      'वन टाइम एंट्री फीस और वार्षिक नवीनीकरण शुल्क।'
                    )
                  },
                  {
                    icon: 'Users2',
                    title: t('Manpower Commission', 'मैनपावर कमीशन'),
                    desc: t(
                      'Commission on deployed workforce for B2B and project-based contracts.',
                      'B2B और प्रोजेक्ट बेस्ड कॉन्ट्रैक्ट्स पर मैनपावर कमीशन।'
                    )
                  },
                  {
                    icon: 'ShieldPlus',
                    title: t('Value-Added Services', 'वैल्यू-एडेड सर्विसेज'),
                    desc: t(
                      'Insurance, ID cards, GPS devices & digital tools bundled with services.',
                      'इंश्योरेंस, ID कार्ड, GPS डिवाइसेज़ और डिजिटल टूल्स।'
                    )
                  },
                  {
                    icon: 'FileText',
                    title: t('B2B Service Charges', 'B2B सर्विस चार्ज'),
                    desc: t(
                      'Specialised workforce management & compliance services for enterprises.',
                      'एंटरप्राइज़ के लिए विशेष वर्कफोर्स मैनेजमेंट और कम्प्लायंस सेवाएँ।'
                    )
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="bg-surface/90 backdrop-blur border border-white/20 rounded-2xl p-4 shadow-neumorphic hover:shadow-neumorphic-lg transition-all flex flex-col gap-3"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * idx }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-neumorphic-sm">
                      <Icon name={item.icon} size={18} className="text-primary-foreground" />
                    </div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* DESIGN PRINCIPLES / FOR DEVELOPERS NOTE */}
          <motion.section
            className="px-4 pb-18 md:pb-20"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.3}
          >
            <div className="max-w-6xl mx-auto">
              <div className="max-w-4xl mx-auto">
                {/* Built for Bharat’s Workforce */}
                <motion.div
                  className="bg-surface/90 backdrop-blur border border-white/20 rounded-3xl p-6 md:p-7 shadow-neumorphic-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-14 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-14 left-0 w-34 h-34 bg-secondary/10 rounded-full blur-3xl" />
                  <div className="relative space-y-4">
                    <h2 className="text-xl md:text-2xl font-heading font-bold">
                      {t('Built for Bharat’s Workforce', 'भारत की श्रमशक्ति के लिए निर्मित')}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {t(
                        'The design and technology stack are optimized for real India – low-end devices, variable network conditions and semi-literate users.',
                        'डिज़ाइन और टेक्नोलॉजी स्टैक को वास्तविक भारत को ध्यान में रखकर बनाया गया है – लो-एंड डिवाइस, कमजोर नेटवर्क और कम पढ़े-लिखे उपयोगकर्ता।'
                      )}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: 'SignalLow',
                          title: t('Low Connectivity Friendly', 'कम नेटवर्क के लिए अनुकूल'),
                          desc: t(
                            'Lightweight screens, optimized calls and graceful offline handling.',
                            'हल्के स्क्रीन, ऑप्टिमाइज़्ड कॉल और ऑफ़लाइन हैंडलिंग।'
                          )
                        },
                        {
                          icon: 'Languages',
                          title: t('Multilingual UX', 'मल्टीलिंगुअल UX'),
                          desc: t(
                            'Hindi-first experience with easy expansion to regional languages.',
                            'हिंदी-फर्स्ट अनुभव, क्षेत्रीय भाषाओं के आसान विस्तार के साथ।'
                          )
                        },
                        {
                          icon: 'LockKeyhole',
                          title: t('Secure by Design', 'सिक्योर बाय डिज़ाइन'),
                          desc: t(
                            'All sensitive data encrypted at rest and in transit.',
                            'सभी संवेदनशील डेटा एन्क्रिप्टेड (रेस्ट और ट्रांज़िट दोनों में)।'
                          )
                        },
                        {
                          icon: 'Accessibility',
                          title: t('Accessible for Semi-Literate Users', 'कम पढ़े-लिखे उपयोगकर्ताओं के लिए आसान'),
                          desc: t(
                            'Icon-led design, clean typography and future voice support.',
                            'आइकन-आधारित डिज़ाइन, साफ़ टाइपोग्राफी और आगे चलकर वॉइस सपोर्ट।'
                          )
                        }
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="bg-background/70 border border-white/15 rounded-2xl p-4 shadow-neumorphic-sm flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center flex-shrink-0">
                            <Icon name={item.icon} size={16} className="text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>


              </div>
            </div>
          </motion.section>
        </main>
      )}
    </div>
  );
};

export default Homepage;
