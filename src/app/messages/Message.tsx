"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import VirtualCake from './VirtualCake';
import BalloonGame from './BalloonGame';
import { CardData } from '@/lib/cloudburstApi';

interface MessageProps {
    age: number;
    cards: CardData[];
}

const Message: React.FC<MessageProps> = ({ age, cards }) => {
    const router = useRouter();

    // Prefetch next page for smooth transition
    useEffect(() => {
        router.prefetch('/goodbye');
    }, [router]);

    const handleNextStep = () => {
        router.push('/goodbye');
    };
    return (
        <article className="bg-white dark:bg-gray-900 h-full min-h-screen transition-colors">
            <div className="container mx-auto px-3 md:px-5">
                <div className="py-5 md:py-8 space-y-6 md:space-y-8 pt-12 md:pt-20">
                    <h1 className='text-center font-medium text-xl md:text-2xl lg:text-3xl text-black dark:text-white'>
                        Congratulations! You are now {age}! <span role="img" aria-label="smirking face">🤭</span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-linear-to-b from-blue-400 via-indigo-600 to-indigo-900 dark:from-blue-600 dark:via-indigo-800 dark:to-gray-950 rounded-xl overflow-hidden shadow-xl"
                    >
                        <VirtualCake onAllCandlesBlown={() => {}} age={age} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12 md:mb-16"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 md:mb-4">
                            <span role="img" aria-label="balloon">🎈</span> Pop the Balloons Game!
                        </h2>
                        <BalloonGame />
                    </motion.div>

                    {cards.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            aria-label="Personal birthday cards collection"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
                                <span role="img" aria-label="gift with heart">💝</span> Personal Birthday Cards
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto" role="list">
                                {cards.map((card, index) => (
                                    <motion.article
                                        key={card.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg transition-colors"
                                        role="listitem"
                                    >
                                        {card.imageUrl ? (
                                            <div className="flex flex-col">
                                                <div className="shrink-0">
                                                    <div className="h-32 w-full relative">
                                                        <img 
                                                            src={card.imageUrl} 
                                                            alt={`Birthday card decoration for message: ${card.message.substring(0, 50)}...`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="p-4 flex items-center justify-center min-h-[120px]">
                                                    <p className={`${card.font} text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-4`}>
                                                        {card.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 min-h-40 flex items-center justify-center">
                                                <p className={`${card.font} text-xs text-center text-gray-700 dark:text-gray-300 line-clamp-5`}>
                                                    {card.message}
                                                </p>
                                            </div>
                                        )}
                                    </motion.article>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
                <div className="flex justify-center py-8">
                  <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 5 }}
                      type='button'
                      onClick={handleNextStep}
                      className='p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-black dark:text-white font-bold shadow-lg transition-all'
                      aria-label="Continue to next section"
                  >
                      Next
                  </motion.button>
                </div>
            </div>
        </article>
    );
}

export default Message;