import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { workerDataManager } from '../../../utils/workerDataManager';

const WorkerManagementTable = () => {
  const { language } = useNavigation();
  const [sortBy, setSortBy] = useState('enrollment_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Load workers from API
  useEffect(() => {
    const loadWorkers = async () => {
      setLoading(true);
      try {
        const allWorkers = await workerDataManager?.getAllWorkers();
        setWorkers(allWorkers);
      } catch (error) {
        console.error('Error loading workers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkers();
    
    // Refresh data every 30 seconds to show new enrollments
    const interval = setInterval(loadWorkers, 30000);
    return () => clearInterval(interval);
  }, []);

  // Generate skill options from actual worker data
  const getSkillOptions = () => {
    const skills = [...new Set(workers?.map(w => w?.primary_skill).filter(Boolean))];
    return [
      { value: '', label: language === 'hi' ? 'सभी कौशल' : 'All Skills' },
      ...skills?.map(skill => ({
        value: skill,
        label: language === 'hi' ? 
          (skill === 'Mason' ? 'राजमिस्त्री' :
           skill === 'Plumber' ? 'नलसाज़' :
           skill === 'Electrician' ? 'इलेक्ट्रीशियन' :
           skill === 'Carpenter' ? 'बढ़ई' : skill) : skill
      }))
    ];
  };

  // Generate location options from actual worker data
  const getLocationOptions = () => {
    const locations = [...new Set(workers?.map(w => w?.city).filter(Boolean))];
    return [
      { value: '', label: language === 'hi' ? 'सभी स्थान' : 'All Locations' },
      ...locations?.map(location => ({ value: location, label: location }))
    ];
  };

  const getFilteredWorkers = () => {
    return workers?.filter(worker => {
      const matchesSearch = worker?.full_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           worker?.mobile_number?.includes(searchTerm) ||
                           worker?.aadhaar_number?.includes(searchTerm);
      const matchesSkill = !filterSkill || worker?.primary_skill === filterSkill;
      const matchesLocation = !filterLocation || worker?.city === filterLocation;
      
      return matchesSearch && matchesSkill && matchesLocation;
    });
  };

  const getSortedWorkers = () => {
    const filtered = getFilteredWorkers();
    return filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'dailyWage') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }
      
      if (sortBy === 'enrollment_date') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const paginatedWorkers = () => {
    const sorted = getSortedWorkers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted?.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(getSortedWorkers()?.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        color: 'bg-success/10 text-success', 
        label: language === 'hi' ? 'सक्रिय' : 'Active' 
      },
      pending: { 
        color: 'bg-warning/10 text-warning', 
        label: language === 'hi' ? 'लंबित' : 'Pending' 
      },
      inactive: { 
        color: 'bg-error/10 text-error', 
        label: language === 'hi' ? 'निष्क्रिय' : 'Inactive' 
      }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    try {
      const csvContent = workerDataManager?.exportWorkersCSV();
      
      if (csvContent === 'No data available for export') {
        alert(language === 'hi' ?'निर्यात के लिए कोई डेटा उपलब्ध नहीं है' :'No data available for export'
        );
        return;
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL?.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workers-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      window.URL?.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert(language === 'hi' ?'निर्यात में त्रुटि हुई' :'Error occurred during export'
      );
    }
  };

  const handleStatusChange = (workerId, newStatus) => {
    const success = workerDataManager?.updateWorkerStatus(workerId, newStatus);
    if (success) {
      // Refresh the workers data
      setWorkers(workerDataManager?.getAllWorkers());
    }
  };

  const handleVerificationToggle = (workerId, currentVerified) => {
    const success = workerDataManager?.updateWorkerVerification(workerId, !currentVerified);
    if (success) {
      // Refresh the workers data
      setWorkers(workerDataManager?.getAllWorkers());
    }
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg shadow-neumorphic-lg p-6">
        <div className="text-center py-8">
          <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'hi' ? 'डेटा लोड हो रहा है...' : 'Loading data...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-neumorphic-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            {language === 'hi' ? 'श्रमिक प्रबंधन' : 'Worker Management'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'hi' 
              ? `कुल ${getSortedWorkers()?.length} श्रमिक पंजीकृत` 
              : `Total ${getSortedWorkers()?.length} workers registered`
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" onClick={handleExport} disabled={workers?.length === 0}>
            <Icon name="Download" size={16} />
            <span className="ml-2">
              {language === 'hi' ? 'डेटा निर्यात करें' : 'Export Data'}
            </span>
          </Button>
        </div>
      </div>

      {workers?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {language === 'hi' ? 'कोई श्रमिक पंजीकृत नहीं' : 'No Workers Registered'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'hi' ?'जब श्रमिक पंजीकरण फॉर्म भरेंगे तो वे यहाँ दिखाई देंगे' :'Workers will appear here when they complete the enrollment form'
            }
          </p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Input
              type="search"
              placeholder={language === 'hi' ? 'नाम, फोन या आधार खोजें...' : 'Search name, phone, or aadhaar...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            
            <Select
              options={getSkillOptions()}
              value={filterSkill}
              onChange={setFilterSkill}
              placeholder={language === 'hi' ? 'कौशल फिल्टर' : 'Filter by skill'}
            />
            
            <Select
              options={getLocationOptions()}
              value={filterLocation}
              onChange={setFilterLocation}
              placeholder={language === 'hi' ? 'स्थान फिल्टर' : 'Filter by location'}
            />
            
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setFilterSkill('');
                setFilterLocation('');
              }}
            >
              <Icon name="X" size={16} />
              <span className="ml-2">
                {language === 'hi' ? 'फिल्टर साफ़ करें' : 'Clear Filters'}
              </span>
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('full_name')}
                      className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                    >
                      <span>{language === 'hi' ? 'नाम' : 'Name'}</span>
                      <Icon name="ArrowUpDown" size={14} />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('primary_skill')}
                      className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                    >
                      <span>{language === 'hi' ? 'कौशल' : 'Skill'}</span>
                      <Icon name="ArrowUpDown" size={14} />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'स्थान' : 'Location'}
                    </span>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('dailyWage')}
                      className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                    >
                      <span>{language === 'hi' ? 'दैनिक मजदूरी' : 'Daily Wage'}</span>
                      <Icon name="ArrowUpDown" size={14} />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'स्थिति' : 'Status'}
                    </span>
                  </th>
                  <th className="text-left py-3 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'कार्य' : 'Actions'}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedWorkers()?.map((worker) => (
                  <tr key={worker?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {worker?.photo ? (
                            <img 
                              src={worker?.photo} 
                              alt="Profile" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <Icon name="User" size={20} color="var(--color-primary)" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{worker?.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'hi' ? 'उम्र' : 'Age'}: {worker?.age} • {worker?.mobile_number}
                            {worker?.verified && (
                              <Icon name="CheckCircle" size={12} className="inline ml-1 text-success" />
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="text-sm text-foreground">
                          {language === 'hi' ? 
                            (worker?.primary_skill === 'Mason' ? 'राजमिस्त्री' :
                             worker?.primary_skill === 'Plumber' ? 'नलसाज़' :
                             worker?.primary_skill === 'Electrician' ? 'इलेक्ट्रीशियन' :
                             worker?.primary_skill === 'Carpenter' ? 'बढ़ई' : worker?.primary_skill) : worker?.primary_skill
                          }
                        </span>
                        {worker?.experience && (
                          <p className="text-xs text-muted-foreground">
                            {worker?.experience} {language === 'hi' ? 'साल अनुभव' : 'years exp'}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="text-sm text-muted-foreground">{worker?.city}, {worker?.state}</span>
                        {worker?.location && (
                          <p className="text-xs text-muted-foreground">
                            <Icon name="MapPin" size={10} className="inline mr-1" />
                            {language === 'hi' ? 'स्थान उपलब्ध' : 'Location available'}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">
                        ₹{worker?.dailyWage || 'N/A'}
                      </span>
                      {worker?.availability && (
                        <p className="text-xs text-muted-foreground">{worker?.availability}</p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {getStatusBadge(worker?.status)}
                        <p className="text-xs text-muted-foreground">
                          {new Date(worker?.enrollment_date)?.toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Link to="/worker-profile-details" state={{ workerId: worker?.id, workerData: worker }}>
                          <Button variant="ghost" size="sm" title={language === 'hi' ? 'विवरण देखें' : 'View Details'}>
                            <Icon name="Eye" size={16} />
                          </Button>
                        </Link>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleVerificationToggle(worker?.id, worker?.verified)}
                          title={language === 'hi' 
                            ? (worker?.verified ? 'सत्यापन हटाएं' : 'सत्यापित करें')
                            : (worker?.verified ? 'Remove verification' : 'Verify worker')
                          }
                        >
                          <Icon name={worker?.verified ? "CheckCircle" : "Clock"} size={16} />
                        </Button>
                        
                        <select
                          value={worker?.status}
                          onChange={(e) => handleStatusChange(worker?.id, e?.target?.value)}
                          className="text-xs px-2 py-1 rounded border"
                        >
                          <option value="pending">{language === 'hi' ? 'लंबित' : 'Pending'}</option>
                          <option value="active">{language === 'hi' ? 'सक्रिय' : 'Active'}</option>
                          <option value="inactive">{language === 'hi' ? 'निष्क्रिय' : 'Inactive'}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                {language === 'hi' 
                  ? `पृष्ठ ${currentPage} का ${totalPages} (कुल ${getSortedWorkers()?.length} में से ${paginatedWorkers()?.length} दिखा रहे हैं)` 
                  : `Page ${currentPage} of ${totalPages} (Showing ${paginatedWorkers()?.length} of ${getSortedWorkers()?.length} total)`
                }
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                  <span className="ml-1">
                    {language === 'hi' ? 'पिछला' : 'Previous'}
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <span className="mr-1">
                    {language === 'hi' ? 'अगला' : 'Next'}
                  </span>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkerManagementTable;