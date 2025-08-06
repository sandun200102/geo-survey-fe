// export default Learn;
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const Learn = () => {
  const { getAllUsers } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      if (Array.isArray(result)) {
        setUsers(result);
        setFilteredUsers(result);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = users.filter((user) =>
      user.firstName?.toLowerCase().includes(term) ||
      user.lastName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex justify-center items-start p-6">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 text-white animate-fade-in transition-all duration-500">
        <h2 className="text-3xl font-bold text-emerald-400 mb-4 text-center">All Registered Users</h2>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
          />
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-300 animate-pulse">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-emerald-500 rounded-xl shadow-sm transition-transform duration-300">
              <thead>
                <tr className="bg-emerald-800 text-emerald-100">
                  <th className="px-6 py-3 border-b border-emerald-400">Email</th>
                  <th className="px-6 py-3 border-b border-emerald-400">Name</th>
                  <th className="px-6 py-3 border-b border-emerald-400">Contact</th>
                  <th className="px-6 py-3 border-b border-emerald-400">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-400 py-6">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-blue-400 transition-colors duration-200 border-b border-gray-600"
                    >
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.firstName} {user.lastName}</td>
                      <td className="px-6 py-3">{user.contactNumber}</td>
                      <td className="px-6 py-3">{user.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
