import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AddAdvertisementForm = ({ defaultValues = {}, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-semibold block mb-1">Ad Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
      </div>

      <div>
        <label className="font-semibold block mb-1">Short Description</label>
        <textarea
          {...register('description', { required: true })}
          className="textarea textarea-bordered w-full"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>

      <div>
        <label className="font-semibold block mb-1">Image URL</label>
        <input
          type="text"
          {...register('image', { required: true })}
          className="input input-bordered w-full"
        />
        {errors.image && <p className="text-red-500 text-sm">Image URL is required</p>}
      </div>

      {/* Status hidden input */}
      <input type="hidden" value="pending" {...register('status')} />

      <button
        type="submit"
        disabled={loading}
        className="btn bg-green-600 text-white w-full hover:bg-green-700"
      >
        {loading ? 'Saving...' : 'Save Advertisement'}
      </button>
    </form>
  );
};

export default AddAdvertisementForm;
