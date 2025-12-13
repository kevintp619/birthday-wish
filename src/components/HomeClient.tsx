"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { saveBirthdayData, CardData } from '@/lib/cloudburstApi';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeClient(props: { defaultCards: CardData[], stockImages: string[] }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      return date.toISOString().split('T')[0];
    })(),
    senderName: ''
  });
  const [cards, setCards] = useState<CardData[]>(props.defaultCards);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);

  const [cardFont, setCardFont] = useState('font-sans');
  const [cardMessage, setCardMessage] = useState('');
  const [imageType, setImageType] = useState<'stock' | 'url'>('stock');
  const [stockImage, setStockImage] = useState(props.stockImages[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const fonts = {
    'font-sans': 'Sans Serif',
    'font-serif': 'Serif',
    'font-mono': 'Monospace'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.name && formData.dob && formData.senderName) {
      const birthdayData = {
        personName: formData.name,
        dateOfBirth: formData.dob,
        senderName: formData.senderName,
        collection: [
          {
            name: "cards",
            data: cards
          }
        ]
      };

      const result = await saveBirthdayData(birthdayData);
      if (result.success && result.databaseId) {
        const link = `${window.location.origin}/r?t=${result.databaseId}`;
        setShareLink(link);
      } else {
        setError(result.error || 'Failed to save data');
      }
    } else {
      setError('Please fill in all required fields.');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const MAX_CARDS = 20;

  const addCard = (e: React.FormEvent) => {
    e.preventDefault();

    if (cards.length >= MAX_CARDS) {
      alert(`Maximum card limit reached! You can add up to ${MAX_CARDS} cards.`);
      return;
    }

    if (cardMessage.trim()) {
      let imageUrl: string | undefined;

      if (imageType === 'stock') {
        imageUrl = stockImage;
      } else if (imageType === 'url' && customImageUrl) {
        imageUrl = customImageUrl;
      }

      if (!imageUrl) {
        alert('Please select or provide a card image.');
        return;
      }

      const newCard: CardData = {
        id: `card-${Date.now()}`,
        font: cardFont,
        message: cardMessage,
        imageUrl,
        createdAt: new Date()
      };

      setCards([...cards, newCard]);
      setCardMessage('');
      setCardFont('font-sans');
      setImageType('stock');
      setStockImage(props.stockImages[0]);
      setCustomImageUrl('');
      setShowCardForm(false);
    }
  };

  const removeCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const copyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert('Link copied to clipboard! 🎉');
    }
  };

  if (shareLink) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-500 via-purple-500 to-indigo-600 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Birthday Celebration Created!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Share this link with {formData.name}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Share Link:</p>
            <p className="text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 break-all">
              {shareLink}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyLink}
              className="flex-1 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all"
            >
              📋 Copy Link
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              ✨ Create Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-pink-500 via-purple-500 to-indigo-600 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="text-4xl md:text-5xl mb-3" role="img" aria-label="Birthday cake">🎂</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Birthday Surprise
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Create a magical birthday experience for your loved ones
            </p>
          </motion.div>

          {/* Workflow Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl mb-2">✍️</div>
              <h3 className="font-bold text-base mb-1">Step 1</h3>
              <p className="text-xs text-white/80">Write their name & date of birth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-bold text-base mb-1">Step 2</h3>
              <p className="text-xs text-white/80">Share the link with them</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="font-bold text-base mb-1">Step 3</h3>
              <p className="text-xs text-white/80">Watch them get surprised!</p>
            </div>
          </motion.div>

          {/* Preview Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <motion.button
              type="button"
              onClick={() => {
                const previewName = "Your Friend";
                const today = new Date();
                const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
                const previewDob = tenYearsAgo.toISOString().split('T')[0];

                localStorage.setItem('NEXT_PUBLIC_PERSON_NAME', previewName);
                localStorage.setItem('NEXT_PUBLIC_DATE_OF_BIRTH', previewDob);
                localStorage.setItem('BIRTHDAY_CARDS', JSON.stringify([]));
                localStorage.setItem('IS_PREVIEW', 'true');

                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 1);
                document.cookie = `is_preview=true; expires=${expiryDate.toUTCString()}; path=/`;
                document.cookie = `preview_name=${previewName}; expires=${expiryDate.toUTCString()}; path=/`;
                document.cookie = `preview_dob=${previewDob}; expires=${expiryDate.toUTCString()}; path=/`;

                window.location.href = '/timer';
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-full shadow-xl text-base transition-all"
            >
              Preview Demo
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-xs"
          >
            <div className="animate-bounce">↓</div>
            <p>Get Started Below</p>
          </motion.div>
        </div>
      </header>

      {/* Form Section */}
      <section className="bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-0 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-none md:rounded-2xl shadow-2xl p-6 md:p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Create Your Celebration
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fill in the details to get started
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="senderName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    placeholder="Enter your name..."
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Birthday Person's Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name..."
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    min={(() => {
                      const date = new Date();
                      date.setFullYear(date.getFullYear() - 120);
                      return date.toISOString().split('T')[0];
                    })()}
                    max={(() => {
                      const date = new Date();
                      date.setFullYear(date.getFullYear() - 8);
                      return date.toISOString().split('T')[0];
                    })()}
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                    style={{ colorScheme: 'light dark' }}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Age must be between 8 and 120 years</p>
                </motion.div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 max-w-2xl mx-auto">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                  <span className="text-sm">ℹ️</span>
                  <span>This celebration data will automatically delete after 60 days to save storage.</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-xs bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold py-3 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 mx-auto"
                  style={{ display: 'block' }}
                >
                  {isLoading ? 'Creating...' : '🎉 Create Celebration'}
                </motion.button>
              </div>
            </form>

            {/* Card Management Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Birthday Cards ({cards.length}/{MAX_CARDS})
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCardForm(!showCardForm)}
                  className="text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cards.length >= MAX_CARDS && !showCardForm}
                >
                  {showCardForm ? '− Close' : '+ Add Card'}
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {cards.length >= MAX_CARDS
                  ? `Maximum limit reached. You have ${cards.length} cards.`
                  : `10 default cards included. You can add up to ${MAX_CARDS - cards.length} more cards.`
                }
              </p>

              {/* Card Creation Form */}
              {showCardForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4"
                >
                  <form onSubmit={addCard} className="space-y-4">
                    {/* Font Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Choose Font:
                      </label>
                      <div className="flex gap-2">
                        {Object.entries(fonts).map(([key, value]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setCardFont(key)}
                            className={`px-4 py-2 rounded-lg ${key} ${cardFont === key
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              } transition-all hover:scale-105`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Options */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Card Image: *
                      </label>
                      <div className="flex gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setImageType('stock')}
                          className={`px-4 py-2 rounded-lg text-sm ${imageType === 'stock'
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                          Stock Images
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageType('url')}
                          className={`px-4 py-2 rounded-lg text-sm ${imageType === 'url'
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                          Custom URL
                        </button>
                      </div>

                      {imageType === 'stock' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {props.stockImages.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setStockImage(img)}
                              className={`aspect-4/3 rounded-lg overflow-hidden ${stockImage === img ? 'ring-4 ring-purple-500' : ''
                                }`}
                            >
                              <img src={img} alt={`Stock ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          placeholder="Enter image URL..."
                          className="w-full px-4 py-2 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                        />
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Message: *
                      </label>
                      <textarea
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        placeholder="Write your heartfelt birthday message..."
                        required
                        className="w-full h-24 p-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none resize-none text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      ✨ Add Card
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="relative group rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg transition-colors"
                  >
                    {card.imageUrl ? (
                      <div className="flex flex-col">
                        <div className="shrink-0">
                          <div className="h-32 w-full relative">
                            <img
                              src={card.imageUrl}
                              alt="Card image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="p-4 pb-10 flex items-center justify-center min-h-[120px]">
                          <p className={`${card.font} text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-4`}>
                            {card.message}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 pb-10 min-h-40 flex items-center justify-center">
                        <p className={`${card.font} text-xs text-center text-gray-700 dark:text-gray-300 line-clamp-5`}>
                          {card.message}
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeCard(card.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs z-10"
                      title={card.id.startsWith('default-') ? 'Remove default card' : 'Remove custom card'}
                    >
                      ×
                    </button>
                    {card.id.startsWith('default-') && (
                      <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full">
                        Default
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="text-sm">
            This app is developed by{' '}
            <Link
              href="https://shawkath646.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Shawkat Hossain Maruf
            </Link>
            {' '}on behalf of{' '}
            <Link
              href="https://cloudburstlab.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block align-text-bottom hover:opacity-80 transition-opacity"
            >
              <Image
                src="https://cloudburstlab.vercel.app/api/branding/logo?variant=transparent"
                alt="CloudBurst Lab"
                width={160}
                height={28}
                className="inline-block h-7 w-auto"
              />
            </Link>
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CloudBurst Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
