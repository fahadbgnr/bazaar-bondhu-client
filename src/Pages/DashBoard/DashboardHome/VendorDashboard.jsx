import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { FaBullhorn, FaBoxOpen } from 'react-icons/fa';

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ productCount: 0, adCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorStats = async () => {
      try {
        const res = await axiosSecure.get('/vendor-stats');
        setStats({
          productCount: res.data.productsAdded || 0,
          adCount: res.data.advertisementsCreated || 0,
        });
      } catch (error) {
        console.error("Error fetching vendor stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchVendorStats();
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return <div className="text-center py-8 dark:text-gray-300">Loading vendor dashboard...</div>;
  }

  const cardBase =
    "shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 transition transform duration-300";
  const cardHover = { scale: 1.03 };

  return (
    <motion.div
      className="p-4 md:p-8 bg-green-50 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-700 dark:text-green-400 text-center">
        Welcome, {user?.displayName || 'Vendor'}!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Products Card */}
        <motion.div
          className={`${cardBase} border-green-600 bg-white dark:bg-gray-800 dark:border-green-500`}
          whileHover={cardHover}
        >
          <FaBoxOpen className="text-4xl text-green-600 dark:text-green-400" />
          <div>
            <h3 className="text-xl font-semibold dark:text-gray-200">My Products</h3>
            <p className="text-gray-600 dark:text-gray-400">{stats.productCount} product(s) added</p>
          </div>
        </motion.div>

        {/* Ads Card */}
        <motion.div
          className={`${cardBase} border-green-600 bg-white dark:bg-gray-800 dark:border-green-500`}
          whileHover={cardHover}
        >
          <FaBullhorn className="text-4xl text-green-600 dark:text-green-400" />
          <div>
            <h3 className="text-xl font-semibold dark:text-gray-200">My Advertisements</h3>
            <p className="text-gray-600 dark:text-gray-400">{stats.adCount} ad(s) created</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;
