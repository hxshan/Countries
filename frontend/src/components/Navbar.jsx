import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/theme/themeSlice";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
<nav className="sticky top-0 z-50 bg-white dark:bg-[#18181C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-[#4CAF50] dark:text-gray-300 dark:hover:text-[#9EFF00] px-3 py-2 rounded-md font-medium relative group"
              >
                Home
                <span
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401]
                 group-hover:w-full transition-all duration-300 ease-in-out ${
                   pathname == "/" ? "w-full" : "w-0 group-hover:w-full"
                 }`}
                />
              </Link>
              <Link
                to="/region"
                className="text-gray-600 hover:text-[#4CAF50] dark:text-gray-300 dark:hover:text-[#9EFF00] px-3 py-2 rounded-md font-medium relative group"
              >
                Region
                <span
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401]
                 group-hover:w-full transition-all duration-300 ease-in-out ${
                   pathname == "/region" ? "w-full" : "w-0 group-hover:w-full"
                 }`}
                />
              </Link>
              <Link
                to="/search"
                className={`text-gray-600 hover:text-[#4CAF50] dark:text-gray-300 dark:hover:text-[#9EFF00] px-3 py-2 rounded-md font-medium relative group `}
              >
                Search
                <span
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401]
                 group-hover:w-full transition-all duration-300 ease-in-out ${
                    pathname == "/search" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
             
              <Link
                to="/favorites"
                className="text-gray-600 hover:text-[#4CAF50] dark:text-gray-300 dark:hover:text-[#9EFF00] px-3 py-2 rounded-md font-medium relative group"
              >
                Favorites
                <span
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401]
                    group-hover:w-full transition-all duration-300 ease-in-out ${
                       pathname == "/favorites" ? "w-full" : "w-0 group-hover:w-full"
                     }`}
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between sm: w-full md:w-20">
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 pl-0 rounded-md text-gray-600 dark:text-gray-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <button
              onClick={handleToggleDarkMode}
              className="ml-4 p-2 rounded-full text-gray-600 hover:text-[#4CAF50] cursor-pointer dark:text-gray-300 dark:hover:text-[#9EFF00] focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-[#18181C] shadow-inner">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 dark:text-gray-300 dark:hover:text-[#9EFF00] dark:hover:bg-[#222226]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/compare"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#9EFF00] hover:bg-[#222226] dark:text-gray-300 dark:hover:text-[#9EFF00] dark:hover:bg-[#222226]"
            onClick={() => setIsMenuOpen(false)}
          >
            Compare
          </Link>
          <Link
            to="/favorites"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#9EFF00] hover:bg-[#222226] dark:text-gray-300 dark:hover:text-[#9EFF00] dark:hover:bg-[#222226]"
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};
