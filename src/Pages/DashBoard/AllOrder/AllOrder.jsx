import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get('/orders'); // ✅ secured endpoint call
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 italic">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">{order.customerName || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    ${order.total?.toFixed(2) || '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AllOrders;