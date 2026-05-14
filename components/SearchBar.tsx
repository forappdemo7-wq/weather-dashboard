'use client';

import { useEffect, useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface Props {
  onSearch: (city: string) => void;
}

interface Suggestion {
  name: string;
  state?: string;
  country?: string;
  display: string;
}

export default function SearchBar({
  onSearch
}: Props) {
  const [query, setQuery] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [suggestions, setSuggestions] =
    useState<Suggestion[]>([]);

  const [showDropdown, setShowDropdown] =
    useState(false);

  /* -------------------------------- */
  /* AUTOCOMPLETE SEARCH */
  /* -------------------------------- */

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout =
      setTimeout(async () => {
        try {
          setLoading(true);

          const API_KEY =
            process.env
              .NEXT_PUBLIC_OPENWEATHER_API_KEY;

          if (!API_KEY) {
            console.error(
              'Missing OpenWeather API Key'
            );
            return;
          }

          const searchQuery =
            query
              .toLowerCase()
              .includes('india')
              ? query
              : `${query}, India`;

          const url =
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
              searchQuery
            )}&limit=8&appid=${API_KEY}`;

          console.log(
            'Fetching suggestions:',
            url
          );

          const res =
            await fetch(url);

          if (!res.ok) {
            console.error(
              'Autocomplete failed'
            );
            return;
          }

          const locationData =
            await res.json();

          console.log(
            'Autocomplete results:',
            locationData
          );

          const formatted =
            locationData.map(
              (item: any) => ({
                name:
                  item.name,
                state:
                  item.state ||
                  '',
                country:
                  item.country ||
                  '',

                display: `${item.name}${
                  item.state
                    ? `, ${item.state}`
                    : ''
                }, ${
                  item.country
                }`
              })
            );

          setSuggestions(
            formatted
          );

          setShowDropdown(true);
        } catch (err) {
          console.error(
            'Autocomplete Error:',
            err
          );
        } finally {
          setLoading(false);
        }
      }, 400);

    return () =>
      clearTimeout(timeout);
  }, [query]);

  /* -------------------------------- */
  /* SELECT PLACE */
  /* -------------------------------- */

  const handleSelect = (
    place: Suggestion
  ) => {
    setQuery(place.display);

    setShowDropdown(false);

    onSearch(place.display);
  };

  /* -------------------------------- */
  /* SUBMIT */
  /* -------------------------------- */

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query);

    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      {/* SEARCH FORM */}

      <form
        onSubmit={
          handleSubmit
        }
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          onFocus={() =>
            suggestions.length >
              0 &&
            setShowDropdown(
              true
            )
          }
          placeholder="Search city, village, district..."
          className="
            w-full
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            py-4
            pl-12
            pr-4
            text-white
            placeholder:text-gray-400
            outline-none
            focus:border-cyan-400
            transition-all
          "
        />

        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      {/* DROPDOWN */}

      {showDropdown &&
        suggestions.length >
          0 && (
          <div
            className="
              absolute
              top-full
              left-0
              right-0
              mt-2
              bg-black/90
              backdrop-blur-xl
              border
              border-white/10
              rounded-2xl
              overflow-hidden
              z-50
              shadow-2xl
            "
          >
            {suggestions.map(
              (
                place,
                index
              ) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleSelect(
                      place
                    )
                  }
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    hover:bg-white/10
                    transition-all
                    border-b
                    border-white/5
                    last:border-0
                  "
                >
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />

                  <div>
                    <p className="text-white font-medium">
                      {
                        place.name
                      }
                    </p>

                    <p className="text-xs text-gray-400">
                      {
                        place.state
                      }
                      {place.state &&
                        ', '}
                      {
                        place.country
                      }
                    </p>
                  </div>
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
}