import React, { useState, useEffect, useRef } from 'react';
import DigitalDigit from 'digital-digit';

interface TimerProps {
  soundEnabled: boolean;
  setCurrentStep: () => void;
  dateOfBirth: string;
  isPreview: boolean;
}

const Timer: React.FC<TimerProps> = ({ soundEnabled, setCurrentStep, dateOfBirth, isPreview }) => {

  const [time, setTime] = useState(0);

  // Check if birthday was within the last month
  const isBirthdayRecentlyPassed = () => {
    const now = new Date();
    const dob = new Date(dateOfBirth);
    const currentYear = now.getFullYear();
    const birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate(), 0, 0, 0, 0);
    
    if (now < birthdayThisYear) return false;
    
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    
    return birthdayThisYear >= oneMonthAgo && birthdayThisYear <= now;
  };

  const showSkipButton = isPreview || isBirthdayRecentlyPassed();

  useEffect(() => {
    const calculateTimeUntilBirthday = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const dob = new Date(dateOfBirth);
      
      // Create birthday date for this year
      const birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate(), 0, 0, 0, 0);
      
      // Check if birthday is today
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      if (birthdayThisYear.getTime() === today.getTime()) {
        setTime(0);
        setTimeout(() => {
          setCurrentStep();
        }, 2000);
        return;
      }

      // If birthday has passed this year, calculate for next year
      let targetBirthday = birthdayThisYear;
      if (now > birthdayThisYear) {
        targetBirthday = new Date(currentYear + 1, dob.getMonth(), dob.getDate(), 0, 0, 0, 0);
      }
      
      const timeDifference = targetBirthday.getTime() - now.getTime();
      setTime(Math.max(0, timeDifference));
    };

    const timer = setInterval(calculateTimeUntilBirthday, 1000);
    calculateTimeUntilBirthday(); // Initial calculation

    return () => clearInterval(timer);
  }, [setCurrentStep, dateOfBirth]);

  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);
  const tickingAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio files on component mount
  useEffect(() => {
    // Create and preload alarm audio
    alarmAudioRef.current = new Audio('/Alarm-Fast-High-Pitch-A1-www.fesliyanstudios.com.mp3');
    alarmAudioRef.current.loop = true;
    alarmAudioRef.current.preload = 'auto';
    alarmAudioRef.current.load();

    // Create and preload ticking audio
    tickingAudioRef.current = new Audio('/Clock-Ticking-C-www.fesliyanstudios.com.mp3');
    tickingAudioRef.current.loop = true;
    tickingAudioRef.current.preload = 'auto';
    tickingAudioRef.current.load();

    // Cleanup on unmount
    return () => {
      if (alarmAudioRef.current) {
        alarmAudioRef.current.pause();
        alarmAudioRef.current.src = '';
      }
      if (tickingAudioRef.current) {
        tickingAudioRef.current.pause();
        tickingAudioRef.current.src = '';
      }
    };
  }, []);

  // Handle audio playback based on sound state
  useEffect(() => {
    const stopAudio = (audioRef: React.RefObject<HTMLAudioElement | null>) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    if (!soundEnabled) {
      stopAudio(alarmAudioRef);
      stopAudio(tickingAudioRef);
      return;
    }

    if (time === 0) {
      stopAudio(tickingAudioRef);
      if (alarmAudioRef.current) {
        alarmAudioRef.current.play().catch(error => {
          console.error('Alarm audio play error:', error);
        });
      }
    } else {
      stopAudio(alarmAudioRef);
      if (tickingAudioRef.current) {
        tickingAudioRef.current.play().catch(error => {
          console.error('Ticking audio play error:', error);
        });
      }
    }

    return () => {
      stopAudio(alarmAudioRef);
      stopAudio(tickingAudioRef);
    };
  }, [soundEnabled, time]);


  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  // Function to ensure digit value is between 0 and 9
  const checkNum = (num: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 => {
    return Math.max(0, Math.min(9, num)) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  };


  return (
    <section className='bg-black text-white container mx-auto flex h-full items-center justify-center relative min-h-screen'>
      <div className='md:flex space-y-5 md:space-y-0 md:space-x-3'>
        <div>
          <div className='h-8 md:h-10 lg:h-32 flex items-center space-x-2 justify-center'>
            <DigitalDigit digit={checkNum(Math.floor(days / 10))} color="white" opacitySegment={0} />
            <DigitalDigit digit={checkNum(days % 10)} color="white" opacitySegment={0} />
          </div>
          <p className='mt-5 text-center font-bold lg:text-xl uppercase'>Days</p>
        </div>

        <div>
          <span className='hidden md:block text-[40pt] lg:text-[90pt] font-extrabold -mt-5'>:</span>
        </div>

        <div>
          <div className='h-8 md:h-10 lg:h-32 flex items-center space-x-2 justify-center'>
            <DigitalDigit digit={checkNum(Math.floor(hours / 10))} color="white" opacitySegment={0} />
            <DigitalDigit digit={checkNum(hours % 10)} color="white" opacitySegment={0} />
          </div>
          <p className='mt-5 text-center font-bold lg:text-xl uppercase'>Hours</p>
        </div>

        <div>
          <span className='hidden md:block text-[40pt] lg:text-[90pt] font-extrabold -mt-5'>:</span>
        </div>

        <div>
          <div className='h-8 md:h-10 lg:h-32 flex items-center space-x-2 justify-center'>
            <DigitalDigit digit={checkNum(Math.floor(minutes / 10))} color="white" opacitySegment={0} />
            <DigitalDigit digit={checkNum(minutes % 10)} color="white" opacitySegment={0} />
          </div>
          <p className='mt-5 text-center font-bold lg:text-xl uppercase'>Minutes</p>
        </div>

        <div>
          <span className='hidden md:block text-[40pt] lg:text-[90pt] font-extrabold -mt-5'>:</span>
        </div>

        <div>
          <div className='h-8 md:h-10 lg:h-32 flex items-center space-x-2 justify-center'>
            <DigitalDigit digit={checkNum(Math.floor(seconds / 10))} color="white" opacitySegment={0} />
            <DigitalDigit digit={checkNum(seconds % 10)} color="white" opacitySegment={0} />
          </div>
          <p className='mt-5 text-center font-bold lg:text-xl uppercase'>Seconds</p>
        </div>
      </div>

      {showSkipButton && (
        <div className='fixed bottom-5 md:absolute md:bottom-10 left-0 right-0 px-4'>
          <button type='button' onClick={setCurrentStep} className='block w-full max-w-[200px] mx-auto py-2 px-4 bg-pink-600 dark:bg-pink-700 rounded-lg outline-none hover:bg-pink-700 dark:hover:bg-pink-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-all text-white font-semibold shadow-lg'>
            {isPreview ? 'Skip Timer (Preview)' : 'Skip Timer'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Timer;

