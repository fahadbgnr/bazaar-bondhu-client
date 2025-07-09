import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const location = useLocation();
  const [profilePic, setProfilePic] = useState('');
  const from = location.state?.from || '/';

  const onSubmit = data => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update userinfo in the database
        const userInfo = {
          email: data.email,
          role: 'user', // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log('profile name pic updated')
            navigate(from);
          })
          .catch(error => {
            console.log(error)
          })

      })
      .catch(error => {
        console.error(error);
      })
  }
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image)

    const formData = new FormData();
    formData.append('image', image);


    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
    const res = await axios.post(imagUploadUrl, formData)

    setProfilePic(res.data.data.url);

  }

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
                <input type="file"
                  onChange={handleImageUpload}
                  className="input" placeholder="Your Profile picture" />
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
