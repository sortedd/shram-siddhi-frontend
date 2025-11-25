import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import apiService from '../../services/api';

const ContactUs = () => {
    const { language } = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await apiService.post('/contact', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center mb-16">
                    <motion.h1
                        className="text-5xl font-heading font-bold text-foreground mb-4"
                        variants={itemVariants}
                    >
                        {language === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        {language === 'hi'
                            ? 'हम आपकी मदद के लिए यहाँ हैं। किसी भी प्रश्न या सहयोग के लिए हमसे संपर्क करें।'
                            : 'We are here to help. Reach out to us for any queries or collaboration opportunities.'}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-neumorphic">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                {language === 'hi' ? 'संपर्क विवरण' : 'Contact Details'}
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                                        <Icon name="User" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Anurag Sharma</h3>
                                        <p className="text-primary font-medium">Founder</p>
                                        <div className="flex items-center mt-2 text-muted-foreground">
                                            <Icon name="Phone" size={16} className="mr-2" />
                                            <a href="tel:+918223945111" className="hover:text-primary transition-colors">+91 8223945111</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-secondary">
                                        <Icon name="Code" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Maaz Munir</h3>
                                        <p className="text-secondary font-medium">Co-founder & Tech Lead</p>
                                        <div className="flex items-center mt-2 text-muted-foreground">
                                            <Icon name="Phone" size={16} className="mr-2" />
                                            <a href="tel:+919755310879" className="hover:text-primary transition-colors">+91 9755310879</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 text-success">
                                        <Icon name="MapPin" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {language === 'hi' ? 'कार्यालय' : 'Office'}
                                        </h3>
                                        <p className="text-muted-foreground mt-1">
                                            Guna, Madhya Pradesh, 473001<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                            <h3 className="text-2xl font-bold mb-4">
                                {language === 'hi' ? 'हमारे साथ जुड़ें' : 'Join Our Mission'}
                            </h3>
                            <p className="mb-6 text-white/90">
                                {language === 'hi'
                                    ? 'श्रम सिद्धि के साथ जुड़कर भारत के श्रमिक वर्ग को सशक्त बनाएं।'
                                    : 'Partner with Shram Siddhi to empower India\'s workforce through technology.'}
                            </p>
                            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 border-none">
                                {language === 'hi' ? 'पिच डेक देखें' : 'View Pitch Deck'}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-card rounded-2xl shadow-neumorphic-lg p-8 border border-border">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                {language === 'hi' ? 'हमें संदेश भेजें' : 'Send us a Message'}
                            </h2>

                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center text-success">
                                    <Icon name="CheckCircle" size={20} className="mr-2" />
                                    {language === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message sent successfully!'}
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center text-error">
                                    <Icon name="AlertCircle" size={20} className="mr-2" />
                                    {language === 'hi' ? 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to send message. Please try again.'}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        {language === 'hi' ? 'नाम' : 'Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder={language === 'hi' ? 'आपका नाम' : 'Your Name'}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {language === 'hi' ? 'ईमेल' : 'Email'}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {language === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        {language === 'hi' ? 'संदेश' : 'Message'}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                        placeholder={language === 'hi' ? 'आपका संदेश...' : 'Your message...'}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-4 text-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            {language === 'hi' ? 'भेज रहा है...' : 'Sending...'}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <Icon name="Send" size={20} className="mr-2" />
                                            {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;
