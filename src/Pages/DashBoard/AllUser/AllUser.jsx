import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

// Debounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Framer Motion Variants
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  // Fetch Users with Search
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["allUsers", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: debouncedSearch ? { search: debouncedSearch } : {},
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Role Update
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      Swal.fire("✅ Updated!", "User role updated.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("❌ Error!", "Failed to update role.", "error");
    },
  });

  const handleRoleChange = async (user) => {
    const { value: role } = await Swal.fire({
      title: "Select New Role",
      input: "select",
      inputOptions: {
        user: "User",
        vendor: "Vendor",
        admin: "Admin",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
    });

    if (!role) return;
    await updateRole({ id: user._id, role });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <Helmet>
        <title>BB | Admin Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        👥 All Users
      </h2>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <table className="table w-full text-sm sm:text-base">
            <thead className="bg-green-100 dark:bg-green-900 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Joined</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <td className="px-4 py-2 break-all max-w-[220px] sm:max-w-[300px]">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : user.role === "vendor"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRoleChange(user)}
                      className="btn btn-xs bg-green-500 hover:bg-green-600 text-white"
                    >
                      Change Role
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUser;
