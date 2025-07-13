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
      .then(res => {
        setWatchlistCount(res.data.length || 0);
      })
      .catch(err => console.error("Watchlist fetch error", err));

    // Fetch order count
    axiosSecure.get(`/payments?email=${user.email}`)
      .then(res => {
        setOrderCount(res.data.length || 0);
      })
      .catch(err => console.error("Order fetch error", err));
  }, [user?.email, axiosSecure]);

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">👤 Welcome, {user?.displayName || 'User'}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-green-200"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-green-600 mb-2">📋 My Watchlist</h3>
          <p className="text-4xl font-bold text-gray-800">{watchlistCount}</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🧾 My Orders</h3>
          <p className="text-4xl font-bold text-gray-800">{orderCount}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
