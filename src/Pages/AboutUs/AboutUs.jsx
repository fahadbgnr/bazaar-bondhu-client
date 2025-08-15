import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <motion.div
            className="max-w-5xl mx-auto p-6 my-12 bg-green-50 rounded shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Helmet>
                <title>BB | About Us</title>
            </Helmet>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700">About Us</h1>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify md:text-lg">
                Welcome to BB! We are passionate about providing the best local market pricing platform
                to help vendors and customers make informed decisions. Our mission is to bring transparency,
                convenience, and trust to everyday market activities.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify md:text-lg">
                Our team is committed to innovation and growth. We strive to enhance your experience through
                cutting-edge technology, user-friendly interfaces, and reliable support. We believe in
                empowering our users with accurate and up-to-date information.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify md:text-lg">
                Thank you for choosing BB as your trusted local market platform. We are continuously
                improving to meet your needs and exceed your expectations.
            </p>
        </motion.div>
    );
};

export default AboutUs;
