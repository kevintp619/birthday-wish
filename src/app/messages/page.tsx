import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/getUserData';
import { CardData } from '@/lib/cloudburstApi';
import Message from './Message';
import { defaultCards } from '@/app/page';
import { getApplicationDataById } from '@/actions/cloudburstStorage';

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

  const dob = new Date(userData.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
    age--;
  }

  let displayCards: CardData[] = defaultCards;

  if (userData.dbId !== "preview") {
    const fetchedCard = await getApplicationDataById<CardData[]>(userData.dbId, "cards");
    
    if (fetchedCard.success && fetchedCard.data && Array.isArray(fetchedCard.data)) {
      displayCards = fetchedCard.data;
    }
  }

  return (
    <Message
      age={age}
      cards={displayCards}
    />
  );
}