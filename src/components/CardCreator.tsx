"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CardCreatorProps {
  personName: string;
  age: number;
}

const CardCreator: React.FC<CardCreatorProps> = ({ personName, age }) => {
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('gradient');
  const [selectedFont, setSelectedFont] = useState('font-sans');
  const [showPreview, setShowPreview] = useState(false);

  const themes = {
    gradient: 'bg-linear-to-br from-pink-400 via-purple-400 to-indigo-500',
    sunset: 'bg-linear-to-br from-orange-400 via-pink-500 to-purple-600',
    ocean: 'bg-linear-to-br from-blue-400 via-cyan-400 to-teal-500',
    forest: 'bg-linear-to-br from-green-400 via-emerald-500 to-teal-600',
    romantic: 'bg-linear-to-br from-rose-400 via-pink-500 to-red-500',
    golden: 'bg-linear-to-br from-yellow-400 via-orange-400 to-amber-500'
  };

  const fonts = {
    'font-sans': 'Sans Serif',
    'font-serif': 'Serif',
    'font-mono': 'Monospace'
  };

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${personName}!`,
          text: customMessage || `Wishing ${personName} a wonderful ${age}th birthday! 🎉`,
          url: window.location.href
        });
      } catch (err) {
        // Share was cancelled or failed
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
          🎨 Create Your Custom Birthday Card
        </h3>

        {/* Theme selector */}
        <div className="mb-3 md:mb-4">
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
            Choose Theme:
          </label>
          <div className="grid grid-cols-3 gap-1.5 md:gap-2">
            {Object.entries(themes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key)}
                className={`h-8 md:h-12 rounded-lg ${value} ${
                  selectedTheme === key ? 'ring-4 ring-blue-500' : ''
                } transition-all`}
              />
            ))}
          </div>
        </div>

        {/* Font selector */}
        <div className="mb-3 md:mb-4">
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
            Choose Font:
          </label>
          <div className="flex gap-1.5 md:gap-2">
            {Object.entries(fonts).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedFont(key)}
                className={`px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-lg ${key} ${
                  selectedFont === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } transition-all`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Custom message */}
        <div className="mb-3 md:mb-4">
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
            Your Message: <span className="text-gray-500">({customMessage.length}/500)</span>
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setCustomMessage(e.target.value);
              }
            }}
            placeholder="Write your heartfelt birthday message..."
            className="w-full h-20 md:h-24 p-2 md:p-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            maxLength={500}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={shareCard}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg transition-colors"
          >
            📤 Share
          </button>
        </div>
      </div>

      {/* Card Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${themes[selectedTheme as keyof typeof themes]} rounded-xl shadow-2xl p-6 md:p-12 text-white relative overflow-hidden`}
        >
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 text-3xl md:text-6xl opacity-20">🎉</div>
          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-3xl md:text-6xl opacity-20">🎂</div>
          
          <div className={`${selectedFont} space-y-3 md:space-y-6 relative z-10`}>
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-2 md:mb-4"
            >
              Happy Birthday!
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold"
            >
              {personName}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-base md:text-xl mb-2 md:mb-4">🎈 Celebrating {age} wonderful years! 🎈</p>
              
              {customMessage && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-6 mt-3 md:mt-6">
                  <p className="text-sm md:text-lg leading-relaxed">{customMessage}</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-2 md:gap-4 text-2xl md:text-4xl mt-4 md:mt-8"
            >
              <span>🎊</span>
              <span>🎁</span>
              <span>🎈</span>
              <span>🎉</span>
              <span>🎂</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CardCreator;
