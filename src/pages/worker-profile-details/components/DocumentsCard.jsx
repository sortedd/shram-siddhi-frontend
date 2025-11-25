import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DocumentsCard = ({ worker, language }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const documents = [
    {
      id: 'aadhaar',
      name: language === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card',
      url: worker?.documents?.aadhaarImage,
      verified: worker?.documents?.aadhaarVerified,
      type: 'image'
    },
    {
      id: 'photo',
      name: language === 'hi' ? 'व्यक्तिगत फोटो' : 'Personal Photo',
      url: worker?.documents?.photo,
      verified: true,
      type: 'image'
    }
  ];

  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleDownload = (document) => {
    // Mock download functionality
    const link = document?.createElement('a');
    link.href = document?.url;
    link.download = `${worker?.fullName}_${document?.id}.jpg`;
    link?.click();
  };

  return (
    <>
      <div className="bg-surface rounded-xl p-6 shadow-neumorphic-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {language === 'hi' ? 'दस्तावेज़' : 'Documents'}
            </h3>
          </div>
          <div className="text-xs text-muted-foreground">
            {documents?.filter(doc => doc?.verified)?.length}/{documents?.length} {language === 'hi' ? 'सत्यापित' : 'verified'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents?.map((document) => (
            <div key={document?.id} className="bg-muted rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">{document?.name}</h4>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={document?.verified ? "CheckCircle" : "AlertCircle"} 
                    size={14} 
                    className={document?.verified ? "text-success" : "text-warning"} 
                  />
                  <span className={`text-xs font-medium ${document?.verified ? "text-success" : "text-warning"}`}>
                    {document?.verified 
                      ? (language === 'hi' ? 'सत्यापित' : 'Verified')
                      : (language === 'hi' ? 'लंबित' : 'Pending')
                    }
                  </span>
                </div>
              </div>

              <div className="relative mb-3">
                <Image
                  src={document?.url}
                  alt={document?.name}
                  className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleDocumentView(document)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
                  <Icon name="Eye" size={24} color="white" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDocumentView(document)}
                  className="flex-1"
                  iconName="Eye"
                  iconPosition="left"
                >
                  {language === 'hi' ? 'देखें' : 'View'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(document)}
                  iconName="Download"
                  iconPosition="left"
                >
                  {language === 'hi' ? 'डाउनलोड' : 'Download'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Document Modal */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-surface rounded-xl max-w-4xl max-h-[90vh] overflow-hidden shadow-neumorphic-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {selectedDocument?.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                iconName="X"
              />
            </div>
            <div className="p-4">
              <Image
                src={selectedDocument?.url}
                alt={selectedDocument?.name}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="flex justify-end space-x-2 p-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => handleDownload(selectedDocument)}
                iconName="Download"
                iconPosition="left"
              >
                {language === 'hi' ? 'डाउनलोड' : 'Download'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                {language === 'hi' ? 'बंद करें' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentsCard;