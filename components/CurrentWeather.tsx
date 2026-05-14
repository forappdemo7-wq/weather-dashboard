import { WeatherData } from '@/types/weather';
import { Sun, Wind, Droplets, Gauge } from 'lucide-react';

export default function CurrentWeather({ data }: { data: WeatherData }) {
  return (
    <div className="glass-card rounded-[2.5rem] p-8 h-full flex flex-col justify-between">
      <h2 className="text-xl font-bold uppercase tracking-widest text-white/90 mb-6">Current Weather</h2>
      <div className="flex items-center justify-between">
        <Sun className="w-28 h-28 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        <div className="text-right text-white">
          <p className="text-white/60 text-lg">{data.name}, {data.sys.country}</p>
          <p className="text-7xl font-bold tracking-tighter">{Math.round(data.main.temp)}°C</p>
          <p className="text-xl font-medium capitalize">{data.weather[0].description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10 text-white">
        <div className="text-center">
          <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-400" />
          <p className="font-bold">{data.main.humidity}%</p>
          <p className="text-[10px] uppercase text-white/50">Humidity</p>
        </div>
        <div className="text-center">
          <Wind className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
          <p className="font-bold">{data.wind.speed} km/h</p>
          <p className="text-[10px] uppercase text-white/50">Wind</p>
        </div>
        <div className="text-center">
          <Gauge className="w-6 h-6 mx-auto mb-2 text-purple-400" />
          <p className="font-bold">{data.main.pressure}</p>
          <p className="text-[10px] uppercase text-white/50">hPa</p>
        </div>
      </div>
    </div>
  );
}