'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AnimatedWeatherIcon from '@/components/AnimatedWeatherIcon';

import { MapPin, Pencil } from 'lucide-react';

import {
  getCurrentWeather,
  getForecast,
  getAirQuality
} from '@/lib/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [airData, setAirData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState('Surat');

  const [isEditingCity, setIsEditingCity] = useState(false);
  const [editCityValue, setEditCityValue] = useState('');

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);

        const weather = await getCurrentWeather(city);

        const [forecast, air] = await Promise.all([
          getForecast(city),
          getAirQuality(weather.coord.lat, weather.coord.lon)
        ]);

        setWeatherData(weather);
        setForecastData(forecast);
        setAirData(air);
      } catch (e) {
        console.error('Error loading weather data:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  const handleCityClick = () => {
    setEditCityValue(city);
    setIsEditingCity(true);
  };

  const handleCitySubmit = () => {
    if (editCityValue.trim() !== '') {
      setCity(editCityValue.trim());
    }

    setIsEditingCity(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleCitySubmit();
    } else if (e.key === 'Escape') {
      setIsEditingCity(false);
    }
  };

  if (loading || !weatherData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 text-center">
        <div className="animate-pulse text-xl">
          Loading Global Weather Hub...
        </div>
      </div>
    );
  }

  const aqiValue = airData?.list[0]?.main?.aqi || 0;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative overflow-x-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb')"
      }}
    >
      <div className="absolute inset-0 bg-black/70 md:bg-black/60"></div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* HEADER */}
        <div className="pt-10 pb-6 text-center px-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-yellow-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              GLOBAL WEATHER HUB
            </span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real-time weather, 5-day forecast, and air quality
            for any city or village on Earth.
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex flex-col items-center gap-4 px-6 pb-10">
          <div className="w-full max-w-xl">
            <SearchBar onSearch={setCity} />
          </div>

          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 transition-all text-sm md:text-base">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            Use Current Location
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="flex-1 px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {/* CURRENT WEATHER */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between">

              <div>
                <h3 className="uppercase tracking-[0.2em] text-xs font-semibold mb-6 text-cyan-300/80">
                  CURRENT WEATHER
                </h3>

                <div className="flex justify-between items-start gap-4">

                  <div className="flex-1">

                    {isEditingCity ? (
                      <input
                        type="text"
                        autoFocus
                        value={editCityValue}
                        onChange={(e) =>
                          setEditCityValue(e.target.value)
                        }
                        onBlur={handleCitySubmit}
                        onKeyDown={handleKeyDown}
                        className="text-2xl font-medium bg-black/40 border-b-2 border-cyan-400 outline-none w-full px-2 py-1 rounded-t-md text-white"
                      />
                    ) : (
                      <div
                        onClick={handleCityClick}
                        className="group flex items-center gap-2 cursor-pointer"
                      >
                        <p className="text-2xl md:text-3xl font-semibold hover:text-cyan-300 transition-colors">
                          {weatherData.customLocation?.name ||
                            weatherData.name}
                        </p>

                        <Pencil className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <p className="text-6xl md:text-7xl font-light mt-4 tracking-tighter">
                      {Math.round(weatherData.main.temp)}°C
                    </p>

                    <p className="text-lg md:text-xl text-gray-300 mt-1 capitalize font-medium">
                      {weatherData.weather[0].description}
                    </p>
                  </div>

                  <AnimatedWeatherIcon
                    condition={weatherData.weather[0].main}
                    temp={weatherData.main.temp}
                  />
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 mt-10 pt-6 border-t border-white/10">

                {[
                  {
                    label: 'Humidity',
                    value: `${weatherData.main.humidity}%`,
                    icon: '💧'
                  },
                  {
                    label: 'Wind',
                    value: `${Math.round(
                      weatherData.wind.speed * 3.6
                    )} km/h`,
                    icon: '🌬️'
                  },
                  {
                    label: 'Pressure',
                    value: `${weatherData.main.pressure}`,
                    icon: '📊'
                  }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl mb-1">
                      {stat.icon}
                    </div>

                    <p className="text-lg font-bold">
                      {stat.value}
                    </p>

                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FORECAST */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white overflow-hidden">

              <div className="relative z-10 h-full flex flex-col">

                <div className="flex items-center justify-between mb-8">
                  <h3 className="uppercase tracking-widest text-xl sm:text-2xl font-bold">
                    5-DAY FORECAST
                  </h3>

                  <div className="text-4xl opacity-80">
                    📅
                  </div>
                </div>

                <div className="relative h-32 mb-10 mt-auto">

                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 500 160"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor="#67e8f9"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22d3ee"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 20 95 C 80 88, 110 82, 140 78 S 220 72, 260 76 S 340 92, 380 68 S 450 55, 480 72"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {[70, 150, 250, 360, 455].map(
                      (x, i) => (
                        <circle
                          key={i}
                          cx={x}
                          cy={[86, 78, 76, 67, 73][i]}
                          r="5"
                          fill="#a5f3fc"
                        />
                      )
                    )}
                  </svg>

                  <div className="absolute inset-0 flex items-start justify-between px-2">
                    {forecastData?.list
                      .filter((_: any, i: number) => i % 8 === 0)
                      .slice(0, 5)
                      .map((day: any, i: number) => (
                        <div
                          key={i}
                          className="flex flex-col items-center"
                          style={{
                            marginTop: `${
                              [42, 30, 28, 12, 25][i]
                            }px`
                          }}
                        >
                          <p className="text-sm font-bold">
                            {Math.round(day.main.temp)}°
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1 text-center">

                  {forecastData?.list
                    .filter((_: any, i: number) => i % 8 === 0)
                    .slice(0, 5)
                    .map((day: any, i: number) => (
                      <div
                        key={i}
                        className="flex flex-col items-center"
                      >
                        <div className="scale-50 mb-[-20px] mt-[-10px]">
                          <AnimatedWeatherIcon
                            condition={day.weather[0].main}
                            temp={day.main.temp}
                          />
                        </div>

                        <p className="text-[10px] text-white/60 uppercase font-bold tracking-tighter">
                          {new Date(
                            day.dt * 1000
                          ).toLocaleDateString('en-US', {
                            weekday: 'short'
                          })}
                        </p>

                        <p className="text-base font-bold">
                          {Math.round(day.main.temp)}°
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* AIR QUALITY */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white overflow-hidden">

              <div className="relative z-10 flex flex-col h-full">

                <h3 className="uppercase tracking-widest text-xl sm:text-2xl font-bold mb-6">
                  AIR QUALITY
                </h3>

                <div className="flex flex-col items-center justify-center flex-1">

                  <div className="relative w-full max-w-[240px] aspect-[4/3] flex items-center justify-center">

                    <svg
                      viewBox="0 0 260 160"
                      className="w-full h-full"
                    >
                      <path
                        d="M40 130 A90 90 0 0 1 220 130"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      <path
                        d="M40 130 A90 90 0 0 1 95 52"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      <path
                        d="M95 52 A90 90 0 0 1 165 52"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      <path
                        d="M165 52 A90 90 0 0 1 220 130"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      <circle
                        cx={
                          aqiValue <= 2
                            ? '75'
                            : aqiValue <= 4
                            ? '130'
                            : '190'
                        }
                        cy={
                          aqiValue <= 2
                            ? '75'
                            : aqiValue <= 4
                            ? '42'
                            : '75'
                        }
                        r="8"
                        fill="white"
                        className="shadow-lg transition-all duration-1000"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">

                      <p className="text-lg font-medium text-gray-300">
                        AQI
                      </p>

                      <p
                        className={`text-2xl md:text-3xl font-black ${
                          aqiValue <= 2
                            ? 'text-green-400'
                            : aqiValue <= 4
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {aqiValue * 20}
                      </p>

                      <p className="text-sm font-bold uppercase tracking-widest">
                        {aqiValue <= 2
                          ? 'Good'
                          : aqiValue <= 4
                          ? 'Moderate'
                          : 'Poor'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 text-xs md:text-sm text-gray-300 bg-white/5 p-4 rounded-2xl w-full">

                    <p className="flex justify-between">
                      <span>PM2.5:</span>

                      <span className="text-white font-mono">
                        {airData?.list[0]?.components?.pm2_5.toFixed(
                          1
                        )}
                      </span>
                    </p>

                    <p className="flex justify-between">
                      <span>PM10:</span>

                      <span className="text-white font-mono">
                        {airData?.list[0]?.components?.pm10.toFixed(
                          1
                        )}
                      </span>
                    </p>

                    <p className="flex justify-between col-span-2 border-t border-white/10 pt-2 mt-1">
                      <span>Nitrogen Dioxide (NO2):</span>

                      <span className="text-white font-mono">
                        {airData?.list[0]?.components?.no2.toFixed(
                          2
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}