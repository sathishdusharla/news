import React, { useState } from 'react';
import { Home, Info, Phone, Shield, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/aksharakalam.png" 
              alt="Aksharakalam" 
              className="h-12 md:h-14 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Info className="w-4 h-4 mr-1" />
              About Us
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              Contact Us
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Shield className="w-4 h-4 mr-1" />
              Privacy Policy
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border border-gray-300 rounded"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Info className="w-4 h-4 mr-2" />
                About Us
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;