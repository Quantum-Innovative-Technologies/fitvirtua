'use client';

interface PreviewSectionProps {
  photo: string | null;
  previewPhoto: string | null;
}

export default function PreviewSection({ photo, previewPhoto }: PreviewSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-lg p-6 aspect-square flex items-center justify-center relative overflow-hidden group hover:shadow-xl transition-shadow">
        {photo ? (
          <img src={photo} alt="Original" className="max-w-full h-auto rounded-md" />
        ) : (
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
              <i className="ri-user-smile-line text-3xl text-primary" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">Your photo will appear here</p>
              <p className="text-xs text-gray-500 mt-1">Upload a photo or use webcam</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-6 aspect-square flex items-center justify-center relative overflow-hidden group hover:shadow-xl transition-shadow">
        {previewPhoto ? (
          <img src={previewPhoto} alt="Preview" className="max-w-full h-auto rounded-md" />
        ) : (
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
              <i className="ri-t-shirt-air-line text-3xl text-accent3" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">Virtual try-on preview</p>
              <p className="text-xs text-gray-500 mt-1">See how clothes look on you</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
      </div>
    </div>
  );
}
