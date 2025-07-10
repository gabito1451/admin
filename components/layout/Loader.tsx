'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  variant?: 'default' | 'overlay' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ variant = 'default', size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-16 h-12',
    md: 'w-24 h-18',
    lg: 'w-32 h-24',
  };

  const squareSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const LoaderContent = () => (
    <div className="flex items-center justify-center">
      <div className={cn('relative', sizeClasses[size])}>
        <div className="loadingspinner">
          <div
            id="square1"
            className={cn(
              'absolute bg-orange-500 rounded-sm',
              squareSizes[size],
              'animate-square1'
            )}
          />
          <div
            id="square2"
            className={cn(
              'absolute bg-orange-500 rounded-sm',
              squareSizes[size],
              'animate-square2'
            )}
          />
          <div
            id="square3"
            className={cn(
              'absolute bg-orange-500 rounded-sm',
              squareSizes[size],
              'animate-square3'
            )}
          />
          <div
            id="square4"
            className={cn(
              'absolute bg-orange-500 rounded-sm',
              squareSizes[size],
              'animate-square4'
            )}
          />
          <div
            id="square5"
            className={cn(
              'absolute bg-orange-500 rounded-sm',
              squareSizes[size],
              'animate-square5'
            )}
          />
        </div>
      </div>
    </div>
  );

  if (variant === 'overlay') {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-white/90 backdrop-blur-sm transition-opacity duration-300',
          className
        )}
      >
        <LoaderContent />
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        <LoaderContent />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center min-h-screen w-full', className)}>
      <LoaderContent />
    </div>
  );
};

export default Loader;
