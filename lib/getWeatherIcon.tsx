import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, 
  CloudSnow, CloudDrizzle, CloudSun, Fog 
} from 'lucide-react';

// The main large icon helper
export const getWeatherIcon = (iconCode: string, className: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    '01d': <Sun className={`${className} text-yellow-400`} />,
    '01n': <Sun className={`${className} text-gray-400`} />,
    '02d': <CloudSun className={`${className} text-gray-200`} />,
    '02n': <CloudSun className={`${className} text-gray-400`} />,
    '03d': <Cloud className={`${className} text-gray-300`} />,
    '03n': <Cloud className={`${className} text-gray-500`} />,
    '04d': <Cloud className={`${className} text-gray-400`} />,
    '04n': <Cloud className={`${className} text-gray-600`} />,
    '09d': <CloudDrizzle className={`${className} text-blue-300`} />,
    '10d': <CloudRain className={`${className} text-blue-500`} />,
    '11d': <CloudLightning className={`${className} text-yellow-600`} />,
    '13d': <CloudSnow className={`${className} text-cyan-100`} />,
    '50d': <Cloud className={`${className} text-slate-300`} />,
  };
  return iconMap[iconCode] || <Sun className={`${className} text-yellow-400`} />;
};

// The smaller version for the forecast list
export const getSmallIcon = (iconCode: string) => {
  return getWeatherIcon(iconCode, "w-6 h-6");
};