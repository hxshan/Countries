import React from "react";
import { useGetCountriesByCodesQuery } from "../features/countries/CountriesApi";
import { Globe } from 'lucide-react';
import BorderCountryCard from "./BorderCountryCard";
const BorderCountries = ({ borderCodes }) => {
  const {
    data: borderCountries,
    error,
    isLoading,
  } = useGetCountriesByCodesQuery(borderCodes);

  return (
    <div className="mt-6 p-5 bg-gray-50 dark:bg-[#272729] rounded-lg">
      <div className="flex items-center mb-3">
        <Globe className="mr-2 text-green-600 dark:text-[#9EFF00]" size={20} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Border Countries
        </h3>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">
            Loading border countries...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded">
          <p>
            Error loading border countries:{" "}
            {error.message || "Failed to fetch border countries"}
          </p>
        </div>
      ) : borderCountries && borderCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {borderCountries.map((country) => (
            <BorderCountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No border country information available.
        </p>
      )}
    </div>
  );
};

export default BorderCountries;
