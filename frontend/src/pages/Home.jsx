import React from "react";
import Header from "../components/Header";
import { useGetAllCountriesQuery } from "../features/countries/CountriesApi";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const { data, error, isLoading } = useGetAllCountriesQuery();
  return (
    <div className="min-h-screen bg-white dark:bg-[#18181C]">
      <Header />
      <div className="bg-white dark:bg-[#18181C] shadow-[inset_0_0_30px_rgba(76,175,80,0.12)] dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]">
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="flex justify-center items-center py-20"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] dark:border-[#9EFF00]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mx-[5%]">
            <p className="text-red-600 dark:text-red-400">
              Error loading countries. Please try again later.
            </p>
          </div>
        )}
        {data && (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-[5%] py-[5%]">
            {data.slice(0, 12).map((country) => {
              return (
                <CountryCard
                  data-testid="country-card"
                  key={country.name.common}
                  country={country}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
