import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [priceHistory, setPriceHistory] = useState([]);
  const [priceDate, setPriceDate] = useState(new Date());
  const [priceValue, setPriceValue] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { date: new Date() },
  });

  const handleAddPrice = () => {
    if (!priceValue) {
      toast.warning('Please enter a price value');
      return;
    }
    const formattedDate = priceDate.toISOString().split('T')[0];
    const newEntry = { date: formattedDate, price: parseFloat(priceValue) };
    setPriceHistory((prev) => [...prev, newEntry]);
    setPriceValue('');
    setPriceDate(new Date());
  };

  const handleRemovePrice = (index) => {
    setPriceHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formattedDate = data.date.toISOString().split('T')[0];
    const newProduct = {
      vendorEmail: user?.email,
      vendorName: user?.displayName || '',
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      date: formattedDate,
      itemName: data.itemName,
      status: 'pending',
      image: data.image,
      pricePerUnit: parseFloat(data.pricePerUnit),
      priceHistory,
      itemDescription: data.itemDescription || '',
    };

    try {
      const res = await axiosSecure.post('/products', newProduct);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success('✅ Product added successfully!', { autoClose: 3000 });
        reset({ date: new Date() });
        setPriceHistory([]);
        navigate('/dashboard/my-products');
      }
    } catch (error) {
      console.error('❌ Error adding product:', error);
      toast.error('❌ Failed to add product. Try again.', { autoClose: 3000 });
    }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg py-10 my-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>BB | Vendor Dashboard</title>
      </Helmet>

      <h2 className="text-4xl font-bold mb-8 text-green-700 dark:text-green-400 text-center">
        Add Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vendor Email */}
        <div>
          <label className="block font-semibold mb-2">Vendor Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Vendor Name */}
        <div>
          <label className="block font-semibold mb-2">Vendor Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Market Name */}
        <div>
          <label className="block font-semibold mb-2">Market Name</label>
          <input
            type="text"
            {...register('marketName', { required: true })}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.marketName && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-2">Date</label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-200"
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
        </div>

        {/* Market Description */}
        <div>
          <label className="block font-semibold mb-2">Market Description</label>
          <textarea
            {...register('marketDescription', { required: true })}
            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          ></textarea>
          {errors.marketDescription && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Item Name */}
        <div>
          <label className="block font-semibold mb-2">Item Name</label>
          <input
            type="text"
            {...register('itemName', { required: true })}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.itemName && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-2">Image URL</label>
          <input
            type="text"
            {...register('image', { required: true })}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image URL is required</p>
          )}
        </div>

        {/* Price per Unit */}
        <div>
          <label className="block font-semibold mb-2">Price per Unit</label>
          <input
            type="number"
            step="0.01"
            {...register('pricePerUnit', { required: true })}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Price History Entry */}
        <div>
          <label className="block font-semibold mb-2">Price History</label>
          <div className="flex items-center gap-4">
            <DatePicker
              selected={priceDate}
              onChange={(date) => setPriceDate(date)}
              className="input input-bordered dark:bg-gray-700 dark:text-gray-200"
              dateFormat="yyyy-MM-dd"
            />
            <input
              type="number"
              step="0.01"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              placeholder="Price"
              className="input input-bordered dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              type="button"
              onClick={handleAddPrice}
              className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>

          {priceHistory.length > 0 && (
            <ul className="mt-3 space-y-1">
              {priceHistory.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-green-50 dark:bg-green-900 px-3 py-2 rounded"
                >
                  <span>{item.date} — ৳{item.price}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePrice(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Item Description */}
        <div>
          <label className="block font-semibold mb-2">Item Description (optional)</label>
          <textarea
            {...register('itemDescription')}
            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-200"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn bg-green-600 hover:bg-green-700 text-white font-semibold w-full"
        >
          Submit Product
        </button>
      </form>
    </motion.div>
  );
};

export default AddProducts;
