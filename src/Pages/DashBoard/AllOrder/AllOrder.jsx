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
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-green-700">
        📦 All Orders (Admin)
      </h2>
      <Helmet>
        <title>
          BB|AdminDashBoard
        </title>
      </Helmet>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-[600px] sm:min-w-full table-auto border-collapse border border-gray-200 w-full text-xs sm:text-sm md:text-base">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="text-left py-2 px-3 border border-gray-300">🧅 Product</th>
              <th className="text-left py-2 px-3 border border-gray-300">🛒 Market</th>
              <th className="text-left py-2 px-3 border border-gray-300">📧 Email</th>
              <th className="text-right py-2 px-3 border border-gray-300">৳ Price</th>
              <th className="text-left py-2 px-3 border border-gray-300">🔁 Transaction ID</th>
              <th className="text-left py-2 px-3 border border-gray-300">📅 Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.transactionId} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border border-gray-300 capitalize">{order.itemName}</td>
                  <td className="py-2 px-3 border border-gray-300 capitalize">{order.marketName}</td>
                  <td className="py-2 px-3 border border-gray-300 break-words max-w-[150px]">{order.email}</td>
                  <td className="py-2 px-3 border border-gray-300 text-right whitespace-nowrap">৳{order.amount}</td>
                  <td className="py-2 px-3 border border-gray-300 break-all max-w-[160px]">{order.transactionId}</td>
                  <td className="py-2 px-3 border border-gray-300 whitespace-nowrap">
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
