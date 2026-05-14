'use client';

import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';

export default function CityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <SearchBar />
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error.message || 'City not found'}
        </h2>
        <p className="text-gray-600 mb-4">
          Please check the city name and try again
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}