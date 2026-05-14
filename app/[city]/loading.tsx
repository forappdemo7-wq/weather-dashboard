import SearchBar from '@/components/SearchBar';
import WeatherSkeleton from '@/components/WeatherSkeleton';

export default function CityLoading() {
  return (
    <div>
      <SearchBar onSearch={() => {}} />
      <WeatherSkeleton />
    </div>
  );
}