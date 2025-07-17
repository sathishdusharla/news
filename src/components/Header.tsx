import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate?.(page);
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <header className="bg-gray-50 border-b relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/aksharakalam.png" 
              alt="Aksharakalam" 
              className="h-16 md:h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('home')} className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-1">
              <span className="whitespace-nowrap font-bold">Home</span>
            </button>
            <button onClick={() => handleNavigation('about')} className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-1">
              <span className="whitespace-nowrap font-bold">About Us</span>
            </button>
            <button onClick={() => handleNavigation('contact')} className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-1">
              <span className="whitespace-nowrap font-bold">Contact Us</span>
            </button>
            <button onClick={() => handleNavigation('privacy')} className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-1">
              <span className="whitespace-nowrap font-bold">Privacy Policy</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border border-gray-300 rounded z-60"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Side Menu */}
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <nav className="p-4">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => handleNavigation('home')} 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors p-3 rounded text-left"
                >
                  <span className="font-bold">Home</span>
                </button>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors p-3 rounded text-left"
                >
                  <span className="font-bold">About Us</span>
                </button>
                <button 
                  onClick={() => handleNavigation('contact')} 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors p-3 rounded text-left"
                >
                  <span className="font-bold">Contact Us</span>
                </button>
                <button 
                  onClick={() => handleNavigation('privacy')} 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors p-3 rounded text-left"
                >
                  <span className="font-bold">Privacy Policy</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;