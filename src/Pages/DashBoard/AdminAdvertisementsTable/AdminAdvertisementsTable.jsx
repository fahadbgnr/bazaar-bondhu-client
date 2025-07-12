import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllAdvertisementsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['all-ads'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-advertisements'); 
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/advertisements/${id}/status`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Advertisement marked as ${status}`);
        queryClient.invalidateQueries(['all-ads']);
      } else {
        toast.warning(res.data.message || 'No change detected');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the advertisement.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/advertisements/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('Advertisement deleted');
          queryClient.invalidateQueries(['all-ads']);
        }
      } catch (error) {
        toast.error('Failed to delete advertisement');
        console.error(error);
      }
    }
  };

  if (isLoading) return <p>Loading advertisements...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 All Advertisements (Admin)</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img src={ad.image} alt="ad" className="w-12 h-12 object-cover rounded" />
                </td>
                <td>{ad.title}</td>
                <td className="max-w-sm truncate">{ad.description}</td>
                <td>
                  <p className="text-sm">{ad.vendorEmail}</p>
                </td>
                <td>
                  <span
                    className={`badge ${
                      ad.status === 'approved'
                        ? 'badge-success'
                        : ad.status === 'rejected'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="space-y-1 flex flex-col">
                  {ad.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleStatusChange(ad._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleStatusChange(ad._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdvertisementsAdmin;
