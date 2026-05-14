import React from 'react';

interface AirQualityCardProps {
  data: any;
}

export default function AirQualityCard({ data }: AirQualityCardProps) {
  const aqiData = data?.list?.[0];
  
  if (!aqiData) {
    return (
      <div className="glass-card rounded-[2.5rem] p-8 h-full flex items-center justify-center">
        <p className="text-gray-400">Air quality data unavailable</p>
      </div>
    );
  }

  const aqi = aqiData.main.aqi;

  const labels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const colors = [
    "text-emerald-400", 
    "text-yellow-400", 
    "text-orange-400", 
    "text-red-400", 
    "text-purple-400"
  ];

  const currentColor = colors[aqi - 1] || "text-gray-400";
  const currentLabel = labels[aqi - 1] || "Unknown";

  const strokeDashoffset = 282 - (282 * Math.min(aqi, 5)) / 5;

  return (
    <div className="glass-card rounded-[2.5rem] p-8 h-full">
      <h2 className="text-xl font-bold uppercase tracking-widest text-white/90 mb-10">
        AIR QUALITY
      </h2>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className={currentColor}
              strokeDasharray="282"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-6xl font-bold text-white tracking-tighter">
              {aqi}
            </span>
            <span className={`text-lg font-medium ${currentColor}`}>
              {currentLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}