'use client';

import { useState } from 'react';

interface TryOnAdjustments {
  size: number;
  color: string;
}

interface TryOnModalProps {
  onClose: () => void;
  onApply: (adjustments: TryOnAdjustments) => void;
}

const colors = [
  { id: 'black', bg: 'bg-black' },
  { id: 'white', bg: 'bg-white border' },
  { id: 'red', bg: 'bg-red-600' },
  { id: 'blue', bg: 'bg-blue-600' },
];

export default function TryOnModal({ onClose, onApply }: TryOnModalProps) {
  const [adjustments, setAdjustments] = useState<TryOnAdjustments>({
    size: 100,
    color: 'black',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Customize Your Fit</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Size Adjustment</label>
            <input 
              type="range" 
              min="80" 
              max="120" 
              value={adjustments.size}
              onChange={(e) => setAdjustments({ ...adjustments, size: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Smaller</span>
              <span>Original</span>
              <span>Larger</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color Variation</label>
            <div className="flex gap-2">
              {colors.map(({ id, bg }) => (
                <button
                  key={id}
                  onClick={() => setAdjustments({ ...adjustments, color: id })}
                  className={`w-8 h-8 rounded-full ${bg} ${
                    adjustments.color === id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => onApply(adjustments)}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <i className="ri-check-line text-emerald-200" />
            Apply
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2.5 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <i className="ri-close-line text-gray-500" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
