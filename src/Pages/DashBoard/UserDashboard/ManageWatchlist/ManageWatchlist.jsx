import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';

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
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        Loading your watchlist...
      </div>
    );
  }

  if (!watchlist.length) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Your watchlist is empty.
        <br />
        <button
          onClick={() => navigate('/allProducts')}
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Watchlist</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Market Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map(({ _id, itemName, marketName, date }) => (
              <tr key={_id} className="hover:bg-indigo-50">
                <td className="border border-gray-300 px-4 py-2 capitalize">{itemName}</td>
                <td className="border border-gray-300 px-4 py-2">{marketName}</td>
                <td className="border border-gray-300 px-4 py-2">{date}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => navigate('/allProducts')}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    title="Add More Products"
                  >
                    ➕ Add More
                  </button>
                  <button
                    onClick={() => openModal(_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    title="Remove from Watchlist"
                  >
                    ❌ Remove
                  </button>
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
