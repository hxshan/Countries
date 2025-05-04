import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const quotes = [
    "Travel is the language of peace that transcends all borders.",
    "Each culture holds a piece of humanity's collective wisdom.",
    "The world is a book and those who do not travel read only one page.",
    "Understanding begins when we step into another's homeland.",
    "Discover traditions that turn strangers into family.",
    "Every journey reshapes your map of the world.",
    "Cultural bridges span the widest oceans.",
    "Where curiosity meets culture, wisdom flourishes."
  ];
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('opacity-100');
  
  useEffect(() => {
    // Cycle through quotes
    const intervalId = setInterval(() => {
      setAnimationClass('opacity-0 translate-y-4');
      
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setTimeout(() => {
          setAnimationClass('opacity-100 translate-y-0');
        }, 100);
      }, 700);
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="w-full bg-white dark:bg-[#18181C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center h-48 flex items-center justify-center">
            <h1 
             className={`text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] dark:from-[#9EFF00] dark:to-[#97F401] bg-clip-text text-transparent transform transition-all duration-700 dark:[text-shadow:0_0_4px_#9EFF00] ${animationClass} p-3`}

            >
              {quotes[currentQuoteIndex]}
            </h1>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Header;