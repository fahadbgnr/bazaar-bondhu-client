import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AllAdvertisementsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['all-ads'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-advertisements'); 
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/advertisements/${id}/status`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Advertisement marked as ${status}`);
        queryClient.invalidateQueries(['all-ads']);
      } else {
        toast.warning(res.data.message || 'No change detected');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the advertisement.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/advertisements/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('Advertisement deleted');
          queryClient.invalidateQueries(['all-ads']);
        }
      } catch (error) {
        toast.error('Failed to delete advertisement');
        console.error(error);
      }
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-lg text-gray-700 dark:text-gray-300">Loading advertisements...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>BB | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">📢 All Advertisements (Admin)</h2>

      {/* Large screens (lg) - table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.length > 0 ? (
              ads.map((ad) => (
                <motion.tr
                  key={ad._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td>
                    <img src={ad.image || '/placeholder.png'} alt={ad.title} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="text-gray-800 dark:text-gray-100">{ad.title}</td>
                  <td className="max-w-xs truncate text-gray-700 dark:text-gray-300" title={ad.description}>{ad.description}</td>
                  <td className="text-gray-700 dark:text-gray-300">{ad.vendorEmail}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 rounded ${
                        ad.status === 'approved'
                          ? 'bg-green-500 text-white'
                          : ad.status === 'rejected'
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="flex flex-col gap-2">
                    {ad.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                          onClick={() => handleStatusChange(ad._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600"
                          onClick={() => handleStatusChange(ad._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(ad._id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Medium screens (md) - compact table/cards */}
      <div className="hidden md:block lg:hidden flex flex-col gap-4">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <motion.div
              key={ad._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img src={ad.image || '/placeholder.png'} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">{ad.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]" title={ad.description}>
                    {ad.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    ad.status === 'approved'
                      ? 'bg-green-500 text-white'
                      : ad.status === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}
                >
                  {ad.status}
                </span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {ad.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleStatusChange(ad._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs bg-yellow-500 text-white hover:bg-yellow-600"
                        onClick={() => handleStatusChange(ad._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">No advertisements found.</p>
        )}
      </div>

      {/* Small screens (sm) - stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <motion.div
              key={ad._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <img src={ad.image || '/placeholder.png'} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">{ad.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs" title={ad.description}>
                    {ad.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ad.vendorEmail}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    ad.status === 'approved'
                      ? 'bg-green-500 text-white'
                      : ad.status === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}
                >
                  {ad.status}
                </span>
                <div className="flex flex-wrap gap-2">
                  {ad.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleStatusChange(ad._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs bg-yellow-500 text-white hover:bg-yellow-600"
                        onClick={() => handleStatusChange(ad._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">No advertisements found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAdvertisementsAdmin;
