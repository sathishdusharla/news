import React, { useState, useEffect } from 'react';
import { Calendar, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import EPaperViewer from './EPaperViewer';
import { EPaperInfo, EPaperService } from '../services/epaperService';

const Archive: React.FC = () => {
  const [availablePapers, setAvailablePapers] = useState<EPaperInfo[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<EPaperInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadAvailablePapers();
  }, []);

  const loadAvailablePapers = async () => {
    try {
      setIsLoading(true);
      const epaperService = EPaperService.getInstance();
      const papers = await epaperService.getAvailableEPapers(30);
      setAvailablePapers(papers);
    } catch (error) {
      console.error('Error loading available papers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshArchive = () => {
    loadAvailablePapers();
  };

  const handleViewPaper = (paper: EPaperInfo) => {
    if (paper.exists) {
      setSelectedPaper(paper);
    }
  };

  const handleBackToArchive = () => {
    setSelectedPaper(null);
  };

  const handleDownload = (paper: EPaperInfo) => {
    if (paper.exists) {
      const link = document.createElement('a');
      link.href = paper.url;
      link.download = paper.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Pagination
  const totalPages = Math.ceil(availablePapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPapers = availablePapers.slice(startIndex, startIndex + itemsPerPage);

  if (selectedPaper) {
    return (
      <div>
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleBackToArchive}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Archive</span>
          </button>
        </div>
        
        <EPaperViewer
          pdfUrl={selectedPaper.exists ? selectedPaper.url : null}
          date={selectedPaper.date}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">News Archive</h1>
        <p className="text-gray-600">Browse previous e-papers</p>
        <button
          onClick={refreshArchive}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Archive'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading archive...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentPapers.map((paper, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md border overflow-hidden transition-all ${
                  paper.exists
                    ? 'hover:shadow-lg hover:scale-105 cursor-pointer'
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-center h-32 bg-gray-100 rounded mb-4">
                    <Calendar className={`w-12 h-12 ${paper.exists ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  
                  <h3 className="font-semibold text-center text-gray-800 mb-2">
                    {paper.date}
                  </h3>
                  
                  <div className="flex space-x-2">
                    {paper.exists ? (
                      <>
                        <button
                          onClick={() => handleViewPaper(paper)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDownload(paper)}
                          className="flex items-center justify-center px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 text-center text-gray-500 text-sm py-2">
                        Not Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Archive;
