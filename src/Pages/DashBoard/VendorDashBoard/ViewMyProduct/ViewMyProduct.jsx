import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ViewMyProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/products?vendorEmail=${user.email}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

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
            setProducts(products.filter((p) => p._id !== id));
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
      className="overflow-x-auto p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
        My Products
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-900">
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
            {products.map((p, i) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-green-50 border-t"
              >
                <td>{i + 1}</td>
                <td>{p.itemName}</td>
                <td>৳{p.pricePerUnit.toFixed(2)}</td>
                <td>{p.marketName}</td>
                <td>{p.date}</td>
                <td className="capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      p.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : p.status === 'rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="space-x-2 text-center">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/products/update/${p._id}`)
                    }
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  You haven't added any products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ViewMyProduct;
