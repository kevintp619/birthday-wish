import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/getUserData';
import CelebrateClient from './CelebrateClient';

export const metadata: Metadata = {
  title: 'Happy Birthday! 🎉',
  description: 'It\'s time to celebrate! Enjoy special birthday animations, fireworks, and joyful moments on your special day.',
  openGraph: {
    title: 'Happy Birthday! 🎉',
    description: 'Celebrate your special day with fun and excitement!',
    type: 'website',
  },
};

export default async function CelebratePage() {
  const userData = await getUserData();
  
  if (!userData) {
    redirect('/');
  }

  return (
    <CelebrateClient 
      personName={userData.personName}
      dateOfBirth={userData.dateOfBirth}
      cards={userData.cards}
      isPreview={userData.isPreview || false}
    />
  );
}
