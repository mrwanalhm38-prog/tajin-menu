import React from 'react';
import { TajinLogo } from './TajinLogo';

interface BackgroundWatermarkProps {
  opacity?: number;
}

export const BackgroundWatermark: React.FC<BackgroundWatermarkProps> = ({
  opacity = 0.16,
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Centered Large Luxury Watermark Logo with enhanced clarity */}
      <div
        className="w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] max-w-[92vw] max-h-[85vh] transition-opacity duration-700 flex items-center justify-center"
        style={{
          opacity,
          filter: 'drop-shadow(0 0 50px rgba(0, 0, 0, 0.8)) contrast(115%)',
        }}
      >
        <TajinLogo
          size="100%"
          variant="black"
          className="transform scale-100 sm:scale-105"
        />
      </div>

      {/* Subtle edge vignette that preserves central logo visibility while keeping content readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(14,13,12,0.45)_70%,rgba(14,13,12,0.88)_100%)] pointer-events-none" />
      
      {/* Warm ambient atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/5 blur-[120px] pointer-events-none" />
    </div>
  );
};
