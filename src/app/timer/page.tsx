import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/getUserData';
import TimerClient from './TimerClient';

export const metadata: Metadata = {
  title: 'Birthday Countdown Timer',
  description: 'Count down every second to your special birthday moment! Watch the excitement build as time ticks away to celebration.',
  openGraph: {
    title: 'Birthday Countdown Timer',
    description: 'The countdown to your special birthday surprise begins now!',
    type: 'website',
  },
};

export default async function TimerPage() {
  const userData = await getUserData();
  
  if (!userData) {
    redirect('/');
  }

  return (
    <TimerClient 
      personName={userData.personName}
      dateOfBirth={userData.dateOfBirth}
      cards={userData.cards}
      isPreview={userData.isPreview || false}
    />
  );
}
