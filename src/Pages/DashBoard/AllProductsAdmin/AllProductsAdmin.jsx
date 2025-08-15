import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AllProductsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPages, setTotalPages] = useState(1);

  const { data: response, refetch, isLoading } = useQuery({
    queryKey: ['all-products', page],
    queryFn: async () => {
      const res = await axiosSecure.get('/products', {
        params: { page, limit },
      });
      if (res.data?.products) {
        setTotalPages(res.data.totalPages || 1);
        return res.data.products;
      }
      return [];
    },
    keepPreviousData: true,
  });

  const queryInvalidate = () => {
    queryClient.invalidateQueries(['all-products']);
    refetch();
  };

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/products/${id}/status`, { status: 'approved' });
      if (res.data.modifiedCount > 0) {
        toast.success('✅ Product approved');
        queryInvalidate();
      }
    } catch (err) {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: 'Reject Product',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Rejection Reason">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Rejection Feedback"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const rejectionReason = document.getElementById('swal-input1').value.trim();
        const rejectionFeedback = document.getElementById('swal-input2').value.trim();
        if (!rejectionReason || !rejectionFeedback) {
          Swal.showValidationMessage('Both fields are required');
          return false;
        }
        return { rejectionReason, rejectionFeedback };
      },
    });

    if (formValues) {
      try {
        const res = await axiosSecure.patch(`/products/${product._id}/reject`, formValues);
        if (res.data.result.modifiedCount > 0) {
          toast.success('❌ Product rejected with feedback');
          queryInvalidate();
        }
      } catch (err) {
        toast.error('Failed to reject product');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('🗑️ Product deleted');
          queryInvalidate();
        }
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (isLoading) return <p className="text-center py-6 text-gray-600 dark:text-gray-300">Loading products...</p>;

  return (
    <div className="p-6">
      <Helmet>
        <title>BB | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">🛍️ All Products (Admin)</h2>

      {!response?.length ? (
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <table className="table-auto w-full border-collapse text-sm sm:text-base">
              <thead className="bg-green-100 dark:bg-green-900 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Image</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Market</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Date</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Item</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Status</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Vendor</th>
                  <th className="py-2 px-3 border border-gray-300 dark:border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">
                      <img src={product.image} alt={product.itemName} className="w-12 h-12 rounded" />
                    </td>
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">{product.marketName}</td>
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">{product.date ? new Date(product.date).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">{product.itemName}</td>
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">
                      <span
                        className={`badge ${
                          product.status === 'approved'
                            ? 'badge-success'
                            : product.status === 'pending'
                            ? 'badge-warning'
                            : 'badge-error'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 border border-gray-300 dark:border-gray-600">
                      <p className="text-sm">{product.vendorName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{product.vendorEmail}</p>
                      {product.status === 'rejected' && product.rejectionFeedback && (
                        <p className="text-xs text-red-600 dark:text-red-400">Feedback: {product.rejectionFeedback}</p>
                      )}
                    </td>
                    <td className="space-y-1 flex flex-col py-2 px-3 border border-gray-300 dark:border-gray-600">
                      {product.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(product._id)} className="btn btn-sm btn-success">
                            Approve
                          </button>
                          <button onClick={() => handleReject(product)} className="btn btn-sm btn-warning">
                            Reject
                          </button>
                        </>
                      )}
                      <Link to={`/dashboard/products/update/${product._id}`} className="btn btn-sm btn-info">
                        Update
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-error">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`btn btn-sm transition duration-300 ${
                page === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Previous
            </button>

            <span className="font-medium text-green-800 dark:text-green-400">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`btn btn-sm transition duration-300 ${
                page === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProductsAdmin;
