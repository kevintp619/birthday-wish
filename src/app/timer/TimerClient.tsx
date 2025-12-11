"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Timer from './Timer';
interface TimerClientProps {
  dateOfBirth: string;
  isPreview: boolean;
}

export default function TimerClient({ dateOfBirth, isPreview }: TimerClientProps) {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Prefetch next page for smooth transition
  useEffect(() => {
    router.prefetch('/celebrate');
  }, [router]);

  const handleNextStep = () => {
    router.push('/celebrate');
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);

  return (
    <main className='overflow-hidden relative min-h-screen bg-black'>
      <button 
        onClick={toggleSound} 
        className='absolute right-5 top-5 bg-pink-500 dark:bg-pink-700 hover:bg-pink-600 dark:hover:bg-pink-800 text-white p-3 rounded-full z-99 transition-colors'
        aria-label={soundEnabled ? "Mute countdown sound" : "Unmute countdown sound"}
        aria-pressed={soundEnabled}
      >
        {soundEnabled ? "Mute" : "Unmute"}
      </button>
      <Timer 
        soundEnabled={soundEnabled} 
        setCurrentStep={handleNextStep}
        dateOfBirth={dateOfBirth}
        isPreview={isPreview}
      />
    </main>
  );
}
