import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllProductsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Pagination states
    const [page, setPage] = useState(1);
    const limit = 9;

    const { data: allProducts, refetch, isLoading } = useQuery({
        queryKey: ['all-products', page],
        queryFn: async () => {
            const res = await axiosSecure.get('/products', {
                params: { page, limit }
            });
            if (Array.isArray(res.data)) return res.data;
            if (Array.isArray(res.data.products)) return res.data.products;
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
                toast.success('Product approved ✅');
                queryInvalidate();
            } else {
                toast.info(res.data.message || 'No changes made.');
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
        }
    };

    // Reject with reason & feedback modal + API call
    const handleReject = async (product) => {
        const { value: formValues } = await Swal.fire({
            title: 'Reject Product',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Rejection Reason">` +
                `<textarea id="swal-input2" class="swal2-textarea" placeholder="Rejection Feedback"></textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const rejectionReason = document.getElementById('swal-input1').value.trim();
                const rejectionFeedback = document.getElementById('swal-input2').value.trim();
                if (!rejectionReason || !rejectionFeedback) {
                    Swal.showValidationMessage('Both reason and feedback are required');
                    return false;
                }
                return { rejectionReason, rejectionFeedback };
            }
        });

        if (formValues) {
            try {
                const res = await axiosSecure.patch(`/products/${product._id}/reject`, {
                    rejectionReason: formValues.rejectionReason,
                    rejectionFeedback: formValues.rejectionFeedback,
                });

                if (res.data.result.modifiedCount > 0) {
                    toast.success('Product rejected with feedback ❌');
                    queryInvalidate();
                } else {
                    toast.info('No changes made');
                }
            } catch (error) {
                toast.error('Failed to reject product');
                console.error(error);
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
                    toast.success('Product deleted');
                    queryInvalidate();
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete product');
            }
        }
    };

    const handlePrev = () => {
        if (page > 1) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (allProducts && allProducts.length === limit) setPage((p) => p + 1);
    };

    if (isLoading) return <p>Loading products...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🛍️ All Products (Admin)</h2>
            {(!allProducts || allProducts.length === 0) ? (
                <p>No products found.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Market</th>
                                    <th>Date</th>
                                    <th>Item</th>
                                    <th>Status</th>
                                    <th>Vendor</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(Array.isArray(allProducts) ? allProducts : []).map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.itemName || 'item'}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td>{product.marketName}</td>
                                        <td>{product.date ? new Date(product.date).toLocaleDateString() : 'N/A'}</td>
                                        <td>{product.itemName}</td>
                                        <td>
                                            <span
                                                className={`badge ${product.status === 'approved'
                                                        ? 'badge-success'
                                                        : product.status === 'pending'
                                                            ? 'badge-warning'
                                                            : 'badge-error'
                                                    }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>
                                            <p className="text-sm text-gray-600">{product.vendorName}</p>
                                            <p className="text-xs text-gray-400">{product.vendorEmail}</p>
                                            {product.status === 'rejected' && product.rejectionFeedback && (
                                                <p className="mt-1 text-xs text-red-600 font-semibold">
                                                    Feedback: {product.rejectionFeedback}
                                                </p>
                                            )}
                                        </td>
                                        <td className="space-y-1 flex flex-col">
                                            {product.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(product._id)}
                                                        className="btn btn-sm btn-success"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(product)}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <Link
                                                to={`/dashboard/products/update/${product._id}`}
                                                className="btn btn-sm btn-info"
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className={`btn btn-sm transition duration-300 ${page === 1
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            Previous
                        </button>

                        <span className="font-medium text-green-800">Page {page}</span>

                        <button
                            onClick={handleNext}
                            disabled={!allProducts || allProducts.length < limit}
                            className={`btn btn-sm transition duration-300 ${!allProducts || allProducts.length < limit
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
