export default function WeatherSkeleton() {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="pt-8 pb-6 text-center px-4">
        <div className="w-full max-w-md mx-auto h-12 bg-white/10 rounded-full animate-pulse"></div>
      </div>
      <div className="flex-1 px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-96 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}