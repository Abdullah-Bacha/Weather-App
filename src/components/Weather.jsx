import React, { useState } from "react";
import api from "../api/api";
import { Megaphone } from "lucide-react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/weather", {
        params: { q: city },
      });
      setWeather(response.data);
      setCity("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Weather App</h1>
      </header>

      <main className="flex-1 grid grid-cols-12">
        <div className="col-span-4 bg-gray-200 p-4">
          <div className="flex items-center gap-3 bg-blue-600 text-white mb-10 mt-5 p-4 w-50 m-auto border rounded-xl">
            <Megaphone className="w-6 h-6 text-yellow-300" />
            <span className="font-bold">Announcement!</span>
          </div>

          <p className="text-gray-700 font-medium leading-tight mb-5 ml-6 w-80">
            Welcome to the Weather Dashboard! Enter your city name to instantly
            view the latest weather updates, including current temperature,
            atmospheric conditions, and other essential details.
          </p>

          <label className="text-sm font-semibold text-slate-700 ml-1">
            <span className="text-[#4e3534] font-bold leading-tight">
              City Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Type your city..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError("");
            }}
            className="w-full pl-12 mt-1 pr-4 py-3 bg-white border border-slate-100 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Error message */}
          {error && (
            <p className="text-red-600 font-semibold mt-2 ml-1">{error}</p>
          )}

          <button
            onClick={fetchWeather}
            className="bg-blue-600 mt-6 w-full hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        <div className="col-span-8 bg-white p-4">
          <h2 className="font-bold mb-12">Weather Details</h2>

          {weather && (
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 transition-all hover:shadow-1xl">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {weather.name},{" "}
                  <span className="text-blue-500">{weather.sys.country}</span>
                </h2>
                <p className="text-slate-500 font-medium capitalize flex items-center gap-1">
                  ☁️ {weather.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    Temp
                  </span>
                  <span className="text-xl font-bold text-blue-900">
                    {weather.main.temp}°C
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                    Humidity
                  </span>
                  <span className="text-xl font-bold text-orange-900">
                    {weather.main.humidity}%
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                    Wind Speed
                  </span>
                  <span className="text-xl font-bold text-green-900">
                    {weather.wind.speed} m/s
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                    Pressure
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    {weather.main.pressure} hPa
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                    Visibility
                  </span>
                  <span className="text-xl font-bold text-indigo-900">
                    {weather.visibility / 1000} km
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">
                    Feels Like
                  </span>
                  <span className="text-xl font-bold text-purple-900">
                    {weather.main.feels_like}°C
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-xs font-medium text-slate-400 bg-slate-50 p-2 rounded-lg">
                <span>
                  🌅 Sunrise:{" "}
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>
                  🌇 Sunset:{" "}
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Weather;
