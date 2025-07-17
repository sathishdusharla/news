import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Scissors, Archive } from 'lucide-react';

const PageNavigation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-50 border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Page Selector */}
            <div className="flex items-center space-x-4">
              <select 
                className="border border-gray-300 rounded px-3 py-2 bg-white"
                value={`Page ${currentPage}`}
                onChange={(e) => {
                  const pageNum = parseInt(e.target.value.split(' ')[1]);
                  setCurrentPage(pageNum);
                }}
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i + 1} value={`Page ${i + 1}`}>
                    Page {i + 1}
                  </option>
                ))}
              </select>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? 'bg-gray-800 text-white'
                        : 'bg-white border hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <span className="text-gray-500">...</span>
                <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
                  »
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded flex items-center hover:bg-yellow-500 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </button>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded flex items-center hover:bg-yellow-500 transition-colors">
                <Scissors className="w-4 h-4 mr-2" />
                Clip
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700 transition-colors">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Page Selector */}
          <select 
            className="border border-gray-300 rounded px-2 py-1 bg-white text-sm"
            value={`Page ${currentPage}`}
            onChange={(e) => {
              const pageNum = parseInt(e.target.value.split(' ')[1]);
              setCurrentPage(pageNum);
            }}
          >
            {[...Array(totalPages)].map((_, i) => (
              <option key={i + 1} value={`Page ${i + 1}`}>
                Page {i + 1}
              </option>
            ))}
          </select>

          {/* Navigation Arrow */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button className="bg-yellow-400 text-black px-3 py-2 rounded text-sm font-semibold">
              PDF
            </button>
            <button className="bg-yellow-400 text-black px-3 py-2 rounded text-sm font-semibold">
              ✂
            </button>
            <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
              📁
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNavigation;