import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Button from '../../../components/ui/Button';

const BackToHome = () => {
  const { language } = useNavigation();

  return (
    <div className="mt-8 text-center">
      <Link to="/homepage">
        <Button 
          variant="ghost" 
          iconName="ArrowLeft" 
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          {language === 'hi' ? 'होम पेज पर वापस जाएं' : 'Back to Homepage'}
        </Button>
      </Link>
    </div>
  );
};

export default BackToHome;