"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Timer from './Timer';
import { CardData } from '@/lib/cloudburstApi';

interface TimerClientProps {
  personName: string;
  dateOfBirth: string;
  cards: CardData[];
  isPreview: boolean;
}

export default function TimerClient({ personName, dateOfBirth, cards, isPreview }: TimerClientProps) {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleNextStep = () => {
    router.push('/celebrate');
  };

  return (
    <main className='overflow-hidden relative min-h-screen bg-black'>
      <button 
        onClick={() => setSoundEnabled(prev => !prev)} 
        className='absolute right-5 top-5 bg-pink-500 dark:bg-pink-700 hover:bg-pink-600 dark:hover:bg-pink-800 text-white p-3 rounded-full z-[99] transition-colors'
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
