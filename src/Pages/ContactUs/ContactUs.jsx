import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [fakeSent, setFakeSent] = useState(false);

  const onSubmit = (data) => {
    // Form validation handled by react-hook-form
    toast.success("✅ Message sent successfully!");
    setFakeSent(true);
    reset();

    setTimeout(() => setFakeSent(false), 5000);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 my-12 rounded shadow-md bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>BB | Contact Us</title>
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        Contact Us
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-8 text-center md:text-lg">
        Have questions or feedback? Reach out anytime using the info below or send us a message.
      </p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Address</h2>
          <p>Dhaka, Bangladesh</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Email</h2>
          <p>aminulislamfahad1@gmail.com</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Phone</h2>
          <p>+880 1959792191</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">Social</h2>
          <p>Facebook | Twitter | LinkedIn</p>
        </div>
      </div>

      {/* Fake Success Message */}
      <AnimatePresence>
        {fakeSent && (
          <motion.div
            className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-4 rounded mb-6 text-center font-semibold shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Your message has been sent successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: true })}
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <input
          type="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        <textarea
          placeholder="Your Message"
          {...register('message', { required: true })}
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          rows={5}
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">Message is required</p>}

        <button
          type="submit"
          className="btn bg-green-600 hover:bg-green-700 text-white w-full transition-all duration-300 hover:scale-105"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactUs;
