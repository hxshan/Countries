import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetCountriesByRegionQuery, useGetRegionsQuery } from '../features/countries/CountriesApi';
import CountryCard from '../components/CountryCard';

const Region = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const { data: regions, error:regionsLoading, isLoading:regionsError } = useGetRegionsQuery();   

    const { data: countries, error: countriesError,  isLoading: countriesLoading } = useGetCountriesByRegionQuery(selectedRegion,{skip:!selectedRegion})

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    if (regions?.length > 0 && !selectedRegion) {
      setSelectedRegion(regions[0]);
    }
  }, [regions,selectedRegion]);

  return (
    <div data-testid="region-container" className="bg-white dark:bg-[#18181C] min-h-screen shadow-[inset_0_0_30px_rgba(76,175,80,0.12)] dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]">
      
      <div className="px-[5%] py-6">
        <h1 className='text-3xl text-center py-3 md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401] bg-clip-text text-transparent transform transition-all duration-700 dark:[text-shadow:0_0_4px_#9EFF00]p-3'>
            Countries by Region
        </h1>
       
        {regionsLoading ? (
          <div className="flex justify-center items-center py-20">
            <div
            role="status" 
            aria-label="Loading regions"
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] dark:border-[#9EFF00]"></div>
          </div>
        ) : (
          <>
            <div className="my-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {regions?.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedRegion === region
                        ? 'bg-[#4CAF50] dark:bg-[#9EFF00] text-white dark:text-black font-medium'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            {selectedRegion && (
              <>
                {countriesLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] dark:border-[#9EFF00]"></div>
                  </div>
                ) : countries && countries.length > 0 ? (
                  <>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                      Countries in {selectedRegion} ({countries.length})
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-4">
                      {countries.map((country) => (
                        <CountryCard key={country.name.common} country={country} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div data-testid="error-message" className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">
                      No countries found for {selectedRegion}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Region;