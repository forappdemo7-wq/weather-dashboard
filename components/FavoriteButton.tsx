'use client';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function FavoriteButton({ city }: { city: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setIsFavorite(favorites.includes(city));
  }, [city]);

  const toggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    if (isFavorite) {
      localStorage.setItem('favoriteCities', JSON.stringify(favorites.filter((f: string) => f !== city)));
    } else {
      localStorage.setItem('favoriteCities', JSON.stringify([...favorites, city]));
    }
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <button onClick={toggle} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
      <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
    </button>
  );
}