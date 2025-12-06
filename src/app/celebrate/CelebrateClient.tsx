"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HappyBirthday from './HappyBirthday';
import { CardData } from '@/lib/cloudburstApi';

interface CelebrateClientProps {
  personName: string;
  dateOfBirth: string;
  cards: CardData[];
  isPreview: boolean;
}

export default function CelebrateClient({ personName }: CelebrateClientProps) {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleNextStep = () => {
    router.push('/messages');
  };

  return (
    <main className='overflow-hidden relative min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500'>
      <button 
        onClick={() => setSoundEnabled(prev => !prev)} 
        className='absolute right-5 top-5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full z-[99] transition-colors'
        aria-label={soundEnabled ? "Mute celebration sound" : "Unmute celebration sound"}
        aria-pressed={soundEnabled}
      >
        {soundEnabled ? "Mute" : "Unmute"}
      </button>
      <HappyBirthday 
        soundEnabled={soundEnabled} 
        setCurrentStep={handleNextStep}
        personName={personName}
      />
    </main>
  );
}
