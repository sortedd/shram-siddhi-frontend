import React from 'react';
import Icon from '../../../components/AppIcon';

const EditHistoryCard = ({ worker, language }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
          <Icon name="History" size={20} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'hi' ? 'संपादन इतिहास' : 'Edit History'}
        </h3>
      </div>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {worker?.editHistory?.map((edit, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="User" size={14} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{edit?.adminName}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(edit.timestamp)?.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edit?.action}</p>
              {edit?.changes && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">
                    {language === 'hi' ? 'परिवर्तन:' : 'Changes:'} 
                  </span>
                  <span className="ml-1">{edit?.changes}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {worker?.editHistory?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {language === 'hi' ? 'कोई संपादन इतिहास उपलब्ध नहीं है' : 'No edit history available'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EditHistoryCard;