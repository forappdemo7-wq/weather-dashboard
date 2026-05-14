import { getCurrentWeather, getForecast, getAirQuality } from '@/lib/weather';
import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import ForecastCard from '@/components/ForecastCard';
import AirQualityCard from '@/components/AirQualityCard';

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.city);

  try {
    const weather = await getCurrentWeather(city);
    const forecast = await getForecast(city);
    const airQuality = await getAirQuality(weather.coord.lat, weather.coord.lon);

    return (
      <main className="relative min-h-screen w-full">
        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 animate-fade-in-up">
          <div className="flex flex-col items-center mb-10">
            <SearchBar />
          </div>

          {/* Grid Layout: Stacks on mobile, 3-columns on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CurrentWeatherCard data={weather} />
            <ForecastCard data={forecast} />
            <AirQualityCard data={airQuality} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    throw error;
  }
}