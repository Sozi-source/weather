'use client'
import { useEffect, useState } from "react"


const Home: React.FC=()=>{

  const [weather, setWeather] = useState<weatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("London")

const apiurl = `https://api.weatherapi.com/v1/current.json?key=4c7cb41998584736bfb182219252111&q=${search}&aqi=no`



  const fetchweather=async(city: string)=>{
    setLoading(true)

    try {
    const response = await fetch(apiurl)
    const data = await response.json()
    setWeather(data)
    setLoading(false)
         
    } catch (error) {
      console.error("Error fetching weather data:", error)
      setLoading(false)
    }finally {
      setLoading(false)
    }
  }
 
  useEffect(()=>{
    fetchweather(search)
  }, [])
const handleSearch=(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  fetchweather(search)
}

  
  if (loading) return <p>Loading...</p>
  
  return(
     <div className="flex justify-center items-center bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter city name..."
            className="text-black font-semibold flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition-colors"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500 animate-pulse text-lg text-green-500">Loading...</p>}

        {weather && !loading && (
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {weather.location.name}, {weather.location.country}
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mb-4 text-gray-600">{weather.location.localtime}</p>

            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="w-24 h-24 sm:w-28 sm:h-28"
              />
              <div className="text-center sm:text-left">
                <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
                  {weather.current.temp_c}°C
                </p>
                <p className="text-gray-500 text-gray-600">Feels like {weather.current.feelslike_c}°C</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-6">
              <div className="bg-indigo-50 p-4 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Condition</p>
                <p className="font-semibold text-gray-800">{weather.current.condition.text}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Humidity</p>
                <p className="font-semibold text-gray-800">{weather.current.humidity}%</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Wind</p>
                <p className="font-semibold text-gray-800">{weather.current.wind_kph} kph {weather.current.wind_dir}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Last Updated</p>
                <p className="font-semibold text-gray-800">{weather.current.last_updated}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home;