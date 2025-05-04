import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addFav, removeFav } from "../features/countries/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CountryCard({ country }) {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFav(country.cca3));
    } else {
      dispatch(addFav(country));
    }
  };
  const navigate = useNavigate();
  console.log(country.name.common)
  return (
    <div
      data-testid="country-card"
      className="bg-white col-span-1 hover:cursor-pointer dark:bg-[#18181C] rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(158,255,0,0.2)]"
      onClick={() => navigate(`/country/${country.name.common}`)}
    >
      <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
        {country.flags && (
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className="absolute hover:cursor-pointer top-3 right-3 p-2 bg-white dark:bg-[#18181C] rounded-full shadow-md transition-all hover:scale-110"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            className={
              isFavorite ? "fill-[#9EFF00] text-[#9EFF00]" : "text-gray-400"
            }
          />
        </button>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
            {country.name.common}
          </h3>
          <span className="text-lg dark:text-[#9EFF00] font-bold">
            {country.flag}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {country.name.official}
        </p>

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Capital</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {country.capital ? country.capital.join(", ") : "N/A"}
            </span>
          </div>

          {/* <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Region</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {country.region || 'N/A'}
            </span>
          </div> */}

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Population</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {country.population?.toLocaleString() || "N/A"}
            </span>
          </div>

          {/* <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Languages</span>
            <span className="font-medium text-gray-800 dark:text-white text-right">
              {country.languages ? 
                Object.values(country.languages).slice(0, 2).join(', ') + 
                (Object.values(country.languages).length > 2 ? '...' : '') 
                : 'N/A'}
            </span>
          </div> */}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
            {country.cca2}
          </span>
          <a
            href={country.maps?.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#4CAF50] hover:text-[#2E7D32] dark:text-[#9EFF00] dark:hover:text-[#B4FF4D] transition-colors"
          >
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
}
