import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { CardData } from '@/actions/cloudburstStorage';

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

const stockImages = [
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
];

export const defaultCards: CardData[] = [
  {
    id: 'default-1',
    font: 'font-sans',
    message: '🎉 Wishing you a day filled with love, laughter, and all the happiness in the world. Another year around the sun means more adventures to embark on and dreams to chase. May your special day be just the beginning of a year full of wonderful surprises and beautiful moments. 🎂🎈',
    imageUrl: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=2070&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-2',
    font: 'font-serif',
    message: '🌟 Happy birthday! May this year bring you endless joy, amazing surprises, and all the success you deserve. Take this day to celebrate the incredible person you are and all the accomplishments you\'ve achieved. Here\'s to creating new memories and making every moment count! 🎁🎉',
    imageUrl: 'https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?q=80&w=1887&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-3',
    font: 'font-sans',
    message: '🎂 Another year older, another reason to celebrate! As you blow out the candles, remember how far you\'ve come and the incredible journey that lies ahead. Your presence brightens every room, and on this special day, I hope you\'re surrounded by laughter, love, and the warmth of cherished friends and family. 🥳🎈',
    imageUrl: 'https://images.unsplash.com/photo-1578922794704-7bdd46f70ce0?q=80&w=1887&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-4',
    font: 'font-sans',
    message: '🎉 On your special day, I hope you\'re surrounded by people who make you feel cherished and loved. Birthdays are for reflecting on the beautiful moments of the past year and eagerly anticipating what the new one will bring. Here\'s to you, to your kindness, your strength, and the wonderful light you bring into the lives of those around you. Happy birthday! 🎂🎁',
    imageUrl: 'https://images.unsplash.com/photo-1562804698-732e972e46e4?q=80&w=1887&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-5',
    font: 'font-serif',
    message: '🎈 Sending you warm birthday wishes and a big hug on your special day. May it be as sweet as you are! Your heart is as beautiful as your smile, and today, I hope you take time to celebrate all the love and happiness you\'ve shared with others. Here\'s to more laughter, more joy, and more unforgettable moments ahead. 🎉🥳',
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1926&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-6',
    font: 'font-sans',
    message: '🌟 Happy birthday! May this year be the best one yet, filled with exciting adventures and wonderful moments. Today is all about celebrating you, your incredible spirit, and the bright future that awaits. Here\'s to making memories that last a lifetime and cherishing every single moment along the way. 🎂🎁',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1663837827359-ab1ade604318?q=80&w=2070&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-7',
    font: 'font-serif',
    message: '🥂 Cheers to you on your birthday! May your day be as bright and beautiful as you are. You deserve all the happiness in the world, and I hope today brings you just that. Here\'s to laughter that fills the air, to love that warms the heart, and to a year ahead that\'s even more amazing than the last. Happy birthday! 🎉🎈',
    imageUrl: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1928&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-8',
    font: 'font-sans',
    message: '🎉 Wishing you a day filled with laughter, love, and all the happiness your heart can hold. Birthdays are a time to celebrate life, and yours is a life worth celebrating in every way. May this year be filled with dreams fulfilled, goals achieved, and moments that take your breath away. Happy birthday! 🎂🎁',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675948934492-443d1076c984?q=80&w=1932&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-9',
    font: 'font-mono',
    message: '🌟 Here\'s to another year of amazing opportunities, beautiful moments, and cherished memories. Birthdays mark the passage of time, but they also remind us of the incredible experiences that shape our lives. Today, I celebrate you and all the joy you bring into the world. May your day be as special as you are. Happy birthday! 🥳🎈',
    imageUrl: 'https://images.unsplash.com/photo-1627247359162-4645d9f8543b?q=80&w=1887&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    id: 'default-10',
    font: 'font-serif',
    message: '🎂 Happy birthday! May this day bring you everything you\'ve been wishing for and more. You deserve the world! As you blow out the candles, know that you are surrounded by love and well wishes from all who cherish you. Here\'s to a year ahead filled with love, laughter, and all the blessings your heart can hold. 🎉🎁',
    imageUrl: 'https://images.unsplash.com/photo-1517273666229-35e76c06b18d?q=80&w=1887&auto=format&fit=crop',
    createdAt: new Date()
  }
];

export default function HomePage() {
  return <HomeClient defaultCards={defaultCards} stockImages={stockImages} />;
}
