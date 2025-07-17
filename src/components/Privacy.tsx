import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>
            Privacy Policy
          </h1>
          <div className="prose prose-lg text-gray-600">
            <p className="text-lg leading-relaxed">
              Your privacy is important to us at Aksharakalam.
            </p>
            <p className="mt-4">
              Content coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
