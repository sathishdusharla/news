import { useState } from 'react';
import Header from './components/Header';
import EPaperViewer from './components/EPaperViewer';
import Archive from './components/Archive';
import Footer from './components/Footer';
import { useEPaper } from './hooks/useEPaper';

function App() {
  const [viewMode, setViewMode] = useState<'today' | 'archive'>('today');
  const { ePaperInfo } = useEPaper();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
      ) : (
        <Archive />
      )}
      
      <Footer />
    </div>
  );
}

export default App;