import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [comparisonDate, setComparisonDate] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/products/${id}`).then(res => setProduct(res.data)).catch(() => toast.error('Failed to load product'));
    axiosSecure.get(`/products/${id}/reviews`).then(res => setReviews(res.data)).catch(() => toast.error('Failed to load reviews'));
  }, [id]);

  const handleAddToWatchlist = async () => {
    if (!user) return toast.error('Please log in');
    if (user.role === 'admin' || user.role === 'vendor') return;

    setWatchlistLoading(true);
    try {
      await axiosSecure.post('/watchlist', { productId: id, userEmail: user.email });
      toast.success('Added to watchlist');
    } catch {
      toast.error('Failed to add to watchlist');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleBuyProduct = async () => {
    if (!user) return toast.error('Please log in');

    setBuyLoading(true);
    try {
      const { data } = await axiosSecure.post('/create-payment-session', { productId: id, userEmail: user.email });
      window.location.href = data.url;
    } catch {
      toast.error('Payment initiation failed');
      setBuyLoading(false);
    }
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

  useEffect(() => {
    if (!comparisonDate) return;
    axiosSecure.get(`/products/${id}/price-history`, { params: { date: comparisonDate } })
      .then(res => setPriceHistory(res.data))
      .catch(() => toast.error('Failed to load price comparison'));
  }, [comparisonDate, id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">{product.marketName} 🏪</h2>
      <img src={product.image} alt={product.itemName} className="w-full max-h-96 object-cover rounded-lg" />
      <p>📅 Date: {new Date(product.date).toLocaleDateString()}</p>

      <div>
        <h3 className="text-xl font-semibold">Items and Prices:</h3>
        <ul className="list-disc list-inside">
          {product.items.map((item, idx) => (
            <li key={idx}>🧅 {item.name} — ৳{item.price}/{item.unit}</li>
          ))}
        </ul>
      </div>

      <p>👨‍🌾 Vendor: {product.vendorName} ({product.vendorEmail})</p>

      <button
        disabled={user?.role === 'admin' || user?.role === 'vendor' || watchlistLoading}
        onClick={handleAddToWatchlist}
        className={`px-4 py-2 rounded text-white ${
          user?.role === 'admin' || user?.role === 'vendor' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        ⭐ Add to Watchlist
      </button>

      <button
        onClick={handleBuyProduct}
        disabled={buyLoading}
        className="ml-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        🛒 Buy Product
      </button>

      <section>
        <h3 className="text-2xl font-bold mt-8">Reviews & Comments 💬</h3>
        <ul>
          {reviews.map(r => (
            <li key={r._id} className="border p-3 rounded my-2">
              <p><strong>{r.userName}</strong> ({r.userEmail}) - <em>{new Date(r.date).toLocaleDateString()}</em></p>
              <p>⭐ {r.rating} / 5</p>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>

        {user ? (
          <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
            <label>
              Star Rating:
              <select
                value={newReview.rating}
                onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="ml-2 border rounded p-1"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Comment:
              <textarea
                value={newReview.comment}
                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                className="block w-full border rounded p-2 mt-1"
                rows={3}
                placeholder="Write your review here..."
              />
            </label>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit Review</button>
          </form>
        ) : (
          <p className="text-red-600 mt-4">Please log in to leave a review.</p>
        )}
      </section>

      <section className="mt-10">
        <h3 className="text-2xl font-bold">Price Comparison with Previous Dates 📊</h3>
        <label>
          Select Date:{' '}
          <input
            type="date"
            value={comparisonDate}
            onChange={e => setComparisonDate(e.target.value)}
            className="border p-1 rounded"
          />
        </label>

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
          <p>No data for selected date.</p>
        )}
      </section>
    </div>
  );
};

export default DetailsPage;
