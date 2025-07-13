import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const UpdateProduct = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [priceHistory, setPriceHistory] = useState([]);
    const [priceDate, setPriceDate] = useState(new Date());
    const [priceValue, setPriceValue] = useState('');

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch existing product data
    useEffect(() => {
        axiosSecure.get(`/products/${id}`).then((res) => {
            console.log('Fetched product:', res.data);
            const product = res.data;

            if (product) {
                reset({
                    marketName: product.marketName || '',
                    marketDescription: product.marketDescription || '',
                    date: new Date(product.date), // make sure it's valid date format
                    itemName: product.itemName || '',
                    image: product.image || '',
                    pricePerUnit: product.pricePerUnit || '',
                    itemDescription: product.itemDescription || '',
                });
                setPriceHistory(product.priceHistory || []);
            }
        });
    }, [id, axiosSecure, reset]);

    const handleAddPrice = () => {
        if (priceValue) {
            const formattedDate = priceDate.toISOString().split('T')[0];
            const newEntry = {
                date: formattedDate,
                price: parseFloat(priceValue),
            };
            setPriceHistory([...priceHistory, newEntry]);
            setPriceValue('');
            setPriceDate(new Date());
        }
    };

    const handleRemovePrice = (index) => {
        const updated = priceHistory.filter((_, i) => i !== index);
        setPriceHistory(updated);
    };

    const onSubmit = async (data) => {
        const formattedDate = data.date.toISOString().split('T')[0];
        const updatedProduct = {
            vendorEmail: user?.email,
            vendorName: user?.displayName || '',
            marketName: data.marketName,
            marketDescription: data.marketDescription,
            date: formattedDate,
            itemName: data.itemName,
            image: data.image,
            pricePerUnit: parseFloat(data.pricePerUnit),
            priceHistory,
            itemDescription: data.itemDescription || '',
        };

        try {
            const res = await axiosSecure.put(`/products/${id}`, updatedProduct);
            if (res.data.modifiedCount > 0) {
                toast.success('✅ Product updated successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.info('ℹ️ No changes made.');
            }
        } catch (error) {
            console.error('❌ Update failed:', error);
            toast.error('❌ Failed to update product.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <motion.div
            className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg py-10 my-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Helmet>
                <title>
                    BB|UpdateProduct
                </title>
            </Helmet>
            <h2 className="text-4xl font-bold mb-8 text-green-700 text-center">Update Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email & Name (readonly) */}
                <div>
                    <label className="block font-semibold mb-2">Vendor Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Vendor Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Reused Inputs */}
                <div>
                    <label className="block font-semibold mb-2">Market Name</label>
                    <input
                        type="text"
                        {...register('marketName', { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.marketName && <p className="text-red-500 text-sm">Required</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-2">Date</label>
                    <Controller
                        control={control}
                        name="date"
                        defaultValue={new Date()}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                className="input input-bordered w-full"
                                dateFormat="yyyy-MM-dd"
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Market Description</label>
                    <textarea
                        {...register('marketDescription', { required: true })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Item Name</label>
                    <input
                        type="text"
                        {...register('itemName', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Image URL</label>
                    <input
                        type="text"
                        {...register('image', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Price per Unit</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('pricePerUnit', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Price History Input */}
                <div>
                    <label className="block font-semibold mb-2">Price History</label>
                    <div className="flex items-center gap-4">
                        <DatePicker
                            selected={priceDate}
                            onChange={(date) => setPriceDate(date)}
                            className="input input-bordered"
                            dateFormat="yyyy-MM-dd"
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={priceValue}
                            onChange={(e) => setPriceValue(e.target.value)}
                            placeholder="Price"
                            className="input input-bordered"
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
                                    className="flex items-center justify-between bg-green-50 px-3 py-2 rounded"
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

                <div>
                    <label className="block font-semibold mb-2">Item Description (optional)</label>
                    <textarea
                        {...register('itemDescription')}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn bg-green-600 hover:bg-green-700 text-white font-semibold w-full"
                >
                    Update Product
                </button>
            </form>
        </motion.div>
    );
};

export default UpdateProduct;
