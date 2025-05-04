import React from 'react'
import {useSelector } from "react-redux";
import CountryCard from '../components/CountryCard';


const Favorites = () => {

  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="bg-white h-lvh dark:bg-[#18181C] shadow-[inset_0_0_30px_rgba(76,175,80,0.12)] dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]">
      {favorites.length == 0 ?
      <div className="flex-1 text-center h-48 flex items-center justify-center px-4">
        <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401] bg-clip-text text-transparent transform transition-all duration-700 dark:[text-shadow:0_0_4px_#9EFF00]p-3'>
          LOOKS LIKE YOU HAVE NO FAVORITES YET 
        </h1>
      </div>:''
      }
      {
       favorites && (
               <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-[5%] py-[5%]">
                 {favorites.slice(0, 12).map((country) => {
                   return <CountryCard key={country.name.common} country={country} />;
                })}
               </div>
        )}
    </div>
  )
}

export default Favorites