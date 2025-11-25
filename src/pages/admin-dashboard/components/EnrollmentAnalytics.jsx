import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { workerDataManager } from '../../../utils/workerDataManager';

const EnrollmentAnalytics = () => {
  const { language } = useNavigation();
  const [activeTab, setActiveTab] = useState('daily');
  const [analyticsData, setAnalyticsData] = useState({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [skillDistribution, setSkillDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      try {
        // Load analytics for all periods
        const [dailyData, weeklyData, monthlyData, workers] = await Promise.all([
          workerDataManager.getAnalytics('daily'),
          workerDataManager.getAnalytics('weekly'),
          workerDataManager.getAnalytics('monthly'),
          workerDataManager.getAllWorkers()
        ]);

        // Format analytics data
        setAnalyticsData({
          daily: dailyData.map(item => ({
            ...item,
            name: formatDate(item.period, 'daily')
          })),
          weekly: weeklyData.map(item => ({
            ...item,
            name: formatDate(item.period, 'weekly')
          })),
          monthly: monthlyData.map(item => ({
            ...item,
            name: formatDate(item.period, 'monthly')
          }))
        });

        // Calculate skill distribution
        const skillCounts = {};
        workers.forEach(worker => {
          const skill = worker.primary_skill || 'Other';
          skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });

        const total = workers.length;
        const skillColors = {
          'Mason': '#EF4444',
          'Plumber': '#3B82F6',
          'Electrician': '#F59E0B',
          'Carpenter': '#10B981',
          'Other': '#6B7280'
        };

        const skillData = Object.entries(skillCounts).map(([skill, count]) => ({
          name: language === 'hi' ? translateSkill(skill) : skill,
          value: total > 0 ? Math.round((count / total) * 100) : 0,
          color: skillColors[skill] || '#6B7280'
        }));

        setSkillDistribution(skillData);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [language]);

  const formatDate = (dateStr, period) => {
    if (!dateStr) return '';
    
    try {
      const date = new Date(dateStr);
      
      switch (period) {
        case 'daily':
          return language === 'hi' 
            ? date.toLocaleDateString('hi-IN', { day: '2-digit', month: 'short' })
            : date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
        case 'weekly':
          return language === 'hi' 
            ? `सप्ताह ${dateStr.split('-W')[1]}`
            : `Week ${dateStr.split('-W')[1]}`;
        case 'monthly':
          return language === 'hi'
            ? date.toLocaleDateString('hi-IN', { month: 'short' })
            : date.toLocaleDateString('en-US', { month: 'short' });
        default:
          return dateStr;
      }
    } catch (error) {
      return dateStr;
    }
  };

  const translateSkill = (skill) => {
    const translations = {
      'Mason': 'राजमिस्त्री',
      'Plumber': 'नलसाज़',
      'Electrician': 'इलेक्ट्रीशियन',
      'Carpenter': 'बढ़ई',
      'Other': 'अन्य'
    };
    return translations[skill] || skill;
  };

  const getCurrentData = () => {
    return analyticsData[activeTab] || [];
  };

  const tabs = [
    { id: 'daily', label: language === 'hi' ? 'दैनिक' : 'Daily', icon: 'Calendar' },
    { id: 'weekly', label: language === 'hi' ? 'साप्ताहिक' : 'Weekly', icon: 'CalendarDays' },
    { id: 'monthly', label: language === 'hi' ? 'मासिक' : 'Monthly', icon: 'CalendarRange' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Enrollment Trends */}
      <div className="lg:col-span-2 bg-card rounded-lg shadow-neumorphic-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              {language === 'hi' ? 'नामांकन रुझान' : 'Enrollment Trends'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'समय के साथ पंजीकरण पैटर्न' : 'Registration patterns over time'}
            </p>
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span className="ml-2">
              {language === 'hi' ? 'निर्यात' : 'Export'}
            </span>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out flex-1 justify-center
                ${activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-neumorphic-pressed'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-neumorphic-md)'
                }}
              />
              <Bar 
                dataKey="enrollments" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Skill Distribution */}
      <div className="bg-card rounded-lg shadow-neumorphic-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {language === 'hi' ? 'कौशल वितरण' : 'Skill Distribution'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ? 'श्रमिकों के कौशल का प्रतिशत' : 'Percentage of worker skills'}
          </p>
        </div>

        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {skillDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-neumorphic-md)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {skillDistribution?.map((skill) => (
            <div key={skill?.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: skill?.color }}
                />
                <span className="text-sm text-foreground">{skill?.name}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {skill?.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentAnalytics;