"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balloon {
  id: number;
  color: string;
  x: number;
  message?: string;
}

const BalloonGame = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [poppedMessage, setPoppedMessage] = useState<string | null>(null);

  const colors = ['#FF69B4', '#87CEEB', '#FFD700', '#98FB98', '#DDA0DD', '#FF6B6B'];
  const messages = [
    '🎉 Amazing!',
    '🌟 Wonderful!',
    '💖 You\'re special!',
    '🎊 Keep going!',
    '✨ Fantastic!',
    '🎈 Brilliant!',
    '🎁 You rock!',
    '🌈 Awesome!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newBalloon: Balloon = {
        id: Date.now() + Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 90 + 5,
        message: messages[Math.floor(Math.random() * messages.length)]
      };
      setBalloons(prev => [...prev, newBalloon]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setBalloons(prev => prev.filter(b => Date.now() - b.id < 10000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  const popBalloon = (id: number, message?: string) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 1);
    if (message) {
      setPoppedMessage(message);
      setTimeout(() => setPoppedMessage(null), 1500);
    }
  };

  return (
    <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800 rounded-xl overflow-hidden transition-colors">
      <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
        <p className="text-sm md:text-lg font-bold text-purple-600 dark:text-purple-400">Popped: {score} 🎈</p>
      </div>

      <AnimatePresence>
        {poppedMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl font-bold text-white z-50 drop-shadow-lg"
          >
            {poppedMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          {balloons.map(balloon => (
            <motion.div
              key={balloon.id}
              initial={{ bottom: '-10%', scale: 1 }}
              animate={{ bottom: '110%', scale: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 8, ease: 'linear' }}
              style={{ left: `${balloon.x}%` }}
              className="absolute cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                popBalloon(balloon.id, balloon.message);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.5 }}
            >
              <svg width="40" height="55" viewBox="0 0 60 80" className="md:w-[50px] md:h-[65px] lg:w-[60px] lg:h-[80px]">
                <ellipse cx="30" cy="35" rx="25" ry="32" fill={balloon.color} opacity="0.9" />
                <ellipse cx="20" cy="25" rx="8" ry="12" fill="white" opacity="0.4" />
                <line x1="30" y1="67" x2="30" y2="75" stroke={balloon.color} strokeWidth="2" />
                <path d="M 30 75 Q 25 78, 20 80" stroke={balloon.color} strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs md:text-sm text-gray-600 bg-white/80 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
          🎯 Click the balloons to pop them!
        </p>
      </div>
    </div>
  );
};

export default BalloonGame;
