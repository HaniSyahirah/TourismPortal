import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Wind, 
  Thermometer, 
  MapPin, 
  RefreshCw, 
  AlertCircle, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface WeatherAppProps {
  initialDestinationId?: string;
  onNavigateToBooking: (destName: string) => void;
}

interface CurrentWeatherData {
  temperature: number;
  apparentTemperature: number;
  windSpeed: number;
  weatherCode: number;
  conditionDescription: string;
  isDay: number;
  time: string;
}

// Convert Open-Meteo WMO weather codes to human-readable description
function getWeatherDescription(code: number): { text: string; category: 'clear' | 'cloudy' | 'rainy' | 'storm' } {
  if (code === 0) return { text: 'Clear Sky / Sunny', category: 'clear' };
  if (code === 1 || code === 2) return { text: 'Mainly Clear / Partly Cloudy', category: 'cloudy' };
  if (code === 3) return { text: 'Overcast', category: 'cloudy' };
  if (code >= 45 && code <= 48) return { text: 'Foggy / Hazy Atmosphere', category: 'cloudy' };
  if (code >= 51 && code <= 55) return { text: 'Light Tropical Drizzle', category: 'rainy' };
  if (code >= 61 && code <= 65) return { text: 'Tropical Rain Showers', category: 'rainy' };
  if (code >= 80 && code <= 82) return { text: 'Moderate to Heavy Showers', category: 'rainy' };
  if (code >= 95 && code <= 99) return { text: 'Thunderstorm with Rainfall', category: 'storm' };
  return { text: 'Fair Weather', category: 'clear' };
}

export const WeatherApp: React.FC<WeatherAppProps> = ({
  initialDestinationId = 'kuala-lumpur',
  onNavigateToBooking
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestinationId);
  const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  const fetchLiveWeather = async (lat: number, lng: number) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // Public Open-Meteo REST API endpoint (no secret key required)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=Asia%2FKuala_Lumpur`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather service returned status code ${response.status}`);
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error('Weather data payload is empty.');
      }

      const code = data.current.weather_code ?? 0;
      const desc = getWeatherDescription(code);

      setWeatherData({
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature ?? data.current.temperature_2m),
        windSpeed: Math.round(data.current.wind_speed_10m ?? 10),
        weatherCode: code,
        conditionDescription: desc.text,
        isDay: data.current.is_day ?? 1,
        time: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err: any) {
      console.error('Weather fetch error:', err);
      setErrorMessage(
        'Unable to retrieve live weather data from Open-Meteo at this moment. Please check your network connection and try again.'
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDestination) {
      fetchLiveWeather(selectedDestination.coordinates.lat, selectedDestination.coordinates.lng);
    }
  }, [selectedDestId]);

  const renderWeatherIcon = (code: number) => {
    const desc = getWeatherDescription(code);
    if (desc.category === 'clear') {
      return <Sun className="w-14 h-14 text-amber-500" />;
    }
    if (desc.category === 'rainy') {
      return <CloudRain className="w-14 h-14 text-teal-600" />;
    }
    if (desc.category === 'storm') {
      return <CloudLightning className="w-14 h-14 text-indigo-600" />;
    }
    return <CloudSun className="w-14 h-14 text-emerald-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 font-semibold text-xs border border-emerald-200">
          <CloudSun className="w-4 h-4 text-emerald-800" />
          <span>Real-Time Live Weather Forecast</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Malaysia Weather Forecast
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Access real-time meteorological reports across 10 top Malaysian travel destinations powered live by Open-Meteo.
        </p>
      </div>

      {/* Destination Selection Bar */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          Select Malaysian Destination (10 Locations):
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {DESTINATIONS.map((dest) => {
            const isSelected = dest.id === selectedDestId;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestId(dest.id)}
                className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  isSelected
                    ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E7E2D8] text-stone-800 hover:bg-[#F2EDE4]'
                }`}
              >
                <span className="font-bold truncate">{dest.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                  {dest.state}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Weather Display Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E2D8] shadow-sm">
        
        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center space-y-4">
            <RefreshCw className="w-10 h-10 text-emerald-800 animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Fetching Real-Time Weather for {selectedDestination.name}...
            </h3>
            <p className="text-xs text-stone-500">
              Querying Open-Meteo REST API (GPS: {selectedDestination.coordinates.lat}° N, {selectedDestination.coordinates.lng}° E)...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && errorMessage && (
          <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Weather Service Notice
            </h3>
            <p className="text-xs text-rose-700 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={() => fetchLiveWeather(selectedDestination.coordinates.lat, selectedDestination.coordinates.lng)}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Weather Request</span>
            </button>
          </div>
        )}

        {/* Weather Results */}
        {!loading && !errorMessage && weatherData && (
          <div className="space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2D8]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>{selectedDestination.name}, {selectedDestination.state}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                  Current Meteorological Condition
                </h2>
                <span className="text-[11px] text-stone-500">
                  Updated: {weatherData.time} MYT • Open-Meteo REST Service
                </span>
              </div>

              <button
                onClick={() => fetchLiveWeather(selectedDestination.coordinates.lat, selectedDestination.coordinates.lng)}
                className="px-4 py-2.5 rounded-xl border border-[#DCD6C9] bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                <span>Refresh Live Data</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Temperature */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Current Temperature
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-stone-900 mt-2 font-serif">
                    {weatherData.temperature}°C
                  </div>
                  <span className="text-xs text-stone-600 mt-1 block">
                    Feels like: {weatherData.apparentTemperature}°C
                  </span>
                </div>
                <div>{renderWeatherIcon(weatherData.weatherCode)}</div>
              </div>

              {/* Weather Condition */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] flex flex-col justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Sky & Weather Status
                </span>
                <div className="my-2">
                  <div className="text-xl font-bold text-emerald-900">
                    {weatherData.conditionDescription}
                  </div>
                  <span className="text-xs text-stone-500">
                    WMO Code: {weatherData.weatherCode}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Real-time tropical weather station telemetry</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Wind Velocity
                  </span>
                  <Wind className="w-5 h-5 text-teal-700" />
                </div>
                <div className="my-2">
                  <div className="text-3xl font-bold text-stone-900 font-serif">
                    {weatherData.windSpeed} <span className="text-lg font-normal text-stone-500">km/h</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Surface wind speed
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  GPS: {selectedDestination.coordinates.lat}°, {selectedDestination.coordinates.lng}°
                </div>
              </div>

            </div>

            {/* Quick Action to Plan Journey */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-emerald-900">
                  Planning a trip to {selectedDestination.name}?
                </h4>
                <p className="text-xs text-emerald-800">
                  Check available dates and submit your reservation request.
                </p>
              </div>
              <button
                onClick={() => onNavigateToBooking(selectedDestination.name)}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Plan Journey for {selectedDestination.name}</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

