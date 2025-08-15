import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const ViewMyProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    if (!user?.email) return;

    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(`/products`, {
          params: { vendorEmail: user.email, page, limit },
        });
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to fetch products');
      }
    };

    fetchProducts();
  }, [user, axiosSecure, page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete product?',
      text: "This can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/products/${id}`);
          if (res.data.deletedCount) {
            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success('✅ Deleted successfully!');
          } else {
            toast.error('❌ Failed to delete');
          }
        } catch (err) {
          console.error(err);
          toast.error('❌ Server error during deletion');
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <Helmet>
        <title>BB | Vendor Dashboard</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400 text-center">
        My Products
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <table className="table w-full text-gray-800 dark:text-gray-200">
          <thead className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-200">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Market</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, i) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-green-50 dark:hover:bg-green-700 border-t"
                >
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td>{p.itemName}</td>
                  <td>৳{p.pricePerUnit?.toFixed(2)}</td>
                  <td>{p.marketName}</td>
                  <td>{p.date ? new Date(p.date).toLocaleDateString() : 'N/A'}</td>
                  <td className="capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        p.status === 'approved'
                          ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200'
                          : p.status === 'rejected'
                          ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200'
                          : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200'
                      }`}
                    >
                      {p.status}
                    </span>
                    {p.status === 'rejected' && (
                      <div className="mt-1 text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900 p-2 rounded">
                        <p>
                          <strong>Reason:</strong> {p.rejectionReason || 'Not provided'}
                        </p>
                        <p>
                          <strong>Feedback:</strong> {p.rejectionFeedback || 'No feedback'}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="space-x-2 text-center">
                    <button
                      onClick={() => navigate(`/dashboard/products/update/${p._id}`)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500 dark:text-gray-400">
                  You haven't added any products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`btn btn-sm transition duration-300 ${
            page === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
          }`}
        >
          Previous
        </button>

        <span className="font-medium text-green-800 dark:text-green-300">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`btn btn-sm transition duration-300 ${
            page === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default ViewMyProduct;
