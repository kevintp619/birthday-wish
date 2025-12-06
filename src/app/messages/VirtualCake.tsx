"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualCakeProps {
  onAllCandlesBlown: () => void;
  age: number;
}

const VirtualCake: React.FC<VirtualCakeProps> = ({ onAllCandlesBlown, age }) => {
  // Limit candles to 120 for rendering performance
  const displayAge = Math.min(age, 120);
  const [candles, setCandles] = useState<boolean[]>(Array(displayAge).fill(true));
  const [isBlowing, setIsBlowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [blowCount, setBlowCount] = useState(0);

  const blowCandle = (index: number) => {
    if (candles[index]) {
      const newCandles = [...candles];
      newCandles[index] = false;
      setCandles(newCandles);

      // Check if all candles are blown
      if (newCandles.every(c => !c)) {
        setShowMessage(true);
        setTimeout(() => {
          onAllCandlesBlown();
        }, 2000);
      }
    }
  };

  const handleCandleClick = (index: number) => {
    blowCandle(index);
    if (candles.filter(c => c).length > 1) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const handleBlow = () => {
    setIsBlowing(true);
    setBlowCount(prev => prev + 1);
    
    // Blow out random candles
    const litCandles = candles.map((lit, i) => ({ lit, i })).filter(c => c.lit);
    if (litCandles.length > 0) {
      const randomIndex = litCandles[Math.floor(Math.random() * litCandles.length)].i;
      blowCandle(randomIndex);
    }
    setTimeout(() => setIsBlowing(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] relative px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative w-full max-w-2xl"
      >
        <h3 className="text-lg md:text-2xl font-bold text-center mb-6 md:mb-8 text-pink-600">
          Make a wish and blow the candles! 🎂
        </h3>
        
        {/* Candles */}
        <div className={`flex gap-1 md:gap-2 mb-1 md:mb-2 justify-center flex-wrap max-w-full ${
          candles.length > 50 ? 'max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-100' : ''
        }`}>
          {candles.map((isLit, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleCandleClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Candle stick */}
              <div className={`${
                candles.length > 50 ? 'w-1.5 h-6' : 'w-2 h-8 md:w-3 md:h-12'
              } rounded-t-full ${isLit ? 'bg-gradient-to-b from-yellow-200 to-yellow-400' : 'bg-gray-400'} relative`}>
                {/* Flame */}
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [1, 0.8, 1],
                        scale: [1, 1.1, 1],
                        y: [0, -2, 0]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className={`absolute ${
                        candles.length > 50 ? '-top-2' : '-top-3 md:-top-5'
                      } left-1/2 transform -translate-x-1/2`}
                    >
                      <div className={`${
                        candles.length > 50 ? 'w-1.5 h-2.5' : 'w-2 h-3 md:w-3 md:h-5'
                      } bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]`} />
                      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${
                        candles.length > 50 ? 'w-1 h-1.5' : 'w-1 h-2 md:w-2 md:h-3'
                      } bg-gradient-to-t from-orange-400 to-yellow-100 rounded-full`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cake layers */}
        <div className="space-y-0.5 md:space-y-1">
          <motion.div 
            className="w-48 md:w-64 h-8 md:h-10 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-3 md:gap-4 items-center justify-center">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full" />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="w-56 md:w-80 h-10 md:h-12 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-4 md:gap-6 items-center justify-center">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 bg-yellow-400 rounded-full" />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="w-64 md:w-96 h-12 md:h-16 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-4 md:gap-8 items-center justify-center">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Blow button */}
        <motion.button
          onClick={handleBlow}
          className="mt-4 md:mt-6 px-3 md:px-6 py-1.5 md:py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-xs md:text-base shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isBlowing ? { scale: [1, 0.9, 1] } : {}}
        >
          💨 Blow Candles
        </motion.button>
        
        {/* Repeat hint for blow button */}
        {blowCount === 1 && candles.filter(c => c).length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs md:text-sm text-pink-600 dark:text-pink-400 text-center mt-2 font-semibold"
          >
            💡 Keep pressing the button to blow more candles!
          </motion.p>
        )}
        
        {/* Hint message */}
        <AnimatePresence>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center mt-2"
            >
              💡 Tip: Click candles individually or use the button above!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Success message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg"
          >
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-4xl lg:text-6xl font-bold text-white text-center px-4"
            >
              🎉 Your wish came true! 🎉
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualCake;
