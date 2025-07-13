import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { Helmet } from 'react-helmet-async';

const ManageWatchlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeId, setRemoveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
        setWatchlist(res.data);
      } catch (error) {
        console.error('Failed to fetch watchlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [axiosSecure, user?.email]);

  const handleRemove = async () => {
    if (!removeId || !user?.email) return;
    try {
      await axiosSecure.delete(`/watchlist/${removeId}?email=${user.email}`);
      setWatchlist(prev => prev.filter(item => item._id !== removeId));
      closeModal();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const openModal = (id) => {
    setRemoveId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setRemoveId(null);
    setModalOpen(false);
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-600 font-semibold">Loading your watchlist...</div>;
  }

  if (!watchlist.length) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium space-y-4">
        <p>Your watchlist is empty.</p>
        <button
          onClick={() => navigate('/allProducts')}
          className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>
          BB|UserDashBoard
        </title>
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 text-center">📋 Your Watchlist</h1>

      <div className="overflow-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-100 text-indigo-700 text-sm sm:text-base">
            <tr>
              <th className="px-4 py-3 border border-gray-200">Product</th>
              <th className="px-4 py-3 border border-gray-200">Market</th>
              <th className="px-4 py-3 border border-gray-200">Date</th>
              <th className="px-4 py-3 border border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {watchlist.map(({ _id, itemName, marketName, date }) => (
              <tr key={_id} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 border border-gray-200 capitalize">{itemName}</td>
                <td className="px-4 py-3 border border-gray-200">{marketName}</td>
                <td className="px-4 py-3 border border-gray-200">{date}</td>
                <td className="px-4 py-3 border border-gray-200">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => navigate('/allProducts')}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs sm:text-sm"
                    >
                      ➕ Add More
                    </button>
                    <button
                      onClick={() => openModal(_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs sm:text-sm"
                    >
                      ❌ Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-80 max-w-full text-center shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Confirm Removal
              </h2>
              <p className="mb-6 text-gray-600">
                Are you sure you want to remove this item from your watchlist?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageWatchlist;
