import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="text-center mt-6">
      <div className="relative w-full flex items-center justify-center mb-4">
        <hr className="w-full border-gray-300" />
        <span className="absolute px-3 bg-white text-gray-500 text-sm">OR</span>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 hover:border-green-600 hover:text-green-700 shadow-sm py-2 px-4 rounded-md transition duration-300"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          viewBox="0 0 533.5 544.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285f4"
            d="M533.5 278.4c0-18.6-1.5-37-4.7-54.8H272v103.7h146.9c-6.4 34.8-25.4 64.3-54.3 84l87.8 68.2c51.3-47.3 81.1-117 81.1-201.1z"
          />
          <path
            fill="#34a853"
            d="M272 544.3c73.6 0 135.4-24.4 180.5-66.3l-87.8-68.2c-24.4 16.5-55.8 26-92.7 26-71.3 0-131.7-48-153.3-112.4H27v70.7C72.7 475.3 166.7 544.3 272 544.3z"
          />
          <path
            fill="#fbbc04"
            d="M118.7 323.4c-10.4-30.8-10.4-64.1 0-94.9V157.8H27c-28.2 56.4-28.2 123.2 0 179.6l91.7-14z"
          />
          <path
            fill="#ea4335"
            d="M272 107.6c39.9-.6 78.2 14.6 107.5 42.8l80.5-80.5C407.3 23.4 340.9-1.1 272 0 166.7 0 72.7 68.9 27 166.7l91.7 70.7c21.6-64.3 82-112.3 153.3-112.3z"
          />
        </svg>
        <span className="text-sm font-medium">Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
