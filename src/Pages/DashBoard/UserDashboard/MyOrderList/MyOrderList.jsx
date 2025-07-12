import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MyOrderList = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, [axiosSecure, user?.email]);

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto space-y-10">
      <h2 className="text-2xl font-bold text-center mb-6">🧾 My Order List</h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left text-xs sm:text-sm md:text-base">Product</th>
              <th className="border border-gray-300 px-2 py-1 text-left text-xs sm:text-sm md:text-base">Market</th>
              <th className="border border-gray-300 px-2 py-1 text-right text-xs sm:text-sm md:text-base">Price (৳)</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs sm:text-sm md:text-base">Date</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs sm:text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">No orders found.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.transactionId} className="hover:bg-green-50 transition-colors">
                  <td className="border border-gray-300 px-2 py-1 capitalize text-xs sm:text-sm md:text-base">{order.itemName || 'Unknown Product'}</td>
                  <td className="border border-gray-300 px-2 py-1 capitalize text-xs sm:text-sm md:text-base">{order.marketName || 'Unknown Market'}</td>
                  <td className="border border-gray-300 px-2 py-1 text-right text-xs sm:text-sm md:text-base">{order.amount ?? 0}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                    {order.paid_at ? new Date(order.paid_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <button
                      onClick={() => navigate(`/detailsPage/${order.id}`)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-blue-700 transition"
                    >
                      🔍 View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Price Trend Chart for all products */}
      {orders.length > 0 && (
        <div className="w-full h-64 sm:h-80 md:h-96">
          <h3 className="text-xl font-semibold mb-4 text-center">📊 Price Trend of Purchased Products</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={orders.map(o => ({
                itemName: o.itemName || 'Unknown Product',
                price: o.amount ?? 0
              }))}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="itemName" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MyOrderList;
