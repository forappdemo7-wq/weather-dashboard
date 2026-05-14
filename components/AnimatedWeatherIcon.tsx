'use client';

interface Props {
  condition: string;
  temp: number;
}

export default function AnimatedWeatherIcon({
  condition,
  temp
}: Props) {
  const weather = condition?.toLowerCase();

  if (weather.includes('rain')) {
    return (
      <div className="text-7xl animate-bounce">
        🌧️
      </div>
    );
  }

  if (weather.includes('cloud')) {
    return (
      <div className="text-7xl animate-pulse">
        ☁️
      </div>
    );
  }

  if (weather.includes('snow')) {
    return (
      <div className="text-7xl animate-spin">
        ❄️
      </div>
    );
  }

  if (
    weather.includes('clear') ||
    weather.includes('sun')
  ) {
    return (
      <div className="text-7xl animate-spin">
        ☀️
      </div>
    );
  }

  if (weather.includes('thunder')) {
    return (
      <div className="text-7xl animate-pulse">
        ⛈️
      </div>
    );
  }

  return (
    <div className="text-7xl animate-pulse">
      🌤️
    </div>
  );
}