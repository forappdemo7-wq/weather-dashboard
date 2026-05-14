import React from 'react';
import { Calendar } from 'lucide-react';
import { getSmallIcon } from '@/lib/getWeatherIcon';

interface ForecastCardProps {
  data: any;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  if (!data?.list) {
    return (
      <div className="glass-card rounded-[2.5rem] p-8 h-full flex items-center justify-center text-white/60">
        Forecast data unavailable
      </div>
    );
  }

  // Get one forecast per day (usually at 12:00)
  const dailyForecast = data.list
    .filter((item: any) => item.dt_txt?.includes("12:00:00"))
    .slice(0, 5);

  // Calculate min/max temp for better scaling
  const temps = dailyForecast.map((day: any) => day.main.temp);
  const minTemp = Math.min(...temps, 0);
  const maxTemp = Math.max(...temps, 40);
  const tempRange = maxTemp - minTemp || 30;

  return (
    <div className="glass-card rounded-[2.5rem] p-8 h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">
          5-DAY FORECAST
        </h2>
        <Calendar className="w-5 h-5 opacity-40" />
      </div>

      <div className="space-y-2 flex-grow flex flex-col justify-around">
        {dailyForecast.map((day: any, index: number) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          // Better temperature bar scaling
          const tempPercent = ((day.main.temp - minTemp) / tempRange) * 100;
          const barWidth = Math.max(25, Math.min(100, tempPercent));

          return (
            <div 
              key={index} 
              className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-xl px-2 transition-colors"
            >
              {/* Day Name */}
              <span className="w-10 font-bold text-sm opacity-70">
                {dayName}
              </span>

              {/* Weather Icon */}
              <div className="flex items-center justify-center w-9">
                {getSmallIcon(day.weather[0].icon)}
              </div>

              {/* Temperature Bar */}
              <div className="flex-1 px-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>

              {/* Temperature */}
              <span className="w-12 text-right font-bold tabular-nums text-lg">
                {Math.round(day.main.temp)}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}