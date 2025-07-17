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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Left Sidebar - Page Thumbnails - Hidden on mobile */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="text-center">
                <div className="border border-gray-300 bg-gray-100 p-2 flex items-center justify-center h-64">
                  <Calendar className="w-16 h-16 text-gray-400" />
                </div>
                <p className="mt-2 text-sm font-medium">No E-Paper</p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Flash India News Header */}
            <div className="bg-gray-800 text-white p-2 md:p-4 mb-4 md:mb-6">
              <h1 className="text-lg md:text-2xl font-bold text-center">Flash India News</h1>
            </div>

            {/* Main Content */}
            <div className="bg-white border border-gray-300 p-2 md:p-6">
              {/* Newspaper Masthead */}
              <div className="border-b-2 border-gray-800 pb-2 md:pb-4 mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex items-center">
                    <div className="bg-red-600 text-white px-2 md:px-3 py-1 mr-2 md:mr-4">
                      <span className="font-bold text-xs md:text-sm">FLASH INDIA</span>
                      <div className="bg-yellow-400 text-black px-1 md:px-2 py-1 mt-1">
                        <span className="text-xs font-bold">NEWS</span>
                      </div>
                    </div>
                    <div className="text-blue-600">
                      <h2 className="text-2xl md:text-4xl font-bold telugu-text">
                        ఫ్లాష్ ఇండియా
                      </h2>
                      <p className="text-xs md:text-sm">www.flashindianews.com</p>
                      <p className="text-xs">FLASH INDIA TELUGU DAILY</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="bg-blue-600 text-white px-2 md:px-3 py-1 mb-2">
                      <span className="font-bold text-xs md:text-sm">TELANGANA RISING 2047</span>
                    </div>
                    <p className="text-xs">RNI NO. APTEL/2010/33229</p>
                  </div>
                </div>
              </div>

              {/* Date and Issue Info */}
              <div className="bg-red-600 text-white p-1 md:p-2 mb-4 md:mb-6 text-center">
                <div className="flex flex-wrap justify-center items-center text-xs md:text-sm telugu-text">
                  <span className="mx-2">Today's E-Paper ({date}) is not available yet</span>
                </div>
              </div>

              {/* No E-Paper Message */}
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <Calendar className="w-24 h-24 text-gray-400 mb-4" />
                <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2 telugu-text">
                  ఈరోజు ఈ-పేపర్ అందుబాటులో లేదు
                </h3>
                <h3 className="text-xl font-semibold text-gray-600 mb-4">No E-Paper Available</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Today's e-paper ({date}) is not available yet.<br />
                  Please check back later or contact the administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left Sidebar - Page Thumbnails - Hidden on mobile */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="space-y-6">
            {numPages > 0 && Array.from({ length: numPages }, (_, i) => (
              <div key={i + 1} className="text-center">
                <div 
                  className={`border border-gray-300 bg-white p-2 hover:shadow-md transition-shadow cursor-pointer ${
                    currentPage === i + 1 ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Document file={pdfUrl} loading={null}>
                      <Page
                        pageNumber={i + 1}
                        width={180}
                        loading={null}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="max-w-full max-h-full"
                      />
                    </Document>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium">Page {i + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Flash India News Header */}
          <div className="bg-gray-800 text-white p-2 md:p-4 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <h1 className="text-lg md:text-2xl font-bold text-center">Flash India News - E-Paper</h1>
              <div className="flex items-center space-x-2">
                {/* Page Info */}
                {numPages > 0 && (
                  <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                    Page {currentPage} of {numPages}
                  </span>
                )}
                
                {/* Controls */}
                <button
                  onClick={zoomOut}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm px-2">{Math.round(scale * 100)}%</span>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleDownload}
                  className="p-2 bg-yellow-600 rounded hover:bg-yellow-500 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main E-Paper Content */}
          <div className="bg-white border border-gray-300 p-2 md:p-6">
            {/* Newspaper Masthead */}
            <div className="border-b-2 border-gray-800 pb-2 md:pb-4 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                <div className="flex items-center">
                  <div className="bg-red-600 text-white px-2 md:px-3 py-1 mr-2 md:mr-4">
                    <span className="font-bold text-xs md:text-sm">FLASH INDIA</span>
                    <div className="bg-yellow-400 text-black px-1 md:px-2 py-1 mt-1">
                      <span className="text-xs font-bold">NEWS</span>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <h2 className="text-2xl md:text-4xl font-bold telugu-text">
                      ఫ్లాష్ ఇండియా
                    </h2>
                    <p className="text-xs md:text-sm">www.flashindianews.com</p>
                    <p className="text-xs">FLASH INDIA TELUGU DAILY</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="bg-blue-600 text-white px-2 md:px-3 py-1 mb-2">
                    <span className="font-bold text-xs md:text-sm">TELANGANA RISING 2047</span>
                  </div>
                  <p className="text-xs">RNI NO. APTEL/2010/33229</p>
                </div>
              </div>
            </div>

            {/* Date and Issue Info */}
            <div className="bg-red-600 text-white p-1 md:p-2 mb-4 md:mb-6 text-center">
              <div className="flex flex-wrap justify-between items-center text-xs md:text-sm telugu-text">
                <span>E-Paper</span>
                <span>{date}</span>
                <span>Page: {currentPage}</span>
                <span>Total: {numPages} pages</span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="bg-gray-50 p-2 mb-4 flex items-center justify-between rounded">
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                className="flex items-center space-x-2 px-3 py-2 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden md:inline">Previous</span>
              </button>

              {/* Mobile page selector */}
              <div className="flex items-center space-x-2">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border rounded px-2 py-1 bg-white text-sm"
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
                className="flex items-center space-x-2 px-3 py-2 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex justify-center overflow-auto">
              {isLoading && (
                <div className="flex items-center justify-center min-h-[600px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
                    <p className="text-gray-600 telugu-text">ఈ-పేపర్ లోడ్ అవుతోంది...</p>
                    <p className="text-gray-600">Loading today's e-paper...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center min-h-[600px]">
                  <div className="text-center text-red-600">
                    <Calendar className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2 telugu-text">ఈ-పేపర్ లోడ్ చేయడంలో లోపం</p>
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
                        className="shadow-lg border border-gray-300 max-w-full"
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
