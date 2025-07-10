import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllProductsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: allProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        },
    });

    const handleStatus = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/products/${id}/status`, { status });

            if (res.data.modifiedCount > 0) {
                toast.success(`Product ${status === 'approved' ? 'approved ✅' : 'rejected ❌'} successfully`);
                queryClient.invalidateQueries(['all-products']); 
            } else {
                toast.info(res.data.message || 'No changes made.');
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
        }
    };


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the product!",
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
                    refetch();
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete product');
            }
        }
    };

    if (isLoading) return <p>Loading products...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🛍️ All Products (Admin)</h2>
            {allProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
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
                            {allProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt="item"
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td>{product.marketName}</td>
                                    <td>{new Date(product.date).toLocaleDateString()}</td>
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
                                    </td>
                                    <td className="space-y-1 flex flex-col">
                                        {product.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatus(product._id, 'approved')}
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatus(product._id, 'rejected')}
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
            )}
        </div>
    );
};

export default AllProductsAdmin;
