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

  return <span>{count}{suffix}</span>;
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
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 1]); // Disabled fade out

  useEffect(() => {
    // Simulate loading time for the animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Set page title
    document.title = 'Shram Siddhi - Worker Empowerment Platform';

    // Fetch real statistics
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <main className="pt-16 relative">
          {/* Background Gradient Mesh */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Hero Section */}
          <section className="py-20 px-4 relative">
            <motion.div
              className="max-w-7xl mx-auto text-center"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div
                className="flex justify-center items-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-neumorphic-lg mr-6 relative"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm" />
                  <Icon name="Zap" size={48} color="white" className="relative z-10" />
                </motion.div>
                <div className="text-left">
                  <motion.h1
                    className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}
                  </motion.h1>
                  <motion.p
                    className="text-xl font-caption text-muted-foreground"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {language === 'hi' ? 'भारत की श्रमशक्ति को सशक्त बनाना' : 'Empowering India\'s Workforce'}
                  </motion.p>
                </div>
              </motion.div>

              <motion.p
                className="text-2xl text-foreground max-w-4xl mx-auto leading-relaxed mb-16"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {language === 'hi'
                  ? 'डिजिटल परिवर्तन और व्यापक कार्यबल प्रबंधन के माध्यम से असंगठित क्षेत्र के श्रमिकों को रोजगार के अवसरों से जोड़ना।'
                  : 'Connecting unorganized sector workers with employment opportunities through digital transformation and comprehensive workforce management.'
                }
              </motion.p>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                {[
                  {
                    number: stats.total > 0 ? stats.total : 500,
                    suffix: stats.total > 0 ? "+" : "M+",
                    label: language === 'hi' ? 'पंजीकृत श्रमिक' : 'Registered Workers',
                    icon: "Users",
                    color: "text-primary"
                  },
                  {
                    number: stats.active > 0 ? stats.active : 93,
                    suffix: "%",
                    label: language === 'hi' ? 'सक्रिय कार्यबल' : 'Active Workforce',
                    icon: "Activity",
                    color: "text-secondary"
                  },
                  {
                    number: stats.verified > 0 ? stats.verified : 45,
                    suffix: "%",
                    label: language === 'hi' ? 'सत्यापित प्रोफाइल' : 'Verified Profiles',
                    icon: "ShieldCheck",
                    color: "text-accent"
                  },
                  {
                    number: 24,
                    suffix: "/7",
                    label: language === 'hi' ? 'प्लेटफॉर्म सहायता' : 'Platform Support',
                    icon: "Headphones",
                    color: "text-success"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-surface/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-neumorphic hover:shadow-neumorphic-lg transition-all"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className={`mb-4 flex justify-center ${stat.color}`}>
                      <Icon name={stat.icon} size={32} />
                    </div>
                    <div className={`text-4xl font-heading font-bold ${stat.color} mb-2`}>
                      <CountUp end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-caption text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                className="bg-gradient-to-r from-surface to-background rounded-3xl p-10 shadow-neumorphic-lg max-w-3xl mx-auto border border-white/50 relative overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

                <h2 className="text-3xl font-heading font-bold text-foreground mb-4 relative z-10">
                  {language === 'hi' ? 'आज ही शुरुआत करें' : 'Get Started Today'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 relative z-10">
                  {language === 'hi'
                    ? 'हमारे प्लेटफॉर्म से जुड़ें और रोजगार के नए अवसर खोजें।'
                    : 'Join our platform and discover new employment opportunities.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <motion.a
                    href="/worker-enrollment-form"
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--color-primary), 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name="UserPlus" size={20} />
                    {language === 'hi' ? 'श्रमिक पंजीकरण' : 'Worker Enrollment'}
                  </motion.a>
                  <motion.a
                    href="/client-request-form"
                    className="bg-white text-foreground border border-border px-8 py-4 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name="Search" size={20} />
                    {language === 'hi' ? 'श्रमिक खोजें' : 'Find Workers'}
                  </motion.a>
                  <motion.a
                    href="/franchise-application"
                    className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--color-secondary), 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name="Briefcase" size={20} />
                    {language === 'hi' ? 'फ्रेंचाइजी बनें' : 'Become Franchise'}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Homepage;