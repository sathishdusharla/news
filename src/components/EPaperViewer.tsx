import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Calendar } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load today\'s e-paper. Please check if the PDF file exists.');
    setIsLoading(false);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(numPages, prev + 1));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(3.0, prev + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(0.5, prev - 0.2));
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
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-100 rounded-lg p-8">
        <Calendar className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No E-Paper Available</h3>
        <p className="text-gray-500 text-center">
          Today's e-paper ({date}) is not available yet.<br />
          Please check back later or contact the administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold">Flash India News - {date}</h2>
            {numPages > 0 && (
              <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                Page {currentPage} of {numPages}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
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
            
            {/* Download Button */}
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

      {/* Navigation Controls */}
      <div className="bg-gray-100 p-2 flex items-center justify-between">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="flex items-center space-x-2 px-4 py-2 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden md:inline">Previous</span>
        </button>

        {/* Page selector */}
        <div className="flex items-center space-x-2">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="border rounded px-3 py-1 bg-white"
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
          className="flex items-center space-x-2 px-4 py-2 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex justify-center bg-gray-100 p-4">
        {isLoading && (
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading today's e-paper...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold mb-2">Error Loading E-Paper</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {pdfUrl && !error && (
          <div className="shadow-lg">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                loading={null}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default EPaperViewer;
