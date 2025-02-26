'use client';

import { useState, useRef } from 'react';
import Sidebar from './sidebar';
import PhotoUpload from './photo-upload';
import PreviewSection from './preview-section';
import ProductGrid from './product-grid';
import InstructionsModal from './instructions-modal';
import TryOnModal from './try-on-modal';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { HelpCircle } from 'lucide-react';

export default function VirtualTryOn() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handlePhotoUpload = (photoUrl: string) => {
    setPhoto(photoUrl);
    setPreviewPhoto(photoUrl);
  };

  const handleTryOn = () => {
    setShowTryOnModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header 
        onCartClick={() => {/* Handle cart click */}} 
        cartItemsCount={0}  
      />

      {/* Main content area with padding to avoid overlap */}
      <div className="flex flex-1 pt-20 bg-white dark:bg-gray-900">  
        <Sidebar onMeasurementsChange={(measurements) => {
          if (previewPhoto) {
            // Update preview with new measurements
          }
        }} />

        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto relative">
            {/* How it Works Button - Adjusted Positioning */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowInstructions(true)}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-lg transition-all"
              >
                <HelpCircle className="w-6 h-6" />
                <span className="text-lg font-medium">How it works</span>
              </button>
            </div>

            <PhotoUpload 
              onPhotoUpload={handlePhotoUpload}
              webcamRef={webcamRef}
              stream={stream}
              setStream={setStream}
            />

            <PreviewSection 
              photo={photo}
              previewPhoto={previewPhoto}
            />

            <ProductGrid onTryOn={handleTryOn} />
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      {/* Try-On Modal */}
      {showTryOnModal && (
        <TryOnModal 
          onClose={() => setShowTryOnModal(false)}
          onApply={(adjustments) => {
            setShowTryOnModal(false);
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
