import React, { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { Helmet } from 'react-helmet-async';

const AllProducts = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const fetchProducts = async () => {
    try {
      const params = { page, limit };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (sort) params.sort = sort;

      const res = await axiosInstance.get('/products', { params });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Error loading products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [startDate, endDate, sort, page]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };

  const handleViewDetails = (id) => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/detailsPage/${id}` } } });
    } else {
      navigate(`/detailsPage/${id}`);
    }
  };

  const handlePrevPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < totalPages && setPage(page + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <Helmet>
        <title>BB | All Products</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
        🛍️ Explore Fresh Market Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 justify-center items-center">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">Start Date:</label>
          <input
            type="date"
            className="input input-bordered border-green-400 dark:border-green-600 dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">End Date:</label>
          <input
            type="date"
            className="input input-bordered border-green-400 dark:border-green-600 dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">Sort:</label>
          <select
            className="select select-bordered border-green-400 dark:border-green-600 dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="border border-green-200 dark:border-green-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-48 object-cover object-center rounded-t-xl"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400">{product.itemName}</h3>
                <p className="text-lg font-bold text-green-600 dark:text-green-500">💵 ৳{product.pricePerUnit}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">📅 {format(new Date(product.date), 'yyyy-MM-dd')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">🏪 {product.marketName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">👨‍🌾 {product.vendorName}</p>

                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="mt-3 w-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 px-4 py-2 rounded-lg transition"
                >
                  🔍 View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`btn btn-sm transition duration-300 ${page === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            : 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600'
            }`}
        >
          Prev
        </button>

        <span className="text-green-800 dark:text-green-400 font-medium">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`btn btn-sm transition duration-300 ${page === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            : 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
