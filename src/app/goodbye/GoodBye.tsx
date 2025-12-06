"use client";
import Link from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";

interface GoodByeProps {
  personName: string;
}

const GoodBye: React.FC<GoodByeProps> = ({ personName }) => (
    <motion.main
        initial={{ opacity: 0, y: '50px' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-50px' }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-900 dark:to-indigo-950 text-white py-12 px-6 md:px-12 relative flex min-h-screen items-center"
    >
        <article className="max-w-3xl mx-auto text-center">
            <motion.h1
                initial={{ opacity: 0, y: '50px' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6"
            >
                Thank You for Celebrating!
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: '50px' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl mb-8"
            >
                Your presence made it even more special. Let's cherish these memories forever!
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: '50px' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-white dark:bg-gray-200 text-indigo-500 dark:text-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-700 hover:text-white rounded-full py-3 px-8 font-bold text-lg md:text-xl shadow-lg focus:outline-none transition-colors"
                    aria-label="Say goodbye and close celebration"
                >
                    Say Goodbye
                </motion.button>
            </motion.div>
        </article>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-4 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-2">
                <p className="text-sm">
                    This app is developed by{' '}
                    <Link 
                        href="https://shawkath646.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-200 font-semibold underline transition-colors"
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
                            width={140}
                            height={24}
                            className="inline-block h-6 w-auto"
                        />
                    </Link>
                </p>
                <p className="text-xs opacity-80">
                    © {new Date().getFullYear()} CloudBurst Lab. All rights reserved.
                </p>
            </div>
        </footer>
    </motion.main>
);

export default GoodBye;