// Worker Data Management Utility - Now using real API
import { apiService, handleApiError } from '../services/api';

export const workerDataManager = {
  // Save worker enrollment data
  saveWorkerData: async (workerData) => {
    try {
      const response = await apiService.workers.create(workerData);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error saving worker data:', apiError);
      throw new Error(apiError.message);
    }
  },

  // Get all workers
  getAllWorkers: async () => {
    try {
      const response = await apiService.workers.getAll();
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error getting workers:', apiError);
      return [];
    }
  },

  // Update worker status
  updateWorkerStatus: async (workerId, status) => {
    try {
      await apiService.workers.updateStatus(workerId, status);
      return true;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error updating worker status:', apiError);
      return false;
    }
  },

  // Update worker verification
  updateWorkerVerification: async (workerId, verified) => {
    try {
      await apiService.workers.updateVerification(workerId, verified);
      return true;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error updating worker verification:', apiError);
      return false;
    }
  },

  // Get worker by ID
  getWorkerById: async (workerId) => {
    try {
      const response = await apiService.workers.getById(workerId);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error getting worker by ID:', apiError);
      return null;
    }
  },

  // Export workers as CSV
  exportWorkersCSV: async () => {
    try {
      const response = await apiService.workers.exportCSV();
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `workers_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return 'Export completed successfully';
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error exporting CSV:', apiError);
      throw new Error(apiError.message);
    }
  },

  // Get statistics
  getStatistics: async () => {
    try {
      const response = await apiService.statistics.get();
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error getting statistics:', apiError);
      return {
        total: 0, active: 0, pending: 0, inactive: 0, verified: 0, unverified: 0
      };
    }
  },

  // Get analytics data
  getAnalytics: async (period = 'daily') => {
    try {
      const response = await apiService.statistics.getAnalytics(period);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Error getting analytics:', apiError);
      return [];
    }
  }
};