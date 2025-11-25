import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { workerDataManager } from '../../../utils/workerDataManager';

const WorkerEnrollmentMap = () => {
  const { language } = useNavigation();
  const [mapView, setMapView] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [workerLocations, setWorkerLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkerLocations = async () => {
      setLoading(true);
      try {
        const workers = await workerDataManager.getAllWorkers();
        
        // Filter workers with location data
        const workersWithLocation = workers
          .filter(worker => worker.latitude && worker.longitude)
          .map(worker => ({
            id: worker.id,
            name: worker.full_name,
            skill: worker.primary_skill,
            lat: parseFloat(worker.latitude),
            lng: parseFloat(worker.longitude),
            city: worker.city,
            enrollmentDate: worker.enrollment_date,
            status: worker.status
          }));
        
        setWorkerLocations(workersWithLocation);
      } catch (error) {
        console.error('Error loading worker locations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkerLocations();
  }, []);

  const skillColors = {
    Mason: '#EF4444',
    Plumber: '#3B82F6',
    Electrician: '#F59E0B',
    Carpenter: '#10B981'
  };

  const handleMarkerClick = (worker) => {
    setSelectedMarker(worker);
  };

  const getFilteredWorkers = () => {
    if (mapView === 'all') return workerLocations;
    return workerLocations?.filter(worker => worker?.skill === mapView);
  };

  return (
    <div className="bg-card rounded-lg shadow-neumorphic-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            {language === 'hi' ? 'श्रमिक नामांकन मानचित्र' : 'Worker Enrollment Map'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' ?'पंजीकृत श्रमिकों का भौगोलिक वितरण' :'Geographic distribution of registered workers'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={mapView}
            onChange={(e) => setMapView(e?.target?.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">
              {language === 'hi' ? 'सभी कौशल' : 'All Skills'}
            </option>
            <option value="Mason">
              {language === 'hi' ? 'राजमिस्त्री' : 'Mason'}
            </option>
            <option value="Plumber">
              {language === 'hi' ? 'नलसाज़' : 'Plumber'}
            </option>
            <option value="Electrician">
              {language === 'hi' ? 'इलेक्ट्रीशियन' : 'Electrician'}
            </option>
            <option value="Carpenter">
              {language === 'hi' ? 'बढ़ई' : 'Carpenter'}
            </option>
          </select>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span className="ml-2">
              {language === 'hi' ? 'निर्यात' : 'Export'}
            </span>
          </Button>
        </div>
      </div>
      <div className="relative">
        {/* Map Container */}
        <div className="w-full h-96 bg-muted rounded-lg overflow-hidden relative">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Worker Enrollment Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=28.6139,77.2090&z=5&output=embed"
            className="border-0"
          />
          
          {/* Map Overlay with Worker Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {getFilteredWorkers()?.map((worker) => (
              <div
                key={worker?.id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + (worker?.id * 15)}%`,
                  top: `${30 + (worker?.id * 10)}%`
                }}
                onClick={() => handleMarkerClick(worker)}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: skillColors?.[worker?.skill] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            {language === 'hi' ? 'कौशल प्रकार:' : 'Skill Types:'}
          </span>
          {Object.entries(skillColors)?.map(([skill, color]) => (
            <div key={skill} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground">
                {language === 'hi' ? 
                  (skill === 'Mason' ? 'राजमिस्त्री' :
                   skill === 'Plumber' ? 'नलसाज़' :
                   skill === 'Electrician' ? 'इलेक्ट्रीशियन' :
                   skill === 'Carpenter' ? 'बढ़ई' : skill) : skill
                }
              </span>
            </div>
          ))}
        </div>

        {/* Selected Marker Info */}
        {selectedMarker && (
          <div className="mt-4 p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">{selectedMarker?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker?.skill} • {selectedMarker?.city}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'hi' ? 'नामांकन:' : 'Enrolled:'} {selectedMarker?.enrollmentDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMarker(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerEnrollmentMap;