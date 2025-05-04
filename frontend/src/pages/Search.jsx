import React from "react";
import { useState, useMemo } from "react";
import { useGetAllCountriesQuery } from "../features/countries/countriesApi";
import CountryCard from "../components/CountryCard";

const Search = () => {
  const { data: countries = [], isLoading } = useGetAllCountriesQuery();
  const [searchName, setSearchName] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubregion] = useState("");
  const [minPopulation, setMinPopulation] = useState("");
  const [maxPopulation, setMaxPopulation] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (region) {
      result = result.filter((c) => c.region === region);
    }
    if (subregion) {
      result = result.filter((c) => c.subregion === subregion);
    }
    if (minPopulation) {
      result = result.filter((c) => c.population >= parseInt(minPopulation));
    }
    if (maxPopulation) {
      result = result.filter((c) => c.population <= parseInt(maxPopulation));
    }
    if (searchName.trim()) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    return result;
  }, [countries, region, subregion, minPopulation, maxPopulation, searchName]);

  const uniqueRegions = [...new Set(countries.map((c) => c.region))].filter(
    Boolean
  );
  const uniqueSubregions = [
    ...new Set(countries.map((c) => c.subregion)),
  ].filter(Boolean);

  return (
    <div className="bg-white dark:bg-[#18181C] min-h-screen px-[5%] py-10 dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]">
      <h1 className="text-3xl text-center py-3 md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401] bg-clip-text text-transparent transform transition-all duration-700 dark:[text-shadow:0_0_4px_#9EFF00]p-3">
        Search
      </h1>

      <div>
        <div className="my-6">
          <label
            htmlFor="searchName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search by Country Name
          </label>
          <input
            type="text"
            id="searchName"
            placeholder="e.g., Canada"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm dark:bg-[#1f1f1f] dark:text-white dark:border-gray-600 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 rounded-lg dark:text-white bg-white dark:bg-[#27272A] border dark:border-[#333]"
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={subregion}
          onChange={(e) => setSubregion(e.target.value)}
          className="p-2 rounded-lg dark:text-white bg-white dark:bg-[#27272A] border dark:border-[#333]"
        >
          <option value="">All Subregions</option>
          {uniqueSubregions.map((sr) => (
            <option key={sr} value={sr}>
              {sr}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Population"
            className="flex-1 p-2 rounded-lg bg-white dark:bg-[#27272A] border dark:border-[#333] dark:text-white dark:placeholder:text-white"
            value={minPopulation}
            onChange={(e) => setMinPopulation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Population"
            className="flex-1 p-2 rounded-lg bg-white dark:bg-[#27272A] border dark:border-[#333] dark:text-white dark:placeholder:text-white"
            value={maxPopulation}
            onChange={(e) => setMaxPopulation(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Area (km²)"
            className="flex-1 p-2 rounded-lg bg-white dark:bg-[#27272A] border dark:border-[#333] dark:text-white dark:placeholder:text-white"
            value={minArea}
            onChange={(e) => setMinArea(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Area (km²)"
            className="flex-1 p-2 rounded-lg bg-white dark:bg-[#27272A] border dark:border-[#333] dark:text-white dark:placeholder:text-white"
            value={maxArea}
            onChange={(e) => setMaxArea(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          Loading countries...
        </p>
      ) : filteredCountries.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          No countries found matching your criteria.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredCountries.slice(0, 12).map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
