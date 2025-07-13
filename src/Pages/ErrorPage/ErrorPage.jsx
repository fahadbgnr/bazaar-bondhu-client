import React from 'react';
import { Link, useRouteError } from 'react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-10 shadow-xl w-full max-w-xl text-center"
            >
                <Helmet>
                    <title>
                        BB | ErrorPage
                    </title>
                </Helmet>
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 opacity-30 blur-lg z-0"></div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-700 to-emerald-600 mb-4 drop-shadow">
                            {error?.status || 404}
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-2xl font-semibold text-gray-800 mb-4"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {error?.statusText || error?.message || "Page not found!"}
                    </motion.p>

                    <motion.p
                        className="text-gray-700 mb-6"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Sorry, the page you're looking for doesn't exist or has been moved.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/"
                            className="btn bg-green-600 hover:bg-green-700 text-white rounded-full px-8 text-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            ⬅ Go Back Home
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
