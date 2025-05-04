import React from 'react'
import {useGetCountryByNameQuery } from '../features/countries/countriesApi'
import { useParams } from 'react-router-dom'
import InfoFeild from '../components/InfoFeild';
import { MapPin, Globe, Users, Calendar, DollarSign, Flag, Mountain } from 'lucide-react'
import BorderCountries from '../components/BorderCountries';

const Country = () => {
  const name = useParams();
  console.log(name)
  const { data:country, error, isLoading } = useGetCountryByNameQuery(name.name)

 
  
  const formatCurrencies = () => {
    if (!countryData.currencies) return "N/A";
    return Object.values(countryData.currencies)
      .map((c) => `${c.name} (${c.symbol || 'N/A'})`)
      .join(", ");
  };
  
  const formatLanguages = () => {
    if (!countryData.languages) return "N/A";
    return Object.values(countryData.languages).join(", ");
  };

  // console.log(country)

  if (isLoading) {
    return (
      <div className="h-lvh flex items-center justify-center bg-white dark:bg-[#18181C]">
        <h1 className="text-2xl font-medium text-gray-800 dark:text-[#9EFF00]">
          Loading country information...
        </h1>
      </div>
    );
  }

  if (error || !country || country.length === 0) {
    return (
      <div className="h-lvh flex items-center justify-center bg-white dark:bg-[#18181C]">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-[#9EFF00]">
          Country not found.
        </h1>
      </div>
    );
  }
  const countryData = country[0];

  return (
    <div className="bg-white dark:bg-[#18181C] flex-grow py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1F1F23] rounded-xl shadow-lg overflow-hidden">
       
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-800 dark:to-[#9EFF00]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url(${countryData.flags?.png})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-end gap-4">
              <div className="w-20 h-16 md:w-24 md:h-20 rounded shadow-lg overflow-hidden border-2 border-white">
                <img
                  src={countryData.flags?.png}
                  alt={`Flag of ${countryData.name.common}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {countryData.name.common}
                </h2>
                <p className="text-white/90 text-sm md:text-base">
                  {countryData.name.official}
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <InfoFeild 
                icon={<MapPin className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Capital" 
                value={countryData.capital?.join(", ") || "N/A"} 
              />
              <InfoFeild 
                icon={<Globe className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Region" 
                value={`${countryData.region}${countryData.subregion ? ` (${countryData.subregion})` : ''}`} 
              />
              <InfoFeild 
                icon={<Users className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Population" 
                value={countryData.population.toLocaleString()} 
              />
              <InfoFeild 
                icon={<Mountain className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Area" 
                value={`${countryData.area.toLocaleString()} km²`} 
              />
            </div>
            <div>
              <InfoFeild 
                icon={<DollarSign className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Currencies" 
                value={formatCurrencies()} 
              />
              <InfoFeild 
                icon={<Globe className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Languages" 
                value={formatLanguages()} 
              />
              <InfoFeild 
                icon={<Calendar className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Timezones" 
                value={countryData.timezones?.slice(0, 3).join(", ") + (countryData.timezones?.length > 3 ? "..." : "")} 
              />
              <InfoFeild 
                icon={<Flag className="text-green-600 dark:text-[#9EFF00]" />} 
                label="Top Level Domain" 
                value={countryData.tld?.join(", ") || "N/A"} 
              />
            </div>
          </div>

          {countryData.maps?.googleMaps && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-[#272729] rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-[#9EFF00]">
                Maps
              </h3>
              <a 
                href={countryData.maps.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View on Google Maps
              </a>
            </div>
          )}

          {countryData.borders && countryData.borders.length > 0 && (
            <BorderCountries borderCodes={countryData.borders}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Country