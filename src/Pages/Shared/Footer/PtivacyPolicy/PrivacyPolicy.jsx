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

      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, submit products, or use our services.
      </p>

      <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Vendor information: name, email, and product submissions.</li>
          <li>Customer information: name, email, watchlist, orders, and reviews.</li>
          <li>Usage data: pages visited, clicks, search behavior, and session information.</li>
          <li>Cookies and tracking information for analytics and website personalization.</li>
          <li>Payment information via third-party services (Stripe), never stored directly on our servers.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">
        Your information is used to:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Process orders, product submissions, and reviews.</li>
          <li>Provide, maintain, and improve our services.</li>
          <li>Respond to inquiries, feedback, and support requests.</li>
          <li>Send updates, notifications, and relevant communications (with consent).</li>
          <li>Analyze usage data to enhance website functionality and user experience.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard measures to protect your data from unauthorized access, alteration, or disclosure. Passwords are hashed, and all data is transmitted over secure HTTPS connections.
      </p>

      <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
      <p className="mb-4">
        Personal data is retained only as long as necessary for the purposes outlined here, or to comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold mb-3">5. Cookies & Tracking</h2>
      <p className="mb-4">
        Cookies and similar technologies are used for session management, analytics, personalization, and improving user experience. You can disable cookies in your browser, but this may affect functionality.
      </p>

      <h2 className="text-xl font-semibold mb-3">6. Children’s Privacy</h2>
      <p className="mb-4">
        Our services are not intended for children under 13 years old. We do not knowingly collect personal data from children. If discovered, such data will be deleted immediately.
      </p>

      <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
      <p className="mb-4">
        We may share data with trusted third-party service providers (like Firebase, Stripe, or hosting services) to operate and improve our services. They are required to keep your information confidential.
      </p>

      <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
      <p className="mb-4">
        You have the right to:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Access, update, or correct your personal information.</li>
          <li>Request deletion of your account or data.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Withdraw consent where applicable.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Changes will be posted here with an updated revision date. We encourage you to review it regularly.
      </p>

      <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this Privacy Policy or your data, please contact us:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Email: aminulislamfahad1@gmail.com</li>
          <li>Phone: +880 1959792191</li>
          <li>Address: Dhaka, Bangladesh</li>
        </ul>
      </p>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
        Last updated: August 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
