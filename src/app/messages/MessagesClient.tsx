"use client";
import { useRouter } from 'next/navigation';
import Message from './Message';
import { CardData } from '@/lib/cloudburstApi';

interface MessagesClientProps {
  personName: string;
  dateOfBirth: string;
  age: number;
  cards: CardData[];
}

export default function MessagesClient({ personName, dateOfBirth, age, cards }: MessagesClientProps) {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/goodbye');
  };

  return <Message age={age} cards={cards} setCurrentStep={handleNextStep} />;
}
