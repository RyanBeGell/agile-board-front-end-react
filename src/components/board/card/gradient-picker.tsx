'use client';
import { useState } from 'react';
import { GradientOption } from '@/types/interfaces';



interface GradientPickerProps {
  selectedGradient: string;
  setSelectedGradient: (gradient: string) => void;
}


export const GradientPicker: React.FC<GradientPickerProps> = ({ selectedGradient, setSelectedGradient }) => {

  // Gradients hand picked from https://gradient.page/css/ui-gradients
  const gradients: GradientOption[] = [
    { id: '1', gradient: 'bg-gradient-to-r from-[#FFEDBC] to-[#ED4264]', name: 'Peach' },        // Light cream to pink
    { id: '2', gradient: 'bg-gradient-to-r from-[#ffe259] to-[#ffa751]', name: 'Mango' },        // Light yellow to orange
    { id: '3', gradient: 'bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD]', name: 'Seaweed' },      // Turquoise to teal
    { id: '4', gradient: 'bg-gradient-to-r from-[#1488CC] to-[#2B32B2]', name: 'Skyline' },      // Light to medium blue
    { id: '5', gradient: 'bg-gradient-to-r from-[#B2FEFA] to-[#0ED2F7]', name: 'Maldives' },     // Light turquoise to blue
    { id: '6', gradient: 'bg-gradient-to-r from-[#B24592] to-[#F15F79]', name: 'Blush' },        // Pink tones
    { id: '7', gradient: 'bg-gradient-to-r from-[#EB3349] to-[#F45C43]', name: 'Cherry' },       // Bright reds
    { id: '8', gradient: 'bg-gradient-to-r from-[#00bf8f] to-[#001510]', name: 'Vine' },         // Bright teal to dark green
    { id: '9', gradient: 'bg-gradient-to-r from-[#bf5ae0] to-[#a811da]', name: 'Purple Dream' }  // Purple
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {gradients.map((gradient) => (
        <button
          key={gradient.id}
          className={`relative aspect-video ${gradient.gradient} rounded-md`}
          onClick={() => setSelectedGradient(gradient.gradient)}
          aria-label={`Select ${gradient.name}`}
          style={{ opacity: selectedGradient === gradient.gradient ? 1 : 0.6 }}
        >
          {selectedGradient === gradient.gradient && (
            <svg className="absolute inset-0 m-auto h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};