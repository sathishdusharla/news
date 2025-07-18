import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// Set up PDF.js worker with fallback
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface EPaperViewerProps {
  pdfUrl: string | null;
  date: string;
  setViewMode?: (mode: 'today' | 'archive') => void;
}

const EPaperViewer: React.FC<EPaperViewerProps> = ({ pdfUrl, date, setViewMode }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Responsive scale calculation
  const getResponsiveScale = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 0.5; // Mobile
      if (width < 1024) return 0.8; // Tablet
      return 1.2; // Desktop - larger for better readability
    }
    return 1.2;
  };

  useEffect(() => {
    const handleResize = () => {
      setScale(getResponsiveScale());
    };

    // Set initial scale
    setScale(getResponsiveScale());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully, pages:', numPages);
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    console.log('PDF URL:', pdfUrl);
    setError(`Failed to load today's e-paper: ${error.message}`);
    setIsLoading(false);
  }, [pdfUrl]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(numPages, prev + 1));
  }, [numPages]);

  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `epaper-${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [pdfUrl, date]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (event.key === 'ArrowRight') {
        goToNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevPage, goToNextPage]);

  if (!pdfUrl) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-white border-b px-4 py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>Today's Edition</h1>
            <p className="text-gray-600 text-sm md:text-base">{date}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white p-8">
          <Calendar className="w-24 h-24 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-4">No E-Paper Available</h3>
          <p className="text-gray-500 text-center max-w-md">
            Today's e-paper ({date}) is not available yet.<br />
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Simple Header with Today's Edition */}
      <div className="bg-white border-b px-4 py-3 sm:py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 sm:mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>Today's Edition</h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">{date}</p>
        </div>
      </div>

      {/* Page Navigation Section - Mobile Bottom Bar & Desktop Top Bar */}
      {numPages > 1 && (
        <>
          {/* Desktop Layout - Top Bar */}
          <div className="hidden sm:block bg-gray-50 border-b px-4 py-3">
            <div className="container mx-auto flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border rounded px-3 py-1 bg-white text-sm"
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(numPages, 10) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 text-sm rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-200 border'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {numPages > 10 && (
                  <>
                    <span className="text-gray-500">...</span>
                    <button
                      onClick={() => setCurrentPage(numPages)}
                      className={`w-8 h-8 text-sm rounded transition-colors ${
                        currentPage === numPages
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-200 border'
                      }`}
                    >
                      {numPages}
                    </button>
                  </>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-yellow-400 text-gray-800 rounded text-sm font-medium hover:bg-yellow-500 transition-colors"
                >
                  PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-yellow-400 text-gray-800 rounded text-sm font-medium hover:bg-yellow-500 transition-colors"
                >
                  📋 Clip
                </button>
                <button
                  onClick={() => setViewMode && setViewMode('archive')}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  📁 Archive
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Fixed Bottom Bar */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-40 border-t border-gray-600">
            <div className="px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                {/* Page Selector */}
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-xs flex-1 max-w-[120px]"
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1 bg-yellow-400 text-gray-800 rounded text-xs font-medium"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-yellow-400 text-gray-800 rounded text-xs font-medium"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => setViewMode && setViewMode('archive')}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-medium"
                  >
                    📁
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PDF Viewer - Full width without borders */}
      <div className="bg-white">
        <div className="flex justify-center bg-white relative">
          {isLoading && (
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading today's news...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-center text-red-600">
                <Calendar className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Error Loading E-Paper</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {pdfUrl && !error && (
            <div className="w-full max-w-full relative">
              {/* Left Navigation Button */}
              {currentPage > 1 && (
                <button
                  onClick={goToPrevPage}
                  className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Right Navigation Button */}
              {currentPage < numPages && (
                <button
                  onClick={goToNextPage}
                  className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                  title="Next Page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex justify-center"
              >
                <div className="inline-block">
                  <Page
                    pageNumber={currentPage}
                    scale={scale}
                    loading={null}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="max-w-full"
                  />
                </div>
              </Document>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EPaperViewer;
