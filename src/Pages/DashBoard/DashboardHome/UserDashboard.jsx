import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch watchlist count
    axiosSecure.get(`/watchlist?email=${user.email}`)
      .then(res => setWatchlistCount(res.data.length || 0))
      .catch(err => console.error("Watchlist fetch error", err));

    // Fetch order count
    axiosSecure.get(`/payments?email=${user.email}`)
      .then(res => setOrderCount(res.data.length || 0))
      .catch(err => console.error("Order fetch error", err));
  }, [user?.email, axiosSecure]);

  const cardBase = "p-6 rounded-2xl shadow-lg border transition transform duration-300";
  const cardHover = { scale: 1.03 };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-400">
        👤 Welcome, {user?.displayName || 'User'}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Watchlist Card */}
        <motion.div
          className={`${cardBase} bg-white border-green-200 dark:bg-gray-800 dark:border-green-600 text-gray-800 dark:text-gray-200`}
          whileHover={cardHover}
        >
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">📋 My Watchlist</h3>
          <p className="text-4xl font-bold">{watchlistCount}</p>
        </motion.div>

        {/* Orders Card */}
        <motion.div
          className={`${cardBase} bg-white border-blue-200 dark:bg-gray-800 dark:border-blue-600 text-gray-800 dark:text-gray-200`}
          whileHover={cardHover}
        >
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">🧾 My Orders</h3>
          <p className="text-4xl font-bold">{orderCount}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
