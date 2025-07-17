import { useState, useEffect } from 'react';
import { EPaperService, EPaperInfo } from '../services/epaperService';

export const useEPaper = () => {
  const [ePaperInfo, setEPaperInfo] = useState<EPaperInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availablePapers, setAvailablePapers] = useState<EPaperInfo[]>([]);

  const ePaperService = EPaperService.getInstance();

  // Load today's e-paper on component mount
  useEffect(() => {
    loadTodayEPaper();
  }, []);

  const loadTodayEPaper = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const paperInfo = await ePaperService.getTodayEPaper();
      setEPaperInfo(paperInfo);
    } catch (err) {
      setError('Failed to load e-paper information');
      console.error('Error loading e-paper:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadEPaperForDate = async (date: Date) => {
    try {
      setIsLoading(true);
      setError(null);
      const paperInfo = await ePaperService.getEPaperForDate(date);
      setEPaperInfo(paperInfo);
    } catch (err) {
      setError('Failed to load e-paper for selected date');
      console.error('Error loading e-paper for date:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailablePapers = async () => {
    try {
      const papers = await ePaperService.getAvailableEPapers();
      setAvailablePapers(papers);
    } catch (err) {
      console.error('Error loading available papers:', err);
    }
  };

  const refreshEPaper = async () => {
    await loadTodayEPaper();
    await loadAvailablePapers();
  };

  return {
    ePaperInfo,
    isLoading,
    error,
    availablePapers,
    loadTodayEPaper,
    loadEPaperForDate,
    loadAvailablePapers,
    refreshEPaper
  };
};
