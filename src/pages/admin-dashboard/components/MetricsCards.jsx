import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import { workerDataManager } from '../../../utils/workerDataManager';

const MetricsCards = () => {
  const { language } = useNavigation();
  const [stats, setStats] = useState({
    total: 0, active: 0, pending: 0, inactive: 0, verified: 0, unverified: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const statistics = await workerDataManager?.getStatistics();
        setStats(statistics);
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Update stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      id: 'total',
      title: language === 'hi' ? 'कुल श्रमिक' : 'Total Workers',
      value: stats?.total,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase'
    },
    {
      id: 'active',
      title: language === 'hi' ? 'सक्रिय श्रमिक' : 'Active Workers',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'increase'
    },
    {
      id: 'pending',
      title: language === 'hi' ? 'लंबित अनुमोदन' : 'Pending Approval',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '+5%',
      changeType: 'increase'
    },
    {
      id: 'verified',
      title: language === 'hi' ? 'सत्यापित प्रोफाइल' : 'Verified Profiles',
      value: stats?.verified,
      icon: 'Shield',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4]?.map(i => (
          <div key={i} className="bg-card rounded-lg shadow-neumorphic p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card rounded-lg shadow-neumorphic p-6 hover:shadow-neumorphic-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Icon 
                name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className={metric?.changeType === 'increase' ? 'text-success' : 'text-error'} 
              />
              <span className={metric?.changeType === 'increase' ? 'text-success' : 'text-error'}>
                {metric?.change}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {metric?.value?.toLocaleString()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {metric?.title}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {language === 'hi' ? 'पिछले महीने से' : 'From last month'}
              </span>
              <span>
                {new Date()?.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;