import { useState } from 'react';
import Header from './components/Header';
import PageNavigation from './components/PageNavigation';
import NewspaperLayout from './components/NewspaperLayout';
import EPaperViewer from './components/EPaperViewer';
import Archive from './components/Archive';
import Footer from './components/Footer';
import { useEPaper } from './hooks/useEPaper';

function App() {
  const [viewMode, setViewMode] = useState<'today' | 'archive' | 'design'>('today');
  const { ePaperInfo, isLoading, refreshEPaper } = useEPaper();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Mode Toggle */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('today')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'today'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Today's News
              </button>
              <button
                onClick={() => setViewMode('archive')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'archive'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Archive
              </button>
              <button
                onClick={() => setViewMode('design')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'design'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                News Layout
              </button>
            </div>
            
            {(viewMode === 'today' || viewMode === 'archive') && (
              <button
                onClick={refreshEPaper}
                disabled={isLoading}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            )}
          </div>
        </div>
      </div>

      {viewMode === 'today' ? (
        <>
          <EPaperViewer
            pdfUrl={ePaperInfo?.exists ? ePaperInfo.url : null}
            date={ePaperInfo?.date || new Date().toLocaleDateString()}
            setViewMode={setViewMode}
          />
          
          {/* Upload Instructions - Only show when e-paper doesn't exist */}
          {ePaperInfo && !ePaperInfo.exists && (
            <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-3">
              <div className="container mx-auto">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                    Upload Today's E-Paper
                  </h3>
                  <p className="text-yellow-700 text-sm mb-2">
                    Upload PDF as: <code className="bg-yellow-100 px-1 rounded text-xs">epaper-{(() => {
                      const today = new Date();
                      const day = String(today.getDate()).padStart(2, '0');
                      const month = String(today.getMonth() + 1).padStart(2, '0');
                      const year = String(today.getFullYear()).slice(-2);
                      return `${day}-${month}-${year}`;
                    })()}.pdf</code> to the public folder
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : viewMode === 'archive' ? (
        <Archive />
      ) : (
        <>
          <PageNavigation />
          <NewspaperLayout />
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;