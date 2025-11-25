import React, { useState, useContext, createContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

// Navigation Context
const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated from sessionStorage
    return sessionStorage.getItem('auth-token') !== null;
  });
  const [userRole, setUserRole] = useState(() => {
    return sessionStorage.getItem('user-role') || null;
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferred-language') || 'en';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      userRole,
      setUserRole,
      language,
      setLanguage,
      isMobileMenuOpen,
      setIsMobileMenuOpen
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

const ContextualNavigation = () => {
  const location = useLocation();
  const {
    isAuthenticated,
    userRole,
    language,
    setLanguage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsAuthenticated
  } = useNavigation();

  // Navigation items based on context
  const publicNavItems = [
    {
      label: language === 'hi' ? 'होम' : 'Home',
      path: '/homepage',
      icon: 'Home',
      tooltip: language === 'hi' ? 'मुख्य पृष्ठ' : 'Main page'
    },
    {
      label: language === 'hi' ? 'पिच डेक' : 'Pitch Deck',
      path: '/pitch-deck',
      icon: 'Presentation',
      tooltip: language === 'hi' ? 'निवेशकों के लिए प्रेजेंटेशन' : 'Investor presentation'
    },
    {
      label: language === 'hi' ? 'श्रमिक पंजीकरण' : 'Worker Enrollment',
      path: '/worker-enrollment-form',
      icon: 'UserPlus',
      tooltip: language === 'hi' ? 'नया श्रमिक पंजीकरण' : 'Register new worker'
    },
    {
      label: language === 'hi' ? 'क्लाइंट अनुरोध' : 'Client Request',
      path: '/client-request-form',
      icon: 'FileText',
      tooltip: language === 'hi' ? 'सेवा अनुरोध फॉर्म' : 'Service request form'
    },
    {
      label: language === 'hi' ? 'फ्रेंचाइजी आवेदन' : 'Franchise Application',
      path: '/franchise-application',
      icon: 'Building2',
      tooltip: language === 'hi' ? 'फ्रेंचाइजी भागीदार बनें' : 'Become a franchise partner'
    },
    {
      label: language === 'hi' ? 'संपर्क करें' : 'Contact Us',
      path: '/contact-us',
      icon: 'Mail',
      tooltip: language === 'hi' ? 'हमसे संपर्क करें' : 'Contact us for support'
    }
  ];

  const adminNavItems = [
    {
      label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      tooltip: language === 'hi' ? 'प्रबंधन डैशबोर्ड' : 'Management dashboard'
    },
    {
      label: language === 'hi' ? 'श्रमिक प्रोफाइल' : 'Worker Profiles',
      path: '/worker-profile-details',
      icon: 'Users',
      tooltip: language === 'hi' ? 'श्रमिक विवरण देखें' : 'View worker details'
    },
    {
      label: language === 'hi' ? 'डेटाबेस व्यूअर' : 'Database Viewer',
      path: '/database-viewer',
      icon: 'Database',
      tooltip: language === 'hi' ? 'डेटाबेस डेटा देखें' : 'View database data'
    }
  ];

  const currentNavItems = isAuthenticated ? [...adminNavItems, ...publicNavItems] : publicNavItems;

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth-token');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-navigation bg-surface/80 backdrop-blur-md border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? '/admin-dashboard' : '/homepage'} className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg"
              >
                <Icon name="Zap" size={24} color="white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}
                </h1>
                <p className="text-xs font-caption text-muted-foreground">
                  {language === 'hi' ? 'श्रमिक सशक्तिकरण मंच' : 'Worker Empowerment Platform'}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {currentNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                title={item?.tooltip}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary shadow-inner border border-primary/20'
                      : 'text-foreground/80 hover:bg-muted hover:text-primary'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLanguageToggle}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-foreground/80 hover:text-primary transition-colors border border-transparent hover:border-border"
              title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            >
              <Icon name="Globe" size={16} />
              <span className="text-xs font-bold">
                {language === 'hi' ? 'EN' : 'हि'}
              </span>
            </motion.button>

            {/* Admin Login/Logout */}
            {!isAuthenticated ? (
              <Link to="/admin-login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary hover:bg-primary/5">
                    <Icon name="LogIn" size={16} />
                    <span className="ml-2">
                      {language === 'hi' ? 'प्रबंधक लॉगिन' : 'Admin Login'}
                    </span>
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-error/20 hover:border-error hover:bg-error/5 text-error"
                >
                  <Icon name="LogOut" size={16} />
                  <span className="ml-2">
                    {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                  </span>
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted text-foreground"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-16 right-0 bottom-0 z-50 w-80 bg-surface border-l border-border shadow-2xl overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Mobile Language Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'hi' ? 'भाषा बदलें' : 'Change Language'}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLanguageToggle}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white shadow-sm text-sm font-bold text-primary"
                  >
                    <Icon name="Globe" size={16} />
                    <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {currentNavItems?.map((item, index) => (
                    <motion.div
                      key={item?.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item?.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                          ${isActivePath(item?.path)
                            ? 'bg-primary/10 text-primary shadow-sm'
                            : 'text-foreground/80 hover:bg-muted hover:text-primary'
                          }
                        `}
                      >
                        <div className={`p-2 rounded-lg ${isActivePath(item?.path) ? 'bg-primary/20' : 'bg-muted'}`}>
                          <Icon name={item?.icon} size={20} />
                        </div>
                        <span>{item?.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {isAuthenticated && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-6 border-t border-border"
                  >
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full justify-center border-error/20 hover:border-error hover:bg-error/5 text-error py-6"
                    >
                      <Icon name="LogOut" size={20} />
                      <span className="ml-2 font-semibold">
                        {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                      </span>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ContextualNavigation;