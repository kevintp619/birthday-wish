import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Birthday Surprise - Create Magical Birthday Experiences',
  description: 'Create a personalized birthday surprise for your loved ones with custom cards, countdown timer, and fun celebrations. Share memorable moments with interactive games and heartfelt messages.',
  keywords: ['birthday surprise', 'birthday cards', 'birthday countdown', 'personalized birthday', 'birthday celebration', 'virtual birthday', 'birthday wishes'],
  openGraph: {
    title: 'Birthday Surprise - Create Magical Birthday Experiences',
    description: 'Create a personalized birthday surprise with custom cards, countdown timer, and celebrations',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Surprise - Create Magical Birthday Experiences',
    description: 'Create personalized birthday surprises with custom cards and countdown timers',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
