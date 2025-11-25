import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationCard = ({ worker, language }) => {
  const mapSrc = `https://www.google.com/maps?q=${worker?.location?.latitude},${worker?.location?.longitude}&z=14&output=embed`;

  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'स्थान विवरण' : 'Location Details'}
        </h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              {language === 'hi' ? 'अक्षांश' : 'Latitude'}
            </label>
            <p className="text-foreground font-mono text-sm">{worker?.location?.latitude}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              {language === 'hi' ? 'देशांतर' : 'Longitude'}
            </label>
            <p className="text-foreground font-mono text-sm">{worker?.location?.longitude}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {language === 'hi' ? 'पंजीकरण स्थान' : 'Registration Location'}
          </label>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`${worker?.fullName} Registration Location`}
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
              className="border-0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>
            {language === 'hi' ? 'स्थान कैप्चर किया गया:' : 'Location captured:'} {' '}
            {new Date(worker.locationCapturedAt)?.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;