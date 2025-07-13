import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success('Login successful');
        navigate(from); // Or any protected route
      })
      .catch((error) => {
        console.log(error);
        toast.error('Login failed');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-green-50">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-4">Please Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                  })}
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500 text-sm">
                    Password must be 6 characters or longer
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition"
              >
                Login
              </button>
            </fieldset>

            {/* Register Link */}
            <p className="mt-4 text-sm text-center">
              <small>
                New to this website?{' '}
                <Link
                  className="text-green-600 hover:text-green-700 font-medium underline"
                  to="/signUp"
                >
                  SignUp
                </Link>
              </small>
            </p>
          </form>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
