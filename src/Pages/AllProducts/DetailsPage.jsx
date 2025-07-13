import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useUserRole from '../../hooks/useUserRole';
import { Helmet } from 'react-helmet-async';

const DetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [comparisonDate, setComparisonDate] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error('Failed to load product'));

    axiosSecure.get(`/products/${id}/reviews`)
      .then(res => setReviews(res.data))
      .catch(() => toast.error('Failed to load reviews'));
  }, [id]);

  useEffect(() => {
    if (!comparisonDate) return;
    axiosSecure.get(`/products/${id}/price-history`, { params: { date: comparisonDate } })
      .then(res => setPriceHistory(res.data))
      .catch(() => toast.error('Failed to load price comparison'));
  }, [comparisonDate, id]);

  const handleAddToWatchlist = async () => {
    if (!user) return toast.error('Please log in');
    if (role === 'admin' || role === 'vendor') return;

    setWatchlistLoading(true);
    try {
      await axiosSecure.post('/watchlist', { productId: id, userEmail: user.email });
      toast.success('Added to watchlist');
      navigate('/dashboard/manage-watchlist');
    } catch {
      toast.error('Failed to add to watchlist');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleBuyProduct = () => {
    if (!user) {
      toast.error('Please log in');
      return;
    }
    setBuyLoading(true);
    navigate(`/dashboard/payment/${id}`);
    setBuyLoading(false);
  };


  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please log in');
    if (newReview.rating < 1) return toast.error('Please provide a rating');

    try {
      await axiosSecure.post(`/products/${id}/reviews`, {
        userName: user.displayName,
        userEmail: user.email,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      });
      toast.success('Review submitted');
      setNewReview({ rating: 0, comment: '' });
      const res = await axiosSecure.get(`/products/${id}/reviews`);
      setReviews(res.data);
    } catch {
      toast.error('Failed to submit review');
    }
  };

  if (roleLoading) return <div className="text-center py-10 text-xl">Loading user role...</div>;
  if (!product) return <div className="text-center py-10 text-xl">Loading product details...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Helmet>
        <title>
          BB | ProductDetails
        </title>
      </Helmet>
      {/* Market name and date */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">{product.marketName} 🏪</h2>
        <p className="text-gray-600">📅 {new Date(product.date).toLocaleDateString()}</p>
      </div>

      {/* Product image */}
      <img
        src={product.image}
        alt={product.itemName}
        className="max-w-full object-cover rounded-xl shadow-md"
      />

      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* Item list */}
        <div c>
          <h3 className="text-2xl font-semibold mb-2">🧺 Item List</h3>
          <ul className="space-y-2 bg-green-50">
            {Array.isArray(product.items) && product.items.length > 0 ? (
              product.items.map((item, idx) => (
                <li key={idx} className="flex justify-between border p-3 rounded shadow-sm">
                  <span> {item.name}</span>
                  <span>৳{item.price} / {item.unit}</span>
                </li>
              ))
            ) : (

              <li className="flex justify-between border p-3 rounded shadow-sm">
                <span> {product.itemName}</span>
                <span>৳{product.pricePerUnit}</span>
              </li>
            )}
          </ul>
        </div>


        {/* Vendor info and buttons */}
        <div className="space-y-6">
          <div className="border p-4 rounded shadow-sm bg-green-50">
            <h3 className="text-xl font-semibold mb-2">👨‍🌾 Vendor Info</h3>
            <p className="mb-1"><strong>Name:</strong> {product.vendorName}</p>
            <p><strong>Email:</strong> {product.vendorEmail}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              disabled={role === 'admin' || role === 'vendor' || watchlistLoading}
              onClick={handleAddToWatchlist}
              className={`px-4 py-2 rounded text-white ${role === 'admin' || role === 'vendor' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              ⭐ Add to Watchlist
            </button>

            <button
              onClick={() => handleBuyProduct(product._id)}
              disabled={buyLoading}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🛒 Buy Product
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h3 className="text-2xl font-bold">💬 Reviews</h3>
        <div className="space-y-4 mt-4">
          {reviews.map(r => (
            <div key={r._id} className="p-4 border rounded shadow-sm">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span><strong>{r.userName}</strong> ({r.userEmail})</span>
                <span>{new Date(r.date).toLocaleDateString()}</span>
              </div>
              <p className="text-yellow-600 font-medium">⭐ {r.rating} / 5</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleSubmitReview} className="mt-6 bg-green-50 p-4 rounded shadow space-y-4">
            <div>
              <label className="block mb-1 font-semibold">⭐ Star Rating:</label>
              <select
                value={newReview.rating}
                onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="w-full border p-2 rounded"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">📝 Comment:</label>
              <textarea
                value={newReview.comment}
                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Write your honest review here..."
              />
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-red-500 mt-4">🔒 Please log in to leave a review.</p>
        )}
      </section>

      {/* Price Comparison Chart */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-3">📊 Price Comparison</h3>
        <div className="mb-4">
          <label className="mr-2 font-medium">Select Date:</label>
          <input
            type="date"
            value={comparisonDate}
            onChange={e => setComparisonDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {priceHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceHistory}>
              <XAxis dataKey="itemName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available for the selected date.</p>
        )}
      </section>
    </div>
  );
};

export default DetailsPage;
