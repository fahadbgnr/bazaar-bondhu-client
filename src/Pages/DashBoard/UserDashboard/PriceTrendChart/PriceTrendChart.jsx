import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const itemButtonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const PriceTrendChart = () => {
  const axiosSecure = useAxiosSecure();

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState(null);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axiosSecure
      .get('/items')
      .then((res) => {
        const names = res.data.map(item => item.name);
        setItems(names);
        if (names.length > 0) setItemName(names[0]);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  useEffect(() => {
    if (!itemName) return;

    axiosSecure
      .get(`/price-trends/${itemName}`)
      .then((res) => {
        let allPrices = [];

        res.data.forEach(doc => {
          if (doc.priceHistory && Array.isArray(doc.priceHistory)) {
            doc.priceHistory.forEach(ph => {
              allPrices.push({
                date: ph.date,
                pricePerUnit: ph.price
              });
            });
          } else if (doc.pricePerUnit && doc.date) {
            allPrices.push({
              date: doc.date,
              pricePerUnit: doc.pricePerUnit
            });
          }
        });

        allPrices.sort((a, b) => a.date.localeCompare(b.date));
        setPriceData(allPrices);
      })
      .catch((err) => console.error(err));
  }, [itemName, axiosSecure]);

  if (!items.length) return <div className="text-center py-10">Loading items...</div>;
  if (!priceData.length) return <div className="text-center py-10">Loading price data...</div>;

  const trend =
    priceData.length >= 2
      ? (
        ((priceData[priceData.length - 1].pricePerUnit - priceData[0].pricePerUnit) /
          priceData[0].pricePerUnit) *
        100
      ).toFixed(1)
      : 0;

  const trendColor = trend >= 0 ? 'text-green-600' : 'text-rose-600';

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 md:px-8 py-6 bg-white rounded-2xl shadow-lg my-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>BB | UserDashboard</title>
      </Helmet>

      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-indigo-700">
        📈 Local Market Price Trend
      </h2>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar - Item list */}
        <div className="md:w-1/4">
          <h3 className="font-semibold mb-3 text-slate-700">🛒 Tracked Items</h3>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => setItemName(item)}
                  className={`px-4 py-2 rounded-lg capitalize text-left font-medium transition ${
                    item === itemName
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={itemButtonVariants}
                >
                  {item}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Chart and Price Details */}
        <div className="md:w-3/4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold capitalize text-slate-800">
              {itemName}
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={250} className="min-h-[250px]">
            <LineChart data={priceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`৳${value}`, 'Price']} />
              <Line
                type="monotone"
                dataKey="pricePerUnit"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

          <motion.p
            className={`mt-4 font-semibold ${trendColor}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Trend: {trend >= 0 ? '+' : ''}
            {trend}% over last {priceData.length} days
          </motion.p>

          <motion.div
            className="mt-6 bg-indigo-50 p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="font-semibold mb-3 text-indigo-700">📅 Price History</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-slate-700">
              {priceData.map((p, idx) => (
                <p key={idx}>
                  {p.date} — <span className="font-semibold">৳{p.pricePerUnit}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceTrendChart;
