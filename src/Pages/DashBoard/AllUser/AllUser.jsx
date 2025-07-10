import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Update user role
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      Swal.fire('Updated!', 'User role updated.', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update role.', 'error');
    }
  });

  const handleRoleChange = async (user) => {
    const { value: role } = await Swal.fire({
      title: 'Select New Role',
      input: 'select',
      inputOptions: {
        user: 'User',
        vendor: 'Vendor',
        admin: 'Admin'
      },
      inputPlaceholder: 'Select a role',
      showCancelButton: true
    });

    if (!role) return;

    await updateRole({ id: user._id, role });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-success' : user.role === 'vendor' ? 'badge-info' : 'badge-ghost'}`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleRoleChange(user)}
                      className="btn btn-xs bg-green-500 text-white"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUser;
