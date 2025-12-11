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
        className="bg-linear-to-r from-purple-500 to-indigo-500 dark:from-purple-900 dark:to-indigo-950 text-white py-12 px-6 md:px-12 relative flex min-h-screen items-center"
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

        {/* Professional Credit Section */}
        <footer className="w-full fixed left-0 bottom-0 z-30 py-6 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center text-sm md:text-base rounded-t-xl px-4">
          <div className="mb-2 w-full flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-4">
            <div className="flex flex-col items-center w-full md:w-auto">
              <span>Visit developer</span>
              <Link
                href="https://shawkath646.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Shawkat Hossain Maruf
              </Link>
            </div>
            <span className="hidden md:inline">|</span>
            <div className="flex flex-col items-center w-full md:w-auto">
              <span>More projects</span>
              <Link
                href="https://shawkath646.pro/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-700 font-semibold"
              >
                Portfolio
              </Link>
            </div>
          </div>
          <div className="mt-2 flex flex-col md:flex-row items-center justify-center gap-2 text-gray-700 dark:text-gray-300 w-full">
            <span>This app is powered by</span>
            <Link href="https://cloudburstlab.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block align-text-bottom hover:opacity-80 transition-opacity">
              <Image 
                src="https://cloudburstlab.vercel.app/api/branding/logo?variant=transparent" 
                alt="CloudBurst Lab" 
                width={120}
                height={24}
                className="inline-block h-6 w-auto"
              />
            </Link>
          </div>
        </footer>
    </motion.main>
);

export default GoodBye;