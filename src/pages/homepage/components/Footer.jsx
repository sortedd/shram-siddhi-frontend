import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const { language } = useNavigation();
  const currentYear = new Date()?.getFullYear();

  const footerContent = {
    en: {
      tagline: "Empowering India\'s Workforce Through Technology",
      quickLinks: {
        title: "Quick Links",
        links: [
          { label: "Home", path: "/homepage" },
          { label: "Worker Enrollment", path: "/worker-enrollment-form" },
          { label: "Client Request", path: "/client-request-form" },
          { label: "Admin Login", path: "/admin-login" }
        ]
      },
      platform: {
        title: "Platform",
        links: [
          { label: "About Us", path: "/homepage#about" },
          { label: "Future Roadmap", path: "/homepage#roadmap" },
          { label: "Privacy Policy", path: "#" },
          { label: "Terms of Service", path: "#" }
        ]
      },
      support: {
        title: "Support",
        links: [
          { label: "Help Center", path: "#" },
          { label: "Contact Us", path: "#" },
          { label: "Worker Support", path: "#" },
          { label: "Employer Support", path: "#" }
        ]
      },
      contact: {
        title: "Contact Information",
        address: "123 Tech Park, Sector 5\nGurgaon, Haryana 122001",
        phone: "+91 98765 43210",
        email: "support@shramsiddhi.in"
      },
      social: {
        title: "Follow Us",
        platforms: [
          { name: "Facebook", icon: "Facebook", url: "#" },
          { name: "Twitter", icon: "Twitter", url: "#" },
          { name: "LinkedIn", icon: "Linkedin", url: "#" },
          { name: "Instagram", icon: "Instagram", url: "#" }
        ]
      },
      copyright: `© ${currentYear} Shram Siddhi. All rights reserved.`,
      madeIn: "Made in India with ❤️"
    },
    hi: {
      tagline: "प्रौद्योगिकी के माध्यम से भारत की श्रमशक्ति को सशक्त बनाना",
      quickLinks: {
        title: "त्वरित लिंक",
        links: [
          { label: "होम", path: "/homepage" },
          { label: "श्रमिक नामांकन", path: "/worker-enrollment-form" },
          { label: "क्लाइंट अनुरोध", path: "/client-request-form" },
          { label: "प्रबंधक लॉगिन", path: "/admin-login" }
        ]
      },
      platform: {
        title: "प्लेटफॉर्म",
        links: [
          { label: "हमारे बारे में", path: "/homepage#about" },
          { label: "भविष्य की रोडमैप", path: "/homepage#roadmap" },
          { label: "गोपनीयता नीति", path: "#" },
          { label: "सेवा की शर्तें", path: "#" }
        ]
      },
      support: {
        title: "सहायता",
        links: [
          { label: "सहायता केंद्र", path: "#" },
          { label: "संपर्क करें", path: "#" },
          { label: "श्रमिक सहायता", path: "#" },
          { label: "नियोक्ता सहायता", path: "#" }
        ]
      },
      contact: {
        title: "संपर्क जानकारी",
        address: "123 टेक पार्क, सेक्टर 5\nगुड़गांव, हरियाणा 122001",
        phone: "+91 98765 43210",
        email: "support@shramsiddhi.in"
      },
      social: {
        title: "हमें फॉलो करें",
        platforms: [
          { name: "Facebook", icon: "Facebook", url: "#" },
          { name: "Twitter", icon: "Twitter", url: "#" },
          { name: "LinkedIn", icon: "Linkedin", url: "#" },
          { name: "Instagram", icon: "Instagram", url: "#" }
        ]
      },
      copyright: `© ${currentYear} श्रम सिद्धि। सभी अधिकार सुरक्षित।`,
      madeIn: "भारत में ❤️ के साथ बनाया गया"
    }
  };

  const content = footerContent?.[language];

  return (
    <footer className="bg-surface border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-neumorphic">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {language === 'hi' ? 'श्रम सिद्धि' : 'Shram Siddhi'}
                </h3>
              </div>
            </div>
            <p className="text-foreground leading-relaxed mb-6">
              {content?.tagline}
            </p>
            
            {/* Social Links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                {content?.social?.title}
              </h4>
              <div className="flex space-x-3">
                {content?.social?.platforms?.map((platform, index) => (
                  <a
                    key={index}
                    href={platform?.url}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-neumorphic hover:shadow-neumorphic-pressed"
                    title={platform?.name}
                  >
                    <Icon name={platform?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6">
              {content?.quickLinks?.title}
            </h4>
            <ul className="space-y-3">
              {content?.quickLinks?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Icon name="ChevronRight" size={14} />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6">
              {content?.platform?.title}
            </h4>
            <ul className="space-y-3">
              {content?.platform?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Icon name="ChevronRight" size={14} />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-6">
              {content?.contact?.title}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-foreground text-sm leading-relaxed">
                  {content?.contact?.address}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-primary flex-shrink-0" />
                <a
                  href={`tel:${content?.contact?.phone}`}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {content?.contact?.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-primary flex-shrink-0" />
                <a
                  href={`mailto:${content?.contact?.email}`}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {content?.contact?.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {content?.copyright}
            </p>
            <div className="flex items-center space-x-6">
              <p className="text-sm text-muted-foreground">
                {content?.madeIn}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">
                  {language === 'hi' ? 'सुरक्षित प्लेटफॉर्म' : 'Secure Platform'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;