import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfessionalDetailsCard = ({ worker, language }) => {
  const getSkillIcon = (skill) => {
    const skillIcons = {
      'Mason': 'Hammer',
      'Plumber': 'Wrench',
      'Carpenter': 'Saw',
      'Electrician': 'Zap',
      'Painter': 'Paintbrush',
      'Welder': 'Flame'
    };
    return skillIcons?.[skill] || 'Tool';
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      'Full-time': 'text-success',
      'Part-time': 'text-warning',
      'Seasonal': 'text-secondary'
    };
    return colors?.[availability] || 'text-foreground';
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Briefcase" size={20} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'व्यावसायिक विवरण' : 'Professional Details'}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'कौशल प्रकार' : 'Skill Type'}
            </label>
            <div className="flex items-center space-x-3 bg-muted rounded-lg p-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name={getSkillIcon(worker?.skillType)} size={16} color="white" />
              </div>
              <span className="text-foreground font-medium">{worker?.skillType}</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'दैनिक मजदूरी अपेक्षा' : 'Daily Wage Expectation'}
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="IndianRupee" size={18} className="text-success" />
              <span className="text-xl font-semibold text-success">
                {worker?.dailyWage?.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-muted-foreground">
                {language === 'hi' ? 'प्रति दिन' : 'per day'}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'कार्य उपलब्धता' : 'Work Availability'}
            </label>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full bg-current ${getAvailabilityColor(worker?.availability)}`} />
              <span className={`font-medium ${getAvailabilityColor(worker?.availability)}`}>
                {language === 'hi' 
                  ? (worker?.availability === 'Full-time' ? 'पूर्णकालिक' : 
                     worker?.availability === 'Part-time' ? 'अंशकालिक' : 'मौसमी')
                  : worker?.availability
                }
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'अनुभव' : 'Experience'}
            </label>
            <p className="text-foreground">
              {worker?.experience} {language === 'hi' ? 'वर्ष' : 'years'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'कार्य इतिहास' : 'Work History'}
            </label>
            <div className="space-y-2">
              {worker?.workHistory?.map((work, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">{work?.project}</p>
                  <p className="text-xs text-muted-foreground">{work?.duration}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {language === 'hi' ? 'रेटिंग' : 'Rating'}
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={star <= worker?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({worker?.rating}/5)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailsCard;