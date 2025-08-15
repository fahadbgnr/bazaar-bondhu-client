import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 dark:bg-gray-900 rounded shadow-md my-10 text-gray-800 dark:text-gray-200">
      <Helmet>
        <title>BB | Privacy Policy</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        Privacy Policy
      </h1>

      <p className="mb-6 text-justify md:text-lg">
        At BB, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, submit products, or use our services.
      </p>

      <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><strong>Vendors:</strong> Name, email, product submissions.</li>
        <li><strong>Customers:</strong> Name, email, watchlist, orders, reviews.</li>
        <li>Usage data: pages visited, clicks, search behavior, session info.</li>
        <li>Cookies and tracking for analytics and personalization.</li>
        <li>Payment information via Stripe; we never store it directly.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Process orders, product submissions, and reviews.</li>
        <li>Provide, maintain, and improve our services.</li>
        <li>Respond to inquiries, feedback, and support requests.</li>
        <li>Send updates, notifications, and promotions (with consent).</li>
        <li>Analyze usage to enhance website functionality and user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
      <p className="mb-4">
        We use industry-standard security measures, including HTTPS, encryption, and hashed passwords, to protect your data. However, no system is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
      <p className="mb-4">
        Personal data is retained only as long as necessary for service purposes or to comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold mb-3">5. Cookies & Tracking</h2>
      <p className="mb-4">
        Cookies and similar tools are used for session management, analytics, and personalization. Disabling cookies may affect website functionality.
      </p>

      <h2 className="text-xl font-semibold mb-3">6. Children’s Privacy</h2>
      <p className="mb-4">
        Our services are not intended for children under 13. We do not knowingly collect data from children. Any data discovered will be deleted immediately.
      </p>

      <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
      <p className="mb-4">
        We may share information with trusted providers (Firebase, Stripe, hosting, analytics) solely to operate and improve our services. They must keep your data confidential.
      </p>

      <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Access, update, or correct personal information.</li>
        <li>Request deletion of your account or data.</li>
        <li>Opt-out of marketing communications.</li>
        <li>Withdraw consent where applicable.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Changes will be posted here with an updated revision date. Please review it regularly.
      </p>

      <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Email: aminulislamfahad1@gmail.com</li>
        <li>Phone: +880 1959792191</li>
        <li>Address: Dhaka, Bangladesh</li>
      </ul>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
        Last updated: August 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
