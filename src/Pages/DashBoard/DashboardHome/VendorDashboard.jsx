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
        console.log('Vendor stats response:', res.data); // Optional: for debugging

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
    return <div className="text-center py-8">Loading vendor dashboard...</div>;
  }

  return (
    <motion.div
      className="p-4 md:p-8 bg-green-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center">
        Welcome, {user?.displayName || 'Vendor'}!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Products Card */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-green-600"
          whileHover={{ scale: 1.02 }}
        >
          <FaBoxOpen className="text-4xl text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">My Products</h3>
            <p className="text-gray-600">{stats.productCount} product(s) added</p>
          </div>
        </motion.div>

        {/* Ads Card */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-green-600"
          whileHover={{ scale: 1.02 }}
        >
          <FaBullhorn className="text-4xl text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">My Advertisements</h3>
            <p className="text-gray-600">{stats.adCount} ad(s) created</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;
