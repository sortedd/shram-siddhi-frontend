import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../components/ui/ContextualNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { apiService } from '../../services/api';

const DatabaseViewer = () => {
  const { language } = useNavigation();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 20;

  useEffect(() => {
    loadTables();
    loadStats();
  }, []);

  const loadTables = async () => {
    try {
      const response = await apiService.admin.getTables();
      setTables(response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.admin.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadTableData = async (tableName, page = 1) => {
    if (!tableName) return;

    setLoading(true);
    try {
      const offset = (page - 1) * recordsPerPage;
      const response = await apiService.admin.getTableData(tableName, recordsPerPage, offset);

      setTableData(response.data.data);
      setTotalRecords(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
    loadTableData(tableName, 1);
  };

  const handlePageChange = (page) => {
    loadTableData(selectedTable, page);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    return value.toString();
  };

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            {language === 'hi' ? 'डेटाबेस व्यूअर' : 'Database Viewer'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'डेटाबेस टेबल और डेटा देखें' : 'View database tables and data'}
          </p>
        </div>

        {/* Database Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(stats).map(([table, count]) => (
            <div key={table} className="bg-card rounded-lg shadow-neumorphic p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {table.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-neumorphic p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {language === 'hi' ? 'टेबल्स' : 'Tables'}
              </h3>
              <div className="space-y-2">
                {tables.map((table) => (
                  <button
                    key={table.name}
                    onClick={() => handleTableSelect(table.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedTable === table.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Table" size={16} />
                      <span className="text-sm">{table.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Data */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg shadow-neumorphic p-6">
              {selectedTable ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedTable} ({totalRecords} records)
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTableData(selectedTable, currentPage)}
                    >
                      <Icon name="RefreshCw" size={16} />
                      <span className="ml-2">Refresh</span>
                    </Button>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : tableData.length > 0 ? (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              {Object.keys(tableData[0]).map((column) => (
                                <th key={column} className="text-left py-2 px-3 font-medium text-foreground">
                                  {column}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, index) => (
                              <tr key={index} className="border-b border-border hover:bg-muted/50">
                                {Object.values(row).map((value, cellIndex) => (
                                  <td key={cellIndex} className="py-2 px-3 text-muted-foreground">
                                    {formatValue(value)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <Icon name="ChevronLeft" size={16} />
                            </Button>
                            <span className="text-sm text-foreground">
                              {currentPage} / {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              <Icon name="ChevronRight" size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No data found in this table
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a table to view its data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;