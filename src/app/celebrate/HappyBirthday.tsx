import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti'
import useWindowSize from '@/utils/useWindowSize';

interface HappyBirthdayProps {
  soundEnabled: boolean;
  setCurrentStep: () => void;
  personName: string;
}

const HappyBirthday: React.FC<HappyBirthdayProps> = ({ soundEnabled, setCurrentStep, personName }) => {

  const generateContent = (count: number, text: string): string[] => {
    return Array.from({ length: count }, () => `• ${text}`);
  };

  const content1 = generateContent(60, 'HAPPY BIRTHDAY');
  const content2 = generateContent(60, personName.toLocaleUpperCase());
  const content3 = generateContent(60, 'MANY MANY RETURNS OF THE DAY');

  const [indexes, setIndexes] = useState<number[]>([0, 0, 0]);
  const [showCenterMessage, setShowCenterMessage] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  const { height, width } = useWindowSize();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const emojis = ['🎉', '🎊', '🎈', '🎁', '🎂', '✨', '🌟', '💖', '🥳', '🎆'];

  useEffect(() => {
    const interval = setInterval(() => {
      const index1 = Math.floor(Math.random() * (content1.length - 20)) + 10;
      const index2 = Math.floor(Math.random() * (content2.length - 20)) + 10;
      const index3 = Math.floor(Math.random() * (content3.length - 20)) + 10;

      setIndexes([index1, index2, index3]);
    }, 1000);

    return () => clearInterval(interval);
  }, [content1.length, content2.length, content3.length]);

  useEffect(() => {
    // Show center message after 2 seconds
    const timer = setTimeout(() => setShowCenterMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const particleInterval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };
      setParticles(prev => [...prev.slice(-15), newParticle]); // Keep last 15 particles
    }, 800);

    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    if (soundEnabled) {
      const audio = new Audio('/y2mate.is - HAPPY BIRTHDAY INSTRUMENTAL-57jZJ2QpKRg-192k-1703434765.mp3');
      audio.loop = true;
      audio.currentTime = 10;

      audioRef.current = audio;
      audio.play().catch(error => {
        console.error('Audio play error:', error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [soundEnabled]);



  return (
    <section className='bg-black w-full flex justify-center min-h-screen h-screen relative overflow-hidden'>
      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0, x: `${particle.x}vw`, y: '100vh' }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1.5, 0],
              y: '-20vh',
              rotate: 360
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className='absolute text-4xl pointer-events-none z-10'
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Center Birthday Message */}
      <AnimatePresence>
        {showCenterMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
            className='absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none'
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className='text-center'
            >
              <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-3'>
                <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-2xl'>
                  🎉 HAPPY BIRTHDAY 🎉
                </span>
              </h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='text-2xl md:text-4xl lg:text-5xl font-bold'
              >
                <span className='bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 text-transparent bg-clip-text drop-shadow-2xl'>
                  {personName}!
                </span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className='mt-4 text-xl md:text-2xl'
              >
                <span className='inline-block animate-bounce'>🎂</span>
                <span className='inline-block animate-bounce delay-100'>🎈</span>
                <span className='inline-block animate-bounce delay-200'>🎁</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Text Columns */}
      <div className='flex overflow-hidden opacity-20'>
        <div>
          {content1.map((text, index) => (
            <motion.p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap'
              style={{
                transition: 'color 0.3s ease',
                color: indexes[0] === index ? 'lightpink' : '#374151',
              }}
              whileHover={{ scale: 1.2, color: '#FF69B4' }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        <div>
          {content2.map((text, index) => (
            <motion.p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap'
              style={{
                transition: 'color 0.3s ease',
                color: indexes[1] === index ? 'lightyellow' : '#374151',
              }}
              whileHover={{ scale: 1.2, color: '#FFD700' }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        <div>
          {content3.map((text, index) => (
            <motion.p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap'
              style={{
                transition: 'color 0.3s ease',
                color: indexes[2] === index ? 'lightblue' : '#374151',
              }}
              whileHover={{ scale: 1.2, color: '#87CEEB' }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5, type: 'spring', bounce: 0.6 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        type='button'
        onClick={() => setCurrentStep()}
        className='p-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full fixed right-5 bottom-16 text-white font-bold shadow-2xl z-30 hover:shadow-pink-500/50 transition-shadow'
      >
        Next 🎁
      </motion.button>
      
      <Confetti 
        height={height} 
        width={width}
        recycle={true}
        numberOfPieces={300}
        gravity={0.15}
      />
      
      <style jsx>
        {`
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </section>
  );
};

export default HappyBirthday;
