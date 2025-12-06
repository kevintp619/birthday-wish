import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/getUserData';
import wishMessages from '@/JsonData/WishMessages.json';
import { CardData } from '@/lib/cloudburstApi';
import MessagesClient from './MessagesClient';

export const metadata: Metadata = {
  title: 'Birthday Messages & Cards',
  description: 'Read heartfelt birthday messages and cards created just for you. Enjoy interactive games including balloon pop and virtual birthday cake!',
  openGraph: {
    title: 'Birthday Messages & Cards',
    description: 'Heartfelt birthday wishes and personalized cards await you',
    type: 'website',
  },
};

export default async function MessagesPage() {
  const userData = await getUserData();
  
  if (!userData) {
    redirect('/');
  }

  // Calculate age on server
  const dob = new Date(userData.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
    age--;
  }

  let displayCards: CardData[] = userData.cards;
  
  if (userData.isPreview) {
    displayCards = wishMessages.messages.map((msg, index) => ({
      id: `default-${index + 1}`,
      theme: ['gradient', 'sunset', 'ocean', 'forest', 'romantic', 'golden', 'gradient', 'sunset', 'ocean', 'forest'][index],
      font: ['font-sans', 'font-serif', 'font-sans', 'font-sans', 'font-serif', 'font-sans', 'font-serif', 'font-sans', 'font-mono', 'font-serif'][index],
      message: msg.message,
      imageUrl: msg.image,
      createdAt: new Date().toISOString()
    }));
  }

  return (
    <MessagesClient 
      personName={userData.personName}
      dateOfBirth={userData.dateOfBirth}
      age={age}
      cards={displayCards}
    />
  );
}
