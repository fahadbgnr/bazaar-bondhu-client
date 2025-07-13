import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import BBLogo from '../BBLogo/BBLogo';

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 bg-green-50 text-gray-800 shadow-inner w-full">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Name */}
        <div className="flex items-start">
          <BBLogo />
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Contact Us</h3>
          <p className="text-sm">Email: aminulislamfahad1@gmail.com</p>
          <p className="text-sm">Phone: +880 1959792191</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>

        {/* Terms */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/termCondition" className="hover:text-green-600 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-green-600 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://github.com/fahadbgnr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sheikhfahad01/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-8 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-green-700 font-medium">BazaarBondhu</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
