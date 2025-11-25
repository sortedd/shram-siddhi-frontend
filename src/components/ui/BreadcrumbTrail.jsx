import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from './ContextualNavigation';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();
  const { language, isAuthenticated } = useNavigation();

  // Only show breadcrumbs for authenticated admin users
  if (!isAuthenticated) {
    return null;
  }

  // Route to breadcrumb mapping
  const routeBreadcrumbs = {
    '/admin-dashboard': [
      { label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', path: '/admin-dashboard' }
    ],
    '/worker-profile-details': [
      { label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', path: '/admin-dashboard' },
      { label: language === 'hi' ? 'श्रमिक प्रोफाइल' : 'Worker Profile', path: '/worker-profile-details' }
    ]
  };

  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs?.[location?.pathname] || [];

  // Don't render if no breadcrumbs or only one item
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {index === breadcrumbs?.length - 1 ? (
              <span className="text-foreground font-medium">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;