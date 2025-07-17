import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="text-center space-y-4">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6 pt-4">
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-white hover:text-red-400 transition-colors">
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-8 pt-6">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              <span className="block sm:inline">© 2025 Aksharakalam. All rights reserved.</span>
              <span className="block sm:inline sm:ml-2">
                Designed and Developed by <a href="mailto:thedusharla1@gmail.com" className="text-gray-400 hover:text-white transition-colors no-underline">SD</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;