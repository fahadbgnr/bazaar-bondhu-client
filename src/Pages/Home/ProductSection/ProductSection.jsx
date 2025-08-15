import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products-latest');
        setProducts(res.data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    fetchProducts();
  }, [axiosInstance]);

  const handleViewDetails = (productId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/detailsPage/${productId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        🛒 Latest Market Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No recent products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md p-4 flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg capitalize text-gray-800 dark:text-gray-200">
                {product.marketName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                📅 {new Date(product.date).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium capitalize text-green-700 dark:text-green-400">
                📋 {product.itemName} — ৳{product.pricePerUnit} /kg
              </p>
              <button
                onClick={() => handleViewDetails(product._id)}
                className="mt-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white py-2 rounded transition"
              >
                🔍 View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
