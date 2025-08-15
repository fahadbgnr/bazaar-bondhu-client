import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <motion.div
            className="max-w-5xl mx-auto p-6 my-12 rounded shadow-md 
                       bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Helmet>
                <title>BB | About Us</title>
            </Helmet>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
                About Us
            </h1>
            
            <p className="text-justify md:text-lg mb-4">
                Welcome to <span className="font-semibold">BB</span>! We are passionate about providing the best local market pricing platform to help vendors and customers make informed decisions. Our mission is to bring transparency, convenience, and trust to everyday market activities.
            </p>

            <p className="text-justify md:text-lg mb-4">
                Our team is committed to innovation and growth. We strive to enhance your experience through cutting-edge technology, user-friendly interfaces, and reliable support. We believe in empowering our users with accurate and up-to-date information.
            </p>

            <p className="text-justify md:text-lg mb-4">
                Thank you for choosing <span className="font-semibold">BB</span> as your trusted local market platform. We are continuously improving to meet your needs and exceed your expectations.
            </p>

            <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                © 2025 BB. All rights reserved.
            </p>
        </motion.div>
    );
};

export default AboutUs;
