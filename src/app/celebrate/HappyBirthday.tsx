"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti'
import useWindowSize from '@/utils/useWindowSize';

const EMOJIS = ['🎉', '🎊', '🎈', '🎁', '🎂', '✨', '🌟', '💖', '🥳', '🎆'];

interface HappyBirthdayProps {
  personName: string;
}

const HappyBirthday: React.FC<HappyBirthdayProps> = ({ personName }) => {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Prefetch next page for smooth transition
  useEffect(() => {
    router.prefetch('/messages');
  }, [router]);

  const handleNextStep = () => {
    router.push('/messages');
  };

  // Memoize content generation to prevent recreation on every render
  const content1 = useMemo(() => Array.from({ length: 80 }, () => '• HAPPY BIRTHDAY'), []);
  const content2 = useMemo(() => Array.from({ length: 80 }, () => `• ${personName.toLocaleUpperCase()}`), [personName]);
  const content3 = useMemo(() => Array.from({ length: 80 }, () => '• MANY MANY RETURNS OF THE DAY'), []);

  const [indexes, setIndexes] = useState<number[]>([0, 0, 0]);
  const [showCenterMessage, setShowCenterMessage] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  const { height, width } = useWindowSize();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio file on component mount
  useEffect(() => {
    const audio = new Audio('/y2mate.is - HAPPY BIRTHDAY INSTRUMENTAL-57jZJ2QpKRg-192k-1703434765.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.load();
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

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
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      };
      setParticles(prev => [...prev.slice(-15), newParticle]); // Keep last 15 particles
    }, 800);

    return () => clearInterval(particleInterval);
  }, []);

  // Handle audio playback based on sound state
  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 10;
      audioRef.current.play().catch(error => {
        console.error('Audio play error:', error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [soundEnabled]);



  return (
    <main className='bg-black w-full flex justify-center min-h-screen h-screen relative overflow-hidden'>
      <button 
        onClick={() => setSoundEnabled(prev => !prev)} 
        className='absolute right-5 top-5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full z-99 transition-colors'
        aria-label={soundEnabled ? "Mute celebration sound" : "Unmute celebration sound"}
        aria-pressed={soundEnabled}
      >
        {soundEnabled ? "Mute" : "Unmute"}
      </button>
      
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
            <div className='flex flex-col items-center'>
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
                  <span className='bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-2xl'>
                    🎉 HAPPY BIRTHDAY 🎉
                  </span>
                </h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='text-2xl md:text-4xl lg:text-5xl font-bold'
                >
                  <span className='bg-linear-to-r from-yellow-400 via-pink-400 to-red-400 text-transparent bg-clip-text drop-shadow-2xl'>
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

              {/* Next Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5, type: 'spring', bounce: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type='button'
                onClick={handleNextStep}
                className='mt-24 md:mt-20 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white text-sm transition-all pointer-events-auto shadow-lg'
                aria-label='Next step'
              >
                Next 🎁
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Text Columns */}
      <div className='flex overflow-hidden opacity-40 w-full justify-evenly'>
        <div>
          {content1.map((text, index) => (
            <p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[0] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div>
          {content2.map((text, index) => (
            <p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[1] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div>
          {content3.map((text, index) => (
            <p
              key={index}
              className='text-[11px] lg:text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[2] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        {/* Duplicate columns for larger screens */}
        <div className='hidden xl:block'>
          {content1.map((text, index) => (
            <p
              key={`d1-${index}`}
              className='text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[0] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div className='hidden xl:block'>
          {content2.map((text, index) => (
            <p
              key={`d2-${index}`}
              className='text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[1] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div className='hidden xl:block'>
          {content3.map((text, index) => (
            <p
              key={`d3-${index}`}
              className='text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[2] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div className='hidden 2xl:block'>
          {content1.map((text, index) => (
            <p
              key={`d4-${index}`}
              className='text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[0] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
        <div className='hidden 2xl:block'>
          {content2.map((text, index) => (
            <p
              key={`d5-${index}`}
              className='text-base whitespace-no-wrap text-gray-300 transition-opacity duration-300'
              style={{
                opacity: indexes[1] === index ? 1 : 0.18,
                willChange: 'opacity'
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
      
      <Confetti 
        height={height} 
        width={width}
        recycle={true}
        numberOfPieces={300}
        gravity={0.12}
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
    </main>
  );
};

export default HappyBirthday;
