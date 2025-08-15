import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 text-center px-4">
      <FaLock className="text-6xl text-red-500 mb-4" />
      
      <h1 className="text-4xl font-bold text-red-500">403 - Forbidden</h1>
      
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-md">
        Sorry, you do not have permission to access this page. Please contact an administrator if you believe this is a mistake.
      </p>

      <Link to="/" className="mt-6">
        <button className="btn bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
