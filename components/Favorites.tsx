'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Trash2 } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('favoriteCities');
    if (stored) setFavorites(JSON.parse(stored));
    const handleStorage = () => {
      const updated = localStorage.getItem('favoriteCities');
      if (updated) setFavorites(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const remove = (city: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter(f => f !== city);
    setFavorites(updated);
    localStorage.setItem('favoriteCities', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="weather-card p-6">
        <h3 className="flex items-center gap-2 text-white font-semibold mb-2">
          <Star size={18} className="text-yellow-500" /> Favorites
        </h3>
        <p className="text-gray-400 text-sm">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="weather-card p-6">
      <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
        <Star size={18} className="text-yellow-500" /> Favorites
      </h3>
      <div className="space-y-2">
        {favorites.map(city => (
          <div key={city} className="flex items-center justify-between bg-gray-800/40 rounded-lg px-3 py-2">
            <button onClick={() => router.push(`/${encodeURIComponent(city)}`)} className="text-cyan-400 hover:text-cyan-300">
              {city}
            </button>
            <button onClick={(e) => remove(city, e)} className="text-gray-400 hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}