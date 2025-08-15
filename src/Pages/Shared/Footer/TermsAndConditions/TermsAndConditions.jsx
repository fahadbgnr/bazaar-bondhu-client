import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-4 my-12 bg-green-50 dark:bg-gray-900 rounded shadow-md text-gray-800 dark:text-gray-200">
      <Helmet>
        <title>BB|TermsAndConditions</title>
      </Helmet>

      <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        Terms & Conditions
      </h1>

      <p className="mb-4">
        Welcome to our website! By accessing or using our services, you agree to be bound by these Terms and Conditions.
      </p>

      <h2 className="text-xl sm:text-lg font-semibold mb-2">1. Use of Service</h2>
      <p className="mb-4">
        You agree to use our service only for lawful purposes and in a way that does not infringe the rights of others.
      </p>

      <h2 className="text-xl sm:text-lg font-semibold mb-2">2. User Responsibilities</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2 className="text-xl sm:text-lg font-semibold mb-2">3. Product Information</h2>
      <p className="mb-4">
        We strive to provide accurate product information, but we do not guarantee that all data is complete, reliable, or error-free.
      </p>

      <h2 className="text-xl sm:text-lg font-semibold mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any direct, indirect, incidental, or consequential damages arising out of your use of our services.
      </p>

      <h2 className="text-xl sm:text-lg font-semibold mb-2">5. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms & Conditions, please contact us at <span className="font-medium">support@yourcompany.com</span>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
