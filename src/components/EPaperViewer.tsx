import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Calendar } from 'lucide-react';

// Set up PDF.js worker with fallback
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface EPaperViewerProps {
  pdfUrl: string | null;
  date: string;
}

const EPaperViewer: React.FC<EPaperViewerProps> = ({ pdfUrl, date }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Responsive scale calculation
  const getResponsiveScale = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 0.4; // Mobile
      if (width < 1024) return 0.6; // Tablet
      return 1.0; // Desktop
    }
    return 1.0;
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

  const zoomIn = useCallback(() => {
    setScale(prev => {
      const baseScale = getResponsiveScale();
      return Math.min(baseScale * 3.0, prev + 0.2);
    });
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => {
      const baseScale = getResponsiveScale();
      return Math.max(baseScale * 0.3, prev - 0.2);
    });
  }, []);

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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Today's News</h1>
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-md p-8">
            <Calendar className="w-24 h-24 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-4">No E-Paper Available</h3>
            <p className="text-gray-500 text-center max-w-md">
              Today's e-paper ({date}) is not available yet.<br />
              Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Today's News</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-gray-600">{date}</span>
          {numPages > 0 && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Page {currentPage} of {numPages}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Page Thumbnails - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-48 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-4">Pages</h3>
          <div className="space-y-4">
            {numPages > 0 && Array.from({ length: numPages }, (_, i) => (
              <div key={i + 1} className="text-center">
                <div 
                  className={`border-2 bg-white p-1 hover:shadow-md transition-all cursor-pointer rounded ${
                    currentPage === i + 1 ? 'border-blue-500 shadow-md' : 'border-gray-200'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  <div className="w-full h-32 bg-gray-50 flex items-center justify-center overflow-hidden rounded">
                    <Document file={pdfUrl} loading={null}>
                      <Page
                        pageNumber={i + 1}
                        width={120}
                        loading={null}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="max-w-full max-h-full"
                      />
                    </Document>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600">{i + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage <= 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border rounded px-3 py-2 bg-white"
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage >= numPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Zoom and Download */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={zoomOut}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm px-2 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex justify-center bg-gray-50 p-4">
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
                <div className="w-full max-w-full">
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
                        className="shadow-lg max-w-full"
                      />
                    </div>
                  </Document>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPaperViewer;
