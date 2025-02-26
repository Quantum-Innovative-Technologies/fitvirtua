'use client';

import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { UploadCloud, Image, Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUpload: (photoUrl: string) => void;
  webcamRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  setStream: Dispatch<SetStateAction<MediaStream | null>>;
}

export default function PhotoUpload({ onPhotoUpload, webcamRef, stream, setStream }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [isWebcamLoading, setIsWebcamLoading] = useState(false);

  // Effect to handle webcam initialization
  useEffect(() => {
    if (webcamRef.current && stream) {
      webcamRef.current.srcObject = stream;
      webcamRef.current.play().catch(err => {
        console.error('Error playing video:', err);
        setWebcamError('Error starting video stream. Please try again.');
      });
    }
  }, [stream, webcamRef]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoUrl = e.target?.result as string;
          onPhotoUpload(photoUrl);
          stopWebcam();
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const startWebcam = async () => {
    try {
      setIsWebcamLoading(true);
      setWebcamError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });

      setStream(mediaStream);
      setIsWebcamLoading(false);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setWebcamError(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Camera access was denied. Please allow camera access to use this feature.'
          : 'Unable to access your camera. Please make sure it is connected and not in use by another application.'
      );
      setIsWebcamLoading(false);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (webcamRef.current) {
        webcamRef.current.srcObject = null;
      }
      setStream(null);
      setWebcamError(null);
    }
  };

  const capturePhoto = () => {
    if (webcamRef.current && stream) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamRef.current, 0, 0);
        const photoUrl = canvas.toDataURL('image/jpeg');
        onPhotoUpload(photoUrl);
        stopWebcam();
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
        >
          <Image className="text-xl text-blue-200" />
          Upload Photo
        </button>
        <button 
          onClick={stream ? stopWebcam : startWebcam}
          disabled={isWebcamLoading}
          className={`flex items-center gap-2 ${
            stream
              ? 'bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-400 dark:to-rose-500 hover:from-red-600 hover:to-rose-700 dark:hover:from-red-500 dark:hover:to-rose-600'
              : 'bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500 hover:from-rose-600 hover:to-pink-700 dark:hover:from-rose-500 dark:hover:to-pink-600'
          } text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium ${
            isWebcamLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isWebcamLoading ? (
            <span>Loading...</span>
          ) : stream ? (
            <>
              <X className="text-xl text-red-200" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="text-xl text-pink-200" />
              Use Webcam
            </>
          )}
        </button>
      </div>

      {webcamError && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {webcamError}
        </div>
      )}

      <div 
        className={`relative border-3 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-purple-50 dark:bg-purple-900/30' 
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {stream ? (
          <div className="relative w-full max-w-2xl mx-auto">
            <video
              ref={webcamRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto rounded-lg shadow-lg bg-black"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={capturePhoto}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                Capture Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <UploadCloud className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400">
              Drag and drop your photo here, or click the buttons above to upload
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  );
}