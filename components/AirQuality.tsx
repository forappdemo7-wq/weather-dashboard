import React from 'react';
import { AirQualityData } from '@/types/weather';
import { getAQIInfo } from '@/lib/weather';

interface AirQualityProps {
  data: AirQualityData;
}

export default function AirQuality({ data }: AirQualityProps) {
  const aqiData = data?.list?.[0];

  if (!aqiData) {
    return (
      <div className="weather-card p-6 animate-fade-slide">
        <p className="text-gray-400">Air quality data unavailable</p>
      </div>
    );
  }

  const aqi = aqiData.main.aqi;
  const aqiInfo = getAQIInfo(aqi);

  const aqiColors: Record<string, string> = {
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
  };

  return (
    <div className="weather-card p-6 animate-fade-slide">
      <h3 className="text-xl font-bold text-white mb-4">Air Quality Index</h3>

      <div className="flex items-center gap-4 mb-6">
        {/* AQI Circle */}
        <div
          className={`w-16 h-16 rounded-full ${
            aqiColors[aqiInfo.color] || 'bg-gray-600'
          } flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-2 ring-white/20`}
        >
          {aqi}
        </div>

        {/* AQI Info */}
        <div>
          <p className="text-white font-semibold text-lg">{aqiInfo.level}</p>
          <p className="text-gray-400 text-sm leading-tight">{aqiInfo.message}</p>
        </div>
      </div>

      {/* Pollutants Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 custom-scroll">
        {Object.entries(aqiData.components || {}).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-800/40 rounded-lg px-3 py-2.5 flex justify-between text-sm"
          >
            <span className="text-gray-400 uppercase">
              {key.replace('_', '.')}
            </span>
            <span className="text-white font-mono">
              {typeof value === 'number' ? value.toFixed(1) : value} µg/m³
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}