import React from 'react';
import Header from './components/Header';
import PageNavigation from './components/PageNavigation';
import NewspaperLayout from './components/NewspaperLayout';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <PageNavigation />
      <NewspaperLayout />
      <Footer />
    </div>
  );
}

export default App;