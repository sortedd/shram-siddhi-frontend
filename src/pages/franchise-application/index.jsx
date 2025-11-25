import React, { useState } from 'react';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FranchiseApplication = () => {
    const { language } = useNavigation();
    const [currentSection, setCurrentSection] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Applicant Details
        fullName: '',
        applicantType: 'Individual',
        mobileNumber: '',
        emailAddress: '',
        aadharNumber: '',
        address: '',
        district: '',
        nearestCity: '',

        // Section 2: Center Infrastructure Details
        centerLocationType: 'Urban',
        totalSpaceAvailable: '<150 sq.ft',
        seatingArrangement: 'Yes',
        seatingCapacity: '',
        accessibility: 'Ground Floor',
        wheelchairAccessible: 'Yes',
        drinkingWater: true,
        washroom: true,
        waitingArea: true,
        wifiAvailable: 'Yes',
        electricityBackup: 'Yes',

        // Section 3: Digital Infrastructure & Accessories
        computerSystem: 'Available',
        computerCount: '2',
        printerScanner: 'Available',
        printerCount: '2',
        webcamCamera: 'Available',
        powerBackup: 'Yes',
        setupCostBearer: 'Applicant (Self-funded)',

        // Section 4: Local Network & Experience
        governmentNgoExperience: 'No',
        governmentNgoDetails: '',
        localWorkerNetwork: 'No',
        localWorkerDetails: '',
        initialWorkerCount: '',
        whyFranchise: '',
        references: '',

        // Section 5: Declaration & Agreement
        performancePartnership: false,
        transparentPractices: false,
        operationalGuidelines: false,
        accurateInformation: false,

        // Upload Section
        idProof: null,
        centerPhoto: null
    });

    const content = {
        en: {
            title: "Franchise Application Form",
            subtitle: "Join the Viksit Bharat Employment Mission",
            description: "Become a Facilitation Partner and help bridge the gap between local workers and employers",
            sections: [
                "Applicant Details",
                "Center Infrastructure Details",
                "Digital Infrastructure & Accessories",
                "Local Network & Experience",
                "Declaration & Agreement"
            ],
            benefits: [
                "Be part of the Viksit Bharat Employment Mission",
                "Build local employment networks",
                "Earn through a performance-linked partnership model",
                "Get digital tools, training & continuous support"
            ]
        },
        hi: {
            title: "फ्रेंचाइजी आवेदन फॉर्म",
            subtitle: "विकसित भारत रोजगार मिशन में शामिल हों",
            description: "एक सुविधा भागीदार बनें और स्थानीय श्रमिकों और नियोक्ताओं के बीच की खाई को पाटने में मदद करें",
            sections: [
                "आवेदक विवरण",
                "केंद्र अवसंरचना विवरण",
                "डिजिटल अवसंरचना और सहायक उपकरण",
                "स्थानीय नेटवर्क और अनुभव",
                "घोषणा और समझौता"
            ],
            benefits: [
                "विकसित भारत रोजगार मिशन का हिस्सा बनें",
                "स्थानीय रोजगार नेटवर्क बनाएं",
                "प्रदर्शन-आधारित साझेदारी मॉडल के माध्यम से कमाएं",
                "डिजिटल उपकरण, प्रशिक्षण और निरंतर सहायता प्राप्त करें"
            ]
        }
    };

    const currentContent = content[language];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const nextSection = () => {
        if (currentSection < 5) {
            setCurrentSection(currentSection + 1);
        }
    };

    const prevSection = () => {
        if (currentSection > 1) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Franchise Application Submitted:', formData);
        // Handle form submission
    };

    const renderSection1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'आवेदक विवरण' : 'Applicant Details'}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'पूरा नाम / संगठन का नाम' : 'Full Name / Organization Name'}
                    </label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'आवेदक का प्रकार' : 'Type of Applicant'}
                    </label>
                    <select
                        value={formData.applicantType}
                        onChange={(e) => handleInputChange('applicantType', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Individual">{language === 'hi' ? 'व्यक्तिगत' : 'Individual'}</option>
                        <option value="NGO">{language === 'hi' ? 'एनजीओ' : 'NGO'}</option>
                        <option value="Company">{language === 'hi' ? 'कंपनी' : 'Company'}</option>
                        <option value="Partnership">{language === 'hi' ? 'साझेदारी' : 'Partnership'}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                    </label>
                    <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'ईमेल पता' : 'Email Address'}
                    </label>
                    <input
                        type="email"
                        value={formData.emailAddress}
                        onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'आधार नंबर / संगठन पंजीकरण संख्या' : 'Aadhar Number / Organization Registration No.'}
                    </label>
                    <input
                        type="text"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'निकटतम शहर / तहसील' : 'Nearest City / Tehsil'}
                    </label>
                    <input
                        type="text"
                        value={formData.nearestCity}
                        onChange={(e) => handleInputChange('nearestCity', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'पता (स्थायी + प्रस्तावित केंद्र स्थान)' : 'Address (Permanent + Proposed Center Location)'}
                </label>
                <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'जिला / राज्य' : 'District / State'}
                </label>
                <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                />
            </div>
        </div>
    );

    const renderSection2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'केंद्र अवसंरचना विवरण' : 'Center Infrastructure Details'}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'केंद्र स्थान प्रकार' : 'Center Location Type'}
                    </label>
                    <select
                        value={formData.centerLocationType}
                        onChange={(e) => handleInputChange('centerLocationType', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Urban">{language === 'hi' ? 'शहरी' : 'Urban'}</option>
                        <option value="Semi-urban">{language === 'hi' ? 'अर्ध-शहरी' : 'Semi-urban'}</option>
                        <option value="Rural">{language === 'hi' ? 'ग्रामीण' : 'Rural'}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'कुल उपलब्ध स्थान (वर्ग फुट में)' : 'Total Space Available (in sq.ft)'}
                    </label>
                    <select
                        value={formData.totalSpaceAvailable}
                        onChange={(e) => handleInputChange('totalSpaceAvailable', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="<150 sq.ft">&lt;150 sq.ft</option>
                        <option value="150-300 sq.ft">150-300 sq.ft</option>
                        <option value=">300 sq.ft">&gt;300 sq.ft</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'श्रमिकों के लिए बैठने की व्यवस्था' : 'Seating Arrangement for Workers'}
                    </label>
                    <select
                        value={formData.seatingArrangement}
                        onChange={(e) => handleInputChange('seatingArrangement', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                        <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                    </select>
                </div>

                {formData.seatingArrangement === 'Yes' && (
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'यदि हाँ, क्षमता (सीटों की संख्या)' : 'If yes, capacity (number of seats)'}
                        </label>
                        <input
                            type="number"
                            value={formData.seatingCapacity}
                            onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'पहुंच' : 'Accessibility'}
                    </label>
                    <select
                        value={formData.accessibility}
                        onChange={(e) => handleInputChange('accessibility', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Ground Floor">{language === 'hi' ? 'भूतल' : 'Ground Floor'}</option>
                        <option value="First Floor">{language === 'hi' ? 'पहली मंजिल' : 'First Floor'}</option>
                        <option value="Other">{language === 'hi' ? 'अन्य' : 'Other'}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'व्हीलचेयर सुलभ?' : 'Wheelchair accessible?'}
                    </label>
                    <select
                        value={formData.wheelchairAccessible}
                        onChange={(e) => handleInputChange('wheelchairAccessible', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                        <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                    {language === 'hi' ? 'उपलब्ध बुनियादी सुविधाएं' : 'Basic Amenities Available'}
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.drinkingWater}
                            onChange={(e) => handleInputChange('drinkingWater', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span>{language === 'hi' ? 'पीने का पानी' : 'Drinking water'}</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.washroom}
                            onChange={(e) => handleInputChange('washroom', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span>{language === 'hi' ? 'शौचालय' : 'Washroom'}</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.waitingArea}
                            onChange={(e) => handleInputChange('waitingArea', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span>{language === 'hi' ? 'प्रतीक्षा क्षेत्र' : 'Waiting area'}</span>
                    </label>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'Wi-Fi उपलब्ध?' : 'Wi-Fi Available?'}
                    </label>
                    <select
                        value={formData.wifiAvailable}
                        onChange={(e) => handleInputChange('wifiAvailable', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                        <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'बिजली बैकअप?' : 'Electricity Backup?'}
                    </label>
                    <select
                        value={formData.electricityBackup}
                        onChange={(e) => handleInputChange('electricityBackup', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                        <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderSection3 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'डिजिटल अवसंरचना और सहायक उपकरण' : 'Digital Infrastructure & Accessories'}
            </h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                    <strong>{language === 'hi' ? 'न्यूनतम सेटअप आवश्यक:' : 'Minimum setup required:'}</strong>
                    {language === 'hi'
                        ? ' 1 कंप्यूटर, 1 प्रिंटर/स्कैनर, 1 टेबल-चेयर सेट, स्थिर इंटरनेट और 150 वर्ग फुट क्षेत्र।'
                        : ' 1 Computer, 1 Printer/Scanner, 1 Table-Chair Set, Stable Internet & 150 sq.ft area.'
                    }
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'कंप्यूटर सिस्टम' : 'Computer System'}
                    </label>
                    <select
                        value={formData.computerSystem}
                        onChange={(e) => handleInputChange('computerSystem', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Available">{language === 'hi' ? 'उपलब्ध' : 'Available'}</option>
                        <option value="Not Available">{language === 'hi' ? 'उपलब्ध नहीं' : 'Not Available'}</option>
                    </select>
                </div>

                {formData.computerSystem === 'Available' && (
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'संख्या (डेस्कटॉप/लैपटॉप)' : 'Number (Desktop/Laptop)'}
                        </label>
                        <select
                            value={formData.computerCount}
                            onChange={(e) => handleInputChange('computerCount', e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3+">3+</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'प्रिंटर/स्कैनर' : 'Printer/Scanner'}
                    </label>
                    <select
                        value={formData.printerScanner}
                        onChange={(e) => handleInputChange('printerScanner', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Available">{language === 'hi' ? 'उपलब्ध' : 'Available'}</option>
                        <option value="Not Available">{language === 'hi' ? 'उपलब्ध नहीं' : 'Not Available'}</option>
                    </select>
                </div>

                {formData.printerScanner === 'Available' && (
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'संख्या' : 'Number'}
                        </label>
                        <select
                            value={formData.printerCount}
                            onChange={(e) => handleInputChange('printerCount', e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3+">3+</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'वेबकैम/कैमरा' : 'Webcam/Camera'}
                    </label>
                    <select
                        value={formData.webcamCamera}
                        onChange={(e) => handleInputChange('webcamCamera', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Available">{language === 'hi' ? 'उपलब्ध' : 'Available'}</option>
                        <option value="Not Available">{language === 'hi' ? 'उपलब्ध नहीं' : 'Not Available'}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'पावर बैकअप (इन्वर्टर/UPS)' : 'Power Backup (Inverter/UPS)'}
                    </label>
                    <select
                        value={formData.powerBackup}
                        onChange={(e) => handleInputChange('powerBackup', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                        <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'सेटअप की लागत कौन वहन करेगा?' : 'Who will bear cost of setup?'}
                </label>
                <select
                    value={formData.setupCostBearer}
                    onChange={(e) => handleInputChange('setupCostBearer', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="Applicant (Self-funded)">{language === 'hi' ? 'आवेदक (स्व-वित्तपोषित)' : 'Applicant (Self-funded)'}</option>
                    <option value="Shared with company">{language === 'hi' ? 'कंपनी के साथ साझा' : 'Shared with company'}</option>
                    <option value="To be discussed">{language === 'hi' ? 'चर्चा की जानी है' : 'To be discussed'}</option>
                </select>
            </div>
        </div>
    );

    const renderSection4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'स्थानीय नेटवर्क और अनुभव' : 'Local Network & Experience'}
            </h3>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'क्या आपने पहले किसी सरकारी या एनजीओ परियोजना के साथ काम किया है?' : 'Have you previously worked with any government or NGO project?'}
                </label>
                <select
                    value={formData.governmentNgoExperience}
                    onChange={(e) => handleInputChange('governmentNgoExperience', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                    <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                </select>
            </div>

            {formData.governmentNgoExperience === 'Yes' && (
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'यदि हाँ, तो संक्षेप में वर्णन करें' : 'If yes, describe briefly'}
                    </label>
                    <textarea
                        value={formData.governmentNgoDetails}
                        onChange={(e) => handleInputChange('governmentNgoDetails', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'क्या आपके पास स्थानीय श्रमिक या नियोक्ता नेटवर्क है?' : 'Do you have local worker or employer network?'}
                </label>
                <select
                    value={formData.localWorkerNetwork}
                    onChange={(e) => handleInputChange('localWorkerNetwork', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="Yes">{language === 'hi' ? 'हाँ' : 'Yes'}</option>
                    <option value="No">{language === 'hi' ? 'नहीं' : 'No'}</option>
                </select>
            </div>

            {formData.localWorkerNetwork === 'Yes' && (
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'hi' ? 'यदि हाँ, तो संक्षेप में वर्णन करें' : 'If yes, describe briefly'}
                    </label>
                    <textarea
                        value={formData.localWorkerDetails}
                        onChange={(e) => handleInputChange('localWorkerDetails', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'आप शुरुआत में कितने श्रमिकों को पंजीकृत कर सकते हैं? (लगभग)' : 'Number of workers you can initially register (approx.)'}
                </label>
                <input
                    type="number"
                    value={formData.initialWorkerCount}
                    onChange={(e) => handleInputChange('initialWorkerCount', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={language === 'hi' ? 'उदा. 50' : 'e.g. 50'}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'आप श्रम सिद्धि सुविधा भागीदार क्यों बनना चाहते हैं?' : 'Why do you want to become a Shram Siddhi Facilitation Partner?'}
                </label>
                <textarea
                    value={formData.whyFranchise}
                    onChange={(e) => handleInputChange('whyFranchise', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={language === 'hi' ? 'संक्षिप्त उत्तर बॉक्स' : 'Short answer box'}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'hi' ? 'कोई संदर्भ या सिफारिश (वैकल्पिक)' : 'Any reference or recommendation (optional)'}
                </label>
                <textarea
                    value={formData.references}
                    onChange={(e) => handleInputChange('references', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        </div>
    );

    const renderSection5 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === 'hi' ? 'घोषणा और समझौता' : 'Declaration & Agreement'}
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-4">
                    {language === 'hi' ? 'चेकबॉक्स:' : 'Checkboxes:'}
                </h4>
                <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.performancePartnership}
                            onChange={(e) => handleInputChange('performancePartnership', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                            required
                        />
                        <span className="text-sm">
                            {language === 'hi'
                                ? 'मैं समझता हूं कि यह भूमिका प्रदर्शन-आधारित साझेदारी पर आधारित है और एक निश्चित फ्रेंचाइजी स्वामित्व नहीं है।'
                                : 'I understand that this role is based on performance-linked partnership and not a fixed franchise ownership.'
                            }
                        </span>
                    </label>

                    <label className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.transparentPractices}
                            onChange={(e) => handleInputChange('transparentPractices', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                            required
                        />
                        <span className="text-sm">
                            {language === 'hi'
                                ? 'मैं पारदर्शी श्रमिक पंजीकरण और नैतिक भर्ती प्रथाओं को सुनिश्चित करूंगा।'
                                : 'I will ensure transparent worker registration and ethical hiring practices.'
                            }
                        </span>
                    </label>

                    <label className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.operationalGuidelines}
                            onChange={(e) => handleInputChange('operationalGuidelines', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                            required
                        />
                        <span className="text-sm">
                            {language === 'hi'
                                ? 'मैं श्रम सिद्धि के परिचालन दिशानिर्देशों और आचार संहिता का पालन करने से सहमत हूं।'
                                : 'I agree to follow Shram Siddhi\'s operational guidelines and code of conduct.'
                            }
                        </span>
                    </label>

                    <label className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.accurateInformation}
                            onChange={(e) => handleInputChange('accurateInformation', e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                            required
                        />
                        <span className="text-sm">
                            {language === 'hi'
                                ? 'प्रदान की गई सभी जानकारी मेरी जानकारी के अनुसार सत्य है।'
                                : 'All information provided is true to the best of my knowledge.'
                            }
                        </span>
                    </label>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-foreground mb-4">
                    {language === 'hi' ? 'अपलोड अनुभाग:' : 'Upload Section:'}
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'आईडी प्रूफ अपलोड करें (आधार/पैन)' : 'Upload ID Proof (Aadhar/PAN)'}
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload('idProof', e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            {language === 'hi' ? 'प्रस्तावित केंद्र की फोटो अपलोड करें (वैकल्पिक लेकिन बेहतर)' : 'Upload Photo of Proposed Center (optional but preferred)'}
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload('centerPhoto', e.target.files[0])}
                            accept=".jpg,.jpeg,.png"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center mb-6">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-neumorphic-lg mr-4">
                                <Icon name="Building2" size={32} color="white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                                    {currentContent.title}
                                </h1>
                                <p className="text-lg font-caption text-primary">
                                    {currentContent.subtitle}
                                </p>
                            </div>
                        </div>
                        <p className="text-foreground max-w-2xl mx-auto">
                            {currentContent.description}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-8 text-white">
                        <h3 className="text-xl font-semibold mb-4">
                            {language === 'hi' ? 'भागीदारी के लाभ:' : 'Partnership Benefits:'}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {currentContent.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <Icon name="Check" size={16} />
                                    <span className="text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-foreground">
                                {language === 'hi' ? 'प्रगति:' : 'Progress:'} {currentSection}/5
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {Math.round((currentSection / 5) * 100)}%
                            </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentSection / 5) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Section Navigation */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {currentContent.sections.map((section, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSection(index + 1)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentSection === index + 1
                                    ? 'bg-primary text-primary-foreground shadow-neumorphic-pressed'
                                    : currentSection > index + 1
                                        ? 'bg-success text-success-foreground'
                                        : 'bg-surface text-foreground hover:bg-muted'
                                    }`}
                            >
                                {index + 1}. {section}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 shadow-neumorphic-lg">
                        {currentSection === 1 && renderSection1()}
                        {currentSection === 2 && renderSection2()}
                        {currentSection === 3 && renderSection3()}
                        {currentSection === 4 && renderSection4()}
                        {currentSection === 5 && renderSection5()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-border">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevSection}
                                disabled={currentSection === 1}
                                iconName="ChevronLeft"
                            >
                                {language === 'hi' ? 'पिछला' : 'Previous'}
                            </Button>

                            {currentSection < 5 ? (
                                <Button
                                    type="button"
                                    onClick={nextSection}
                                    iconName="ChevronRight"
                                    iconPosition="right"
                                >
                                    {language === 'hi' ? 'अगला' : 'Next'}
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    iconName="Send"
                                    iconPosition="right"
                                >
                                    {language === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
                                </Button>
                            )}
                        </div>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 bg-muted rounded-xl p-6">
                        <h4 className="font-semibold text-foreground mb-3">
                            {language === 'hi' ? 'आवेदन के बाद:' : 'After Application:'}
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p><strong>{language === 'hi' ? 'अनुभाग 1:' : 'SECTION 1:'}</strong> {language === 'hi' ? 'आवेदक विवरण' : 'Applicant Details'}</p>
                            <p><strong>{language === 'hi' ? 'अनुभाग 2:' : 'SECTION 2:'}</strong> {language === 'hi' ? 'केंद्र अवसंरचना विवरण' : 'Center Infrastructure Details'}</p>
                            <p><strong>{language === 'hi' ? 'अनुभाग 3:' : 'SECTION 3:'}</strong> {language === 'hi' ? 'डिजिटल अवसंरचना और सहायक उपकरण' : 'Digital Infrastructure & Accessories'}</p>
                            <p><strong>{language === 'hi' ? 'अनुभाग 4:' : 'SECTION 4:'}</strong> {language === 'hi' ? 'स्थानीय नेटवर्क और अनुभव' : 'Local Network & Experience'}</p>
                            <p><strong>{language === 'hi' ? 'अनुभाग 5:' : 'SECTION 5:'}</strong> {language === 'hi' ? 'घोषणा और समझौता' : 'Declaration & Agreement'}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FranchiseApplication;