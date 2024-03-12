'use client';

import Image from 'next/image';
import { useState } from 'react';

// Assuming defaultImages is imported from your constants
import { defaultImages } from '@/constants/images';

export const FormPicker = () => {
  const [selectedImageId, setSelectedImageId] = useState<String | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {defaultImages.map((image) => (
        <button
          key={image.id}
          className={`relative aspect-video`}
          onClick={() => setSelectedImageId(image.id)}
          aria-label="Select Image"
        >
          <Image
            src={image.urls.thumb}
            alt={image.alt_description || 'Image'}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          {selectedImageId === image.id && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
