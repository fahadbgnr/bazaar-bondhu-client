import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axiosSecure.get('/admin/all-orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch all orders:', error);
      }
    };
    fetchAllOrders();
  }, [axiosSecure]);

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>BB | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        📦 All Orders (Admin)
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-[600px] sm:min-w-full table-auto border-collapse w-full text-xs sm:text-sm md:text-base">
          <thead className="bg-green-100 dark:bg-green-900 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="text-left py-2 px-3 border border-gray-300 dark:border-gray-600">🧅 Product</th>
              <th className="text-left py-2 px-3 border border-gray-300 dark:border-gray-600">🛒 Market</th>
              <th className="text-left py-2 px-3 border border-gray-300 dark:border-gray-600">📧 Email</th>
              <th className="text-right py-2 px-3 border border-gray-300 dark:border-gray-600">৳ Price</th>
              <th className="text-left py-2 px-3 border border-gray-300 dark:border-gray-600">🔁 Transaction ID</th>
              <th className="text-left py-2 px-3 border border-gray-300 dark:border-gray-600">📅 Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr
                  key={order.transactionId}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 capitalize">{order.itemName}</td>
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 capitalize">{order.marketName}</td>
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 break-words max-w-[150px]">{order.email}</td>
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 text-right whitespace-nowrap">৳{order.amount}</td>
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 break-all max-w-[160px]">{order.transactionId}</td>
                  <td className="py-2 px-3 border border-gray-300 dark:border-gray-600 whitespace-nowrap">
                    {new Date(order.paid_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllOrder;
