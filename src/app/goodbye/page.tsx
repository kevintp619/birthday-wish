import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/getUserData';
import GoodBye from './GoodBye';

export const metadata: Metadata = {
  title: 'See You Again! | Thank You',
  description: 'Thank you for celebrating this special birthday with us. Your presence made it memorable. See you at the next celebration!',
  openGraph: {
    title: 'See You Again!',
    description: 'Thank you for celebrating with us!',
    type: 'website',
  },
};

export default async function GoodbyePage() {
  const userData = await getUserData();
  
  if (!userData) {
    redirect('/');
  }

  return (
    <GoodBye 
      personName={userData.personName}
    />
  );
}
