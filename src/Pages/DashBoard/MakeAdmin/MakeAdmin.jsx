import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  // Fetch users based on email query
  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  // Update user role mutation
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      background: "#1e293b", // Dark mode friendly
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: currentRole === "admin" ? "#dc2626" : "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire({
        title: "Success",
        text: `${action} successful`,
        icon: "success",
        background: "#1e293b",
        color: "#fff",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update user role",
        icon: "error",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>BB | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Make Admin
      </h2>

      {/* Search bar */}
      <div className="flex gap-2 mb-6 items-center">
        <FaSearch className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          className="input input-bordered w-full max-w-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>

      {isFetching && (
        <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
      )}

      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-gray-500 dark:text-gray-400">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra dark:text-gray-200">
            <thead>
              <tr className="dark:bg-gray-800">
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="dark:hover:bg-gray-800">
                  <td>{u.email}</td>
                  <td>
                    {new Date(u.created_at || u.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin"
                          ? "badge-success"
                          : "badge-ghost dark:text-gray-300"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`btn btn-sm ${
                        u.role === "admin"
                          ? "btn-error"
                          : "btn-primary dark:bg-blue-600"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" />
                          Make Admin
                        </>
                      )}
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

export default MakeAdmin;
