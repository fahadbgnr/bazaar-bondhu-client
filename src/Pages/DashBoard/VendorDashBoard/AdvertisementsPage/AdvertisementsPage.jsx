import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import AddAdvertisementForm from './AddAdvertisementForm';
import { Helmet } from 'react-helmet-async';

const AdvertisementsPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/advertisements?vendorEmail=${user.email}`);
      setAds(res.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast.error('Failed to load advertisements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchAds();
  }, [user]);

  const memoizedSelectedAd = useMemo(() => {
    return selectedAd ? { ...selectedAd } : null;
  }, [selectedAd?._id]);

  const handleAddAd = async (data) => {
    try {
      const adData = {
        ...data,
        vendorEmail: user.email,
        vendorName: user.displayName || '',
        status: 'pending',
      };
      const res = await axiosSecure.post('/advertisements', adData);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success('Advertisement added successfully!');
        fetchAds();
      }
    } catch (error) {
      console.error('Add ad error:', error);
      toast.error('Failed to add advertisement.');
    }
  };

  const handleUpdateAd = async (data) => {
    try {
      const adData = {
        ...selectedAd,
        ...data,
        vendorEmail: user.email,
      };
      const res = await axiosSecure.put(`/advertisements/${selectedAd._id}`, adData);
      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        toast.success('Advertisement updated successfully!');
        fetchAds();
        setShowUpdateModal(false);
        setSelectedAd(null);
      }
    } catch (error) {
      console.error('Update ad error:', error);
      toast.error('Failed to update advertisement.');
    }
  };

  const handleDeleteAd = async () => {
    try {
      const res = await axiosSecure.delete(
        `/advertisements/${selectedAd._id}?vendorEmail=${user.email}`
      );
      if (res.data.deletedCount > 0) {
        toast.success('Advertisement deleted successfully!');
        fetchAds();
        setShowDeleteModal(false);
        setSelectedAd(null);
      }
    } catch (error) {
      console.error('Delete ad error:', error);
      toast.error('Failed to delete advertisement.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <Helmet>
        <title>BB | Vendor Dashboard</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-10 text-center">
        Manage Advertisements
      </h1>

      {/* Add Advertisement Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">
          Add New Advertisement
        </h2>
        <AddAdvertisementForm onSubmit={handleAddAd} />
      </motion.div>

      {/* Advertisements Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-10 dark:text-gray-300">Loading advertisements...</p>
        ) : (
          <table className="table w-full border border-gray-300 dark:border-gray-700 rounded-md">
            <thead className="bg-green-100 dark:bg-green-800 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-5 dark:text-gray-400">
                    No advertisements found.
                  </td>
                </tr>
              ) : (
                ads.map((ad) => (
                  <tr
                    key={ad._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-3">{ad.title}</td>
                    <td className="p-3">{ad.description}</td>
                    <td className="p-3 capitalize">{ad.status}</td>
                    <td className="p-3 space-x-3">
                      <button
                        onClick={() => {
                          setSelectedAd(ad);
                          setShowUpdateModal(true);
                        }}
                        className="btn btn-sm bg-green-600 text-white hover:bg-green-700 px-6"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAd(ad);
                          setShowDeleteModal(true);
                        }}
                        className="btn btn-sm bg-red-600 text-white hover:bg-red-700 px-6"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && memoizedSelectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg"
          >
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">
              Update Advertisement
            </h3>
            <AddAdvertisementForm
              defaultValues={memoizedSelectedAd}
              onSubmit={handleUpdateAd}
            />
            <button
              onClick={() => {
                setShowUpdateModal(false);
                setSelectedAd(null);
              }}
              className="mt-4 btn btn-outline btn-sm w-full"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 space-y-6 relative"
          >
            {/* Close (X) button */}
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedAd(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 rounded-full p-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* Title & Text */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Delete Advertisement?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to permanently delete <br />
                <span className="font-semibold text-red-600 dark:text-red-400">
                  "{selectedAd.title}"
                </span>?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleDeleteAd}
                className="btn bg-red-600 text-white hover:bg-red-700 px-6"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedAd(null);
                }}
                className="btn btn-outline px-6"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementsPage;
