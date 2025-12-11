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
    <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative py-6 md:py-8">
      {/* Moon */}
      <div className="absolute top-4 md:top-8 right-8 md:right-16 z-0">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Moon glow */}
          <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-linear-radial from-blue-100 via-blue-200 to-transparent rounded-full blur-xl opacity-40" />
          {/* Moon body */}
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-linear-radial from-gray-100 via-gray-200 to-gray-300 rounded-full overflow-hidden">
            {/* Moon craters */}
            <div className="absolute top-2 left-3 w-2 h-2 md:w-3 md:h-3 bg-gray-300 rounded-full opacity-60" />
            <div className="absolute top-6 right-4 w-3 h-3 md:w-4 md:h-4 bg-gray-300 rounded-full opacity-50" />
            <div className="absolute bottom-3 left-5 w-2 h-2 md:w-3 md:h-3 bg-gray-300 rounded-full opacity-40" />
          </div>
        </motion.div>
      </div>

      {/* Evening Sky Stars */}
      <div className="absolute inset-0 z-0">
        {Array(20).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mountains at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0 -mb-px">
        <svg className="w-full h-24 md:h-32 block" viewBox="0 0 1000 150" preserveAspectRatio="none">
          <polygon points="0,150 0,80 150,100 300,50 450,90 600,40 750,70 900,50 1000,80 1000,150" fill="#1e3a5f" opacity="0.7" />
          <polygon points="0,150 100,90 250,60 400,100 550,50 700,80 850,60 1000,90 1000,150" fill="#152843" opacity="0.8" />
          <polygon points="0,150 80,110 220,80 380,120 540,70 680,100 820,75 950,100 1000,150" fill="#0d1829" opacity="0.9" />
        </svg>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative w-full max-w-2xl z-10"
      >
        <h3 className="text-lg md:text-2xl font-bold text-center mb-6 md:mb-8 text-white drop-shadow-lg">
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
              } rounded-t-full ${isLit ? 'bg-linear-to-b from-yellow-200 to-yellow-400' : 'bg-gray-400'} relative`}>
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
                      } bg-linear-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]`} />
                      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${
                        candles.length > 50 ? 'w-1 h-1.5' : 'w-1 h-2 md:w-2 md:h-3'
                      } bg-linear-to-t from-orange-400 to-yellow-100 rounded-full`} />
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
            className="w-48 md:w-64 h-8 md:h-10 bg-linear-to-r from-pink-300 via-pink-400 to-pink-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-3 md:gap-4 items-center justify-center">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full" />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="w-56 md:w-80 h-10 md:h-12 bg-linear-to-r from-purple-300 via-purple-400 to-purple-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-4 md:gap-6 items-center justify-center">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 bg-yellow-400 rounded-full" />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="w-64 md:w-96 h-12 md:h-16 bg-linear-to-r from-blue-300 via-blue-400 to-blue-300 rounded-lg relative overflow-hidden mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 flex gap-4 md:gap-8 items-center justify-center">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Blow button - centered */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleBlow}
            className="mt-8 md:mt-10 px-3 md:px-6 py-1.5 md:py-2 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-xs md:text-base shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isBlowing ? { scale: [1, 0.9, 1] } : {}}
          >
            💨 Blow Candles
          </motion.button>
        </div>
        
        {/* Hint messages - fixed height container to prevent layout shift */}
        <div className="min-h-8 md:min-h-10 mt-2 flex items-start justify-center">
          <AnimatePresence mode="wait">
            {blowCount === 1 && candles.filter(c => c).length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs md:text-sm text-white drop-shadow-lg text-center font-semibold"
              >
                💡 Keep pressing the button to blow more candles!
              </motion.p>
            )}
            {showHint && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs md:text-sm text-white/90 text-center drop-shadow-md"
              >
                💡 Tip: Click candles individually or use the button above!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-50"
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
