import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-gray-700">
          {[
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
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 border rounded-lg shadow hover:shadow-md transition bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
