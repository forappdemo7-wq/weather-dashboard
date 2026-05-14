import React from 'react';
import { Wind, Droplets, Gauge, MapPin } from 'lucide-react';
import { getWeatherIcon } from '@/lib/getWeatherIcon';

export default function CurrentWeatherCard({ data }: { data: any }) {
  const weather = data.weather[0];
  
  return (
    <div className="glass-card rounded-[2rem] p-6 md:p-8 h-full flex flex-col justify-between text-white overflow-hidden">
      {/* Header with Dynamic City Name */}
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-4 h-4 text-white/50" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          Current Weather
        </h2>
      </div>
      
      {/* Main Content: Stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="text-center md:text-left order-2 md:order-1">
          {/* FIXED: This uses the data from your search, not hardcoded Paris */}
          <p className="text-2xl md:text-3xl font-semibold mb-1">
            {data.name}, {data.sys.country}
          </p>
          <div className="flex items-start justify-center md:justify-start">
             <span className="text-7xl md:text-8xl font-bold tracking-tighter leading-none">
               {Math.round(data.main.temp)}
             </span>
             <span className="text-3xl font-light mt-2 ml-1">°C</span>
          </div>
          <p className="text-lg font-medium capitalize mt-3 opacity-80">
            {weather.description}
          </p>
        </div>

        {/* Icon: Large and Glowy */}
        <div className="order-1 md:order-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          {getWeatherIcon(weather.icon, "w-32 h-32 md:w-40 md:h-40")}
        </div>
      </div>

      {/* Stats Grid: Clean and Centered */}
      <div className="grid grid-cols-3 gap-2 mt-10 pt-8 border-t border-white/10">
        <div className="flex flex-col items-center">
          <Droplets className="w-5 h-5 text-blue-400 mb-2" />
          <span className="text-lg font-bold">{data.main.humidity}%</span>
          <span className="text-[10px] uppercase opacity-40 font-black">Humidity</span>
        </div>

        <div className="flex flex-col items-center border-x border-white/5">
          <Wind className="w-5 h-5 text-cyan-400 mb-2" />
          <span className="text-lg font-bold">{Math.round(data.wind.speed)} <small className="text-[10px]">km/h</small></span>
          <span className="text-[10px] uppercase opacity-40 font-black">Wind</span>
        </div>

        <div className="flex flex-col items-center">
          <Gauge className="w-5 h-5 text-purple-400 mb-2" />
          <span className="text-lg font-bold">{data.main.pressure}</span>
          <span className="text-[10px] uppercase opacity-40 font-black">hPa</span>
        </div>
      </div>
    </div>
  );
}