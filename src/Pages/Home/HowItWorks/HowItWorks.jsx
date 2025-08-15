import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      title: '1. Vendors Update Prices',
      desc: 'Local vendors regularly update current prices of essential products.',
    },
    {
      title: '2. Users View & Compare',
      desc: 'Buyers can compare rates across markets and make smart decisions.',
    },
    {
      title: '3. Stay Informed',
      desc: 'Track daily price trends and stay ahead of market fluctuations.',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 border rounded-lg shadow hover:shadow-md transition bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
