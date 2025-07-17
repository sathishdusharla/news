import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="text-center space-y-4">
          {/* Brand Name */}
          <h2 className="text-2xl md:text-3xl font-light text-white">
            Aksharakalam
          </h2>
          
          {/* Tagline */}
          <p className="text-gray-300 text-sm md:text-base italic">
            Your trusted source for daily news
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 pt-4">
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-red-400 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-8 pt-6">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Aksharakalam. All rights reserved. | Designed with excellence for digital journalism.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;