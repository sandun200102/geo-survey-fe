import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore"; // Adjust path if needed

const GetAllUsers = () => {
  const { getAllUsers } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Contact</th>
              <th className="border px-3 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-3 py-2">{user.email}</td>
                  <td className="border px-3 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border px-3 py-2">{user.contactNumber}</td>
                  <td className="border px-3 py-2">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllUsers;
