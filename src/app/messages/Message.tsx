"use client";
import { motion } from 'framer-motion';
import VirtualCake from './VirtualCake';
import BalloonGame from './BalloonGame';
import { CardData } from '@/lib/cloudburstApi';

interface MessageProps {
    age: number;
    cards: CardData[];
    setCurrentStep: () => void;
}

const Message: React.FC<MessageProps> = ({ age, cards, setCurrentStep }) => {
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
                        className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-4 md:p-6 shadow-xl transition-colors"
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
                            className="mb-12 md:mb-16"
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
                                                <div className="flex-shrink-0">
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
                                            <div className="p-4 min-h-[160px] flex items-center justify-center">
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
                
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                    type='button'
                    onClick={() => setCurrentStep()}
                    className='p-3 md:p-5 bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-all rounded-full fixed right-3 md:right-5 bottom-12 md:bottom-16 text-white shadow-lg z-50 text-sm md:text-base font-semibold'
                    aria-label="Continue to next section"
                >
                    Next
                </motion.button>
            </div>
        </article>
    );
}

export default Message;