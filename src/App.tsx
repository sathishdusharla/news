import { useState } from 'react';
import Header from './components/Header';
import PageNavigation from './components/PageNavigation';
import NewspaperLayout from './components/NewspaperLayout';
import EPaperViewer from './components/EPaperViewer';
import Footer from './components/Footer';
import { useEPaper } from './hooks/useEPaper';

function App() {
  const [viewMode, setViewMode] = useState<'epaper' | 'design'>('epaper');
  const { ePaperInfo, isLoading, refreshEPaper } = useEPaper();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Mode Toggle */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('epaper')}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  viewMode === 'epaper'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Today's E-Paper
              </button>
              <button
                onClick={() => setViewMode('design')}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  viewMode === 'design'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                News Layout
              </button>
            </div>
            
            {viewMode === 'epaper' && (
              <button
                onClick={refreshEPaper}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            )}
          </div>
        </div>
      </div>

      {viewMode === 'epaper' ? (
        <div className="container mx-auto px-4 py-6">
          <EPaperViewer
            pdfUrl={ePaperInfo?.exists ? ePaperInfo.url : null}
            date={ePaperInfo?.date || new Date().toLocaleDateString()}
          />
          
          {/* Upload Instructions */}
          {ePaperInfo && !ePaperInfo.exists && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Upload Today's E-Paper
              </h3>
              <p className="text-yellow-700 mb-2">
                To display today's e-paper, please upload the PDF file with one of these names to the public folder:
              </p>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• <code className="bg-yellow-100 px-1 rounded">epaper-{(() => {
                  const today = new Date();
                  const day = String(today.getDate()).padStart(2, '0');
                  const month = String(today.getMonth() + 1).padStart(2, '0');
                  const year = String(today.getFullYear()).slice(-2);
                  return `${day}-${month}-${year}`;
                })()}.pdf</code></li>
                <li>• <code className="bg-yellow-100 px-1 rounded">newspaper-{(() => {
                  const today = new Date();
                  const day = String(today.getDate()).padStart(2, '0');
                  const month = String(today.getMonth() + 1).padStart(2, '0');
                  const year = String(today.getFullYear()).slice(-2);
                  return `${day}-${month}-${year}`;
                })()}.pdf</code></li>
                <li>• <code className="bg-yellow-100 px-1 rounded">flashindia-{(() => {
                  const today = new Date();
                  const day = String(today.getDate()).padStart(2, '0');
                  const month = String(today.getMonth() + 1).padStart(2, '0');
                  const year = String(today.getFullYear()).slice(-2);
                  return `${day}-${month}-${year}`;
                })()}.pdf</code></li>
              </ul>
              <p className="text-yellow-700 text-sm mt-2">
                Format: DD-MM-YY (e.g., 17-07-25 for July 17, 2025)
              </p>
            </div>
          )}
        </div>
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