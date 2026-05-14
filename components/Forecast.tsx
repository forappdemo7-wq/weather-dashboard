import React from 'react';
import { ForecastData } from '@/types/weather';
import { getWeatherIcon } from '@/lib/utils';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  if (!data?.list || data.list.length === 0) {
    return (
      <div className="weather-card p-6 animate-fade-slide">
        <p className="text-gray-400">Forecast data unavailable</p>
      </div>
    );
  }

  // Get daily forecast (one entry per day)
  const dailyForecast = data.list
    .filter((item: any, index: number, arr: any[]) => {
      // Take one reading per day (usually noon)
      const currentDay = new Date(item.dt * 1000).getDate();
      const nextDay = arr[index + 1] 
        ? new Date(arr[index + 1].dt * 1000).getDate() 
        : null;
      return currentDay !== nextDay;
    })
    .slice(0, 5);

  return (
    <div className="weather-card p-6 animate-fade-slide">
      <h3 className="text-xl font-bold text-white mb-6">5-Day Forecast</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { 
            weekday: 'short' 
          });
          const dayDate = date.toLocaleDateString('en-US', { 
            day: 'numeric' 
          });

          return (
            <div 
              key={day.dt} 
              className="bg-gray-800/40 rounded-2xl p-4 text-center hover:bg-gray-800/70 transition-all duration-200 flex flex-col"
            >
              {/* Date */}
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-300">
                  {dayName}
                </p>
                <p className="text-xs text-gray-500">{dayDate}</p>
              </div>

              {/* Weather Icon */}
              <img 
                src={getWeatherIcon(day.weather[0].icon)} 
                alt={day.weather[0].description} 
                className="w-14 h-14 mx-auto my-2" 
              />

              {/* Temperature */}
              <p className="text-2xl font-bold text-white mt-1">
                {Math.round(day.main.temp)}°C
              </p>

              {/* Description */}
              <p className="text-xs text-gray-400 capitalize mt-1 mb-3">
                {day.weather[0].description}
              </p>

              {/* Extra Info */}
              <div className="flex justify-center gap-3 text-[10px] text-gray-500 mt-auto pt-2 border-t border-white/10">
                <span>💧 {day.main.humidity}%</span>
                <span>💨 {day.wind.speed} m/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}