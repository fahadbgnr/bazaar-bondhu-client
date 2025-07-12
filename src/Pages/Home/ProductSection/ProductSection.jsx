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
        setProducts(res.data);
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
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Latest Market Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg shadow-md p-4 flex flex-col">
            <img
              src={product.image}
              alt={product.itemName}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg capitalize">{product.marketName}</h3>
            <p className="text-gray-600 text-sm mb-2">
              📅 {new Date(product.date).toLocaleDateString()}
            </p>
            <div className="bg-green-50 p-2 rounded mb-2">
              <p className="text-sm capitalize">
                📋 {product.itemName} — ৳{product.pricePerUnit} /kg
              </p>
            </div>
            <button
              onClick={() => handleViewDetails(product._id)}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              🔍 View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
