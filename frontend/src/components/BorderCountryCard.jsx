import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BorderCountryCard = ({ country }) => {
  return (
    <Link 
      to={`/country/${country.name.common}`} 
      className="flex items-center bg-white dark:bg-[#272729] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Flag */}
      <div className="h-16 w-20 flex-shrink-0">
        <img 
          src={country.flags?.png || country.flags?.svg} 
          alt={`Flag of ${country.name.common}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Country info */}
      <div className="flex-grow px-3 py-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">
          {country.name.common}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {country.capital?.[0] || 'No capital'}
        </p>
      </div>
      
      {/* Navigation indicator */}
      <div className="px-2 text-green-600 dark:text-[#9EFF00]">
        <ChevronRight size={16} />
      </div>
    </Link>
  );
};

export default BorderCountryCard;