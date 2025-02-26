'use client';

import { useState } from 'react';

interface Measurements {
  height: number;
  fit: 'Loose' | 'Regular' | 'Tight';
  shoulder: number;
  chest: number;
  waist: number;
  hip: number;
}

const defaultMeasurements: Measurements = {
  height: 175,
  fit: 'Loose',
  shoulder: 45,
  chest: 95,
  waist: 80,
  hip: 98,
};

interface SidebarProps {
  onMeasurementsChange: (measurements: Measurements) => void;
}

export default function Sidebar({ onMeasurementsChange }: SidebarProps) {
  const [measurements, setMeasurements] = useState<Measurements>(defaultMeasurements);

  const handleSave = () => {
    onMeasurementsChange(measurements);
    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    toast.textContent = 'Measurements saved successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleReset = () => {
    setMeasurements(defaultMeasurements);
    onMeasurementsChange(defaultMeasurements);
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 shadow-lg p-6 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <i className="ri-user-line text-gray-600 dark:text-gray-200 text-xl" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-100">James Wilson</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">My Measurements</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Height</label>
          <input 
            type="range" 
            min="150" 
            max="200" 
            value={measurements.height}
            onChange={(e) => setMeasurements({ ...measurements, height: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>150cm</span>
            <span>{measurements.height}cm</span>
            <span>200cm</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Fit Preference</label>
          <div className="space-y-2">
            {(['Loose', 'Regular', 'Tight'] as const).map((fit) => (
              <label key={fit} className="custom-radio block">
                <input 
                  type="radio" 
                  name="fit"
                  checked={measurements.fit === fit}
                  onChange={() => setMeasurements({ ...measurements, fit })}
                />
                <span className="radio-checkmark" />
                {fit}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Shoulder Width (cm)', key: 'shoulder' as const },
            { label: 'Chest Size (cm)', key: 'chest' as const },
            { label: 'Waist Size (cm)', key: 'waist' as const },
            { label: 'Hip Size (cm)', key: 'hip' as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>
              <input 
                type="number"
                value={measurements[key]}
                onChange={(e) => setMeasurements({ ...measurements, [key]: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 text-white py-2.5 rounded-lg hover:from-violet-600 hover:to-purple-700 dark:hover:from-violet-700 dark:hover:to-purple-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            <i className="ri-save-line text-violet-200" />
            Save Measurements
          </button>
          <button 
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 py-2.5 rounded-lg hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md border border-gray-300 dark:border-gray-600"
          >
            <i className="ri-refresh-line text-gray-500" />
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
