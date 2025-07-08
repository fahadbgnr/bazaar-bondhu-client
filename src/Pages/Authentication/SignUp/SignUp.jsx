import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-green-50">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-4">Create Account</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              {/* Photo */}
              <div>
                <label className="label">Your Photo</label>
                <input type="file" className="file-input file-input-bordered w-full" />
              </div>

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500 text-sm mt-1">Password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be 6 characters or longer
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <a className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition mt-2">
                SignUp
              </button>
            </fieldset>

            {/* Login redirect */}
            <p className="mt-4 text-sm text-center">
              <small>
                Already have an account?{' '}
                <Link
                  className="text-green-600 hover:text-green-700 font-medium underline"
                  to="/login"
                >
                  Login
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

export default SignUp;
