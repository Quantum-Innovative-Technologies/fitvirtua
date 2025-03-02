'use client';

import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import { useTheme } from 'next-themes';

interface MeasurementRow {
  size: string;
  us: string;
  uk: string;
  eu: string;
  bust?: string;
  chest?: string;
  waist: string;
  hips: string;
}

const SizeGuide: React.FC = () => {
  const { theme } = useTheme();
  const [selectedGender, setSelectedGender] = useState<'women' | 'men'>('women');
  const [cartCount, setCartCount] = useState(0);
  const [measurements, setMeasurements] = useState<{ [key: string]: string }>({
    chest: '',
    waist: '',
    hips: '',
    inseam: ''
  });

  const womenSizes: MeasurementRow[] = [
    { size: 'XS', us: '0-2', uk: '4-6', eu: '32-34', bust: '31-32', waist: '24-25', hips: '34-35' },
    { size: 'S', us: '4-6', uk: '8-10', eu: '36-38', bust: '33-34', waist: '26-27', hips: '36-37' },
    { size: 'M', us: '8-10', uk: '12-14', eu: '40-42', bust: '35-36', waist: '28-29', hips: '38-39' },
    { size: 'L', us: '12-14', uk: '16-18', eu: '44-46', bust: '37-39', waist: '30-32', hips: '40-42' },
    { size: 'XL', us: '16-18', uk: '20-22', eu: '48-50', bust: '40-42', waist: '33-35', hips: '43-45' }
  ];

  const menSizes: MeasurementRow[] = [
    { size: 'XS', us: '34', uk: '34', eu: '44', chest: '34-36', waist: '28-30', hips: '34-36' },
    { size: 'S', us: '36', uk: '36', eu: '46', chest: '36-38', waist: '30-32', hips: '36-38' },
    { size: 'M', us: '38', uk: '38', eu: '48', chest: '38-40', waist: '32-34', hips: '38-40' },
    { size: 'L', us: '40', uk: '40', eu: '50', chest: '40-42', waist: '34-36', hips: '40-42' },
    { size: 'XL', us: '42', uk: '42', eu: '52', chest: '42-44', waist: '36-38', hips: '42-44' }
  ];

  const handleCartClick = () => {
    // Handle cart click
  };

  const handleInputChange = (field: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentSizes = selectedGender === 'women' ? womenSizes : menSizes;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onCartClick={handleCartClick} cartItemsCount={cartCount} />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Size Guide</h1>
          
          {/* Gender Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedGender === 'women'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setSelectedGender('women')}
              >
                Women's Sizes
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedGender === 'men'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setSelectedGender('men')}
              >
                Men's Sizes
              </button>
            </div>
          </div>

          {/* Size Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">US</th>
                  <th className="px-4 py-3">UK</th>
                  <th className="px-4 py-3">EU</th>
                  <th className="px-4 py-3">{selectedGender === 'women' ? 'Bust' : 'Chest'}</th>
                  <th className="px-4 py-3">Waist</th>
                  <th className="px-4 py-3">Hips</th>
                </tr>
              </thead>
              <tbody>
                {currentSizes.map((row, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3">{row.us}</td>
                    <td className="px-4 py-3">{row.uk}</td>
                    <td className="px-4 py-3">{row.eu}</td>
                    <td className="px-4 py-3">{selectedGender === 'women' ? row.bust : row.chest}</td>
                    <td className="px-4 py-3">{row.waist}</td>
                    <td className="px-4 py-3">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Guide */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How to Measure</h2>
              <img
                src="/measurement-guide.png"
                alt="Measurement Guide"
                className="w-full max-w-sm mx-auto"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Enter Your Measurements</h3>
              <div className="space-y-4">
                {Object.keys(measurements).map((field) => (
                  <div key={field} className="flex items-center">
                    <label className="w-24 capitalize">{field}</label>
                    <input
                      type="number"
                      value={measurements[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="ml-4 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="inches"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Measurement Tips</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Use a fabric measuring tape for accurate measurements</li>
              <li>• Measure over undergarments similar to what you'll wear</li>
              <li>• Keep the measuring tape snug but not tight</li>
              <li>• Stand straight with arms relaxed at sides</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SizeGuide;
