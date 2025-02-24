'use client';

import { X, CheckCircle, Camera, Ruler, Shirt, Eye } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export default function InstructionsModal({ onClose }: InstructionsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-all"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">How Virtual Try-On Works</h3>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Upload Your Photo',
              description: "Take a full-body photo or use your webcam. Make sure you're standing straight and the lighting is good.",
              icon: <Camera className="w-6 h-6 text-purple-600" />,
            },
            {
              step: 2,
              title: 'Enter Your Measurements',
              description: 'Input your body measurements accurately for the best fit. You can adjust these anytime.',
              icon: <Ruler className="w-6 h-6 text-blue-600" />,
            },
            {
              step: 3,
              title: 'Choose Clothing',
              description: 'Browse our collection and select items you\'d like to try on virtually.',
              icon: <Shirt className="w-6 h-6 text-green-600" />,
            },
            {
              step: 4,
              title: 'Customize & Preview',
              description: 'Adjust the fit and color of garments. See how they look on you in real-time.',
              icon: <Eye className="w-6 h-6 text-red-600" />,
            },
          ].map(({ step, title, description, icon }) => (
            <div key={step} className="flex items-start space-x-4">
              {/* Step Number with Gradient */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
                {step}
              </div>
              {/* Step Content */}
              <div>
                <h4 className="font-medium text-gray-800 flex items-center space-x-2">
                  {icon} <span>{title}</span>
                </h4>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            The virtual try-on feature uses AI for simulation. Actual fit may vary slightly.
          </p>
        </div>
      </div>
    </div>
  );
}
