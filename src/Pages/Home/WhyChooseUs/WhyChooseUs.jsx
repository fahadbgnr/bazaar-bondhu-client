import React from 'react';
import { FaClock, FaChartLine, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaClock className="text-3xl text-green-600 mb-3" />,
      title: 'Real-Time Updates',
      desc: 'Get the latest prices as soon as vendors update them. No more guesswork.',
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600 mb-3" />,
      title: 'Market Trends',
      desc: 'Track price trends over time to make better buying decisions.',
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-green-600 mb-3" />,
      title: 'Local Focus',
      desc: 'We focus on your nearby markets to give you accurate and relevant info.',
    },
    {
      icon: <FaUsers className="text-3xl text-green-600 mb-3" />,
      title: 'Community Powered',
      desc: 'Vendors and users contribute together to keep data reliable and fresh.',
    },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              {item.icon}
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
