import React from 'react';
import { motion } from 'framer-motion';
import BannerPic from '../../../assets/BannerPic.png';

const Banner = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BannerPic})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-4xl text-white space-y-8 px-4 sm:px-8"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          Get Fresh & Local Market Prices Daily
        </h1>
        <p className="text-xl sm:text-2xl font-medium tracking-wide drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]">
          Stay updated with the freshest produce prices from your nearby markets.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 transition px-10 py-4 rounded-md font-semibold shadow-lg text-lg sm:text-xl"
        >
          Explore Prices
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Banner;
