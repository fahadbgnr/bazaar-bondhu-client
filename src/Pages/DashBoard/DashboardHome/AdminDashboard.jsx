import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get('/admin-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error fetching stats', err));
  }, [axiosSecure]);

  if (!stats) return <p className="text-center text-gray-700 dark:text-gray-300">Loading admin stats...</p>;

  const { users, products } = stats;

  const cardStyles = "rounded-xl p-6 shadow-lg text-gray-800 dark:text-gray-200";
  const bgStyles = {
    users: "bg-green-100 dark:bg-green-800",
    approved: "bg-blue-100 dark:bg-blue-800",
    rejected: "bg-red-100 dark:bg-red-800",
  };

  return (
    <motion.div
      className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Users Stats */}
      <div className={`${bgStyles.users} ${cardStyles}`}>
        <h3 className="text-lg font-semibold mb-2">👥 Total Users</h3>
        <p>Admin: <span className="font-medium">{users.admin}</span></p>
        <p>Vendors: <span className="font-medium">{users.vendor}</span></p>
        <p>Users: <span className="font-medium">{users.user}</span></p>
      </div>

      {/* Approved Products */}
      <div className={`${bgStyles.approved} ${cardStyles}`}>
        <h3 className="text-lg font-semibold mb-2">✅ Approved Products</h3>
        <p>Total: <span className="font-medium">{products.approved}</span></p>
      </div>

      {/* Rejected Products */}
      <div className={`${bgStyles.rejected} ${cardStyles}`}>
        <h3 className="text-lg font-semibold mb-2">❌ Rejected Products</h3>
        <p>Total: <span className="font-medium">{products.rejected}</span></p>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
