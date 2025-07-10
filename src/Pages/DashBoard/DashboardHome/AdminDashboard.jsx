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

  if (!stats) return <p className="text-center">Loading admin stats...</p>;

  const { users, products } = stats;

  return (
    <motion.div
      className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-green-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-1">👥 Total Users</h3>
        <p>Admin: {users.admin}</p>
        <p>Vendors: {users.vendor}</p>
        <p>Users: {users.user}</p>
      </div>

      <div className="bg-blue-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-1">✅ Approved Products</h3>
        <p>Total: {products.approved}</p>
      </div>

      <div className="bg-red-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-1">❌ Rejected Products</h3>
        <p>Total: {products.rejected}</p>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
