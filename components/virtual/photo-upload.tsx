'use client';

import { useRef, useState, Dispatch, SetStateAction } from 'react';
import { UploadCloud, Image, Camera } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUpload: (photoUrl: string) => void;
  webcamRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  setStream: Dispatch<SetStateAction<MediaStream | null>>;
}

export default function PhotoUpload({ onPhotoUpload, webcamRef, stream, setStream }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (webcamRef.current) {
        webcamRef.current.srcObject = mediaStream;
        webcamRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
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
          onClick={startWebcam}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500 text-white px-6 py-2 rounded-full hover:from-rose-600 hover:to-pink-700 dark:hover:from-rose-500 dark:hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
        >
          <Camera className="text-xl text-pink-200" />
          Use Webcam
        </button>
      </div>

      <div 
        className={`border-3 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-purple-50 dark:bg-purple-900/30' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-purple-50 dark:hover:bg-purple-900/30'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-4 relative">
            <UploadCloud className="mx-auto text-primary dark:text-blue-400 text-4xl" />
          </div>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Drop your photo here</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">or use the buttons above</p>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <video 
            ref={webcamRef}
            className={`mx-auto max-w-full h-auto rounded-lg shadow-lg ${stream ? '' : 'hidden'}`}
          />
          <div className="flex items-center justify-center gap-1 mt-2">
            <Image className="text-gray-400 dark:text-gray-500 text-xs" />
            <p className="text-xs text-gray-400 dark:text-gray-500">Supported formats: JPG, PNG, HEIC</p>
          </div>
        </div>
      </div>
    </div>
  );
}