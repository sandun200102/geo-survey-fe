import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const AllPermissions = () => {
  const { getAllUsers, updatePermission } = useAuthStore();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePermission = async (user, newPermission) => {
    
    await updatePermission(user._id, newPermission);
    fetchUsers();
  };

  const getBadge = (permission) => {
    switch (permission) {
      case "accept":
        return (
          <span className="flex items-center text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" /> Accepted
          </span>
        );
      case "reject":
        return (
          <span className="flex items-center text-red-400 text-sm">
            <XCircle className="w-4 h-4 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center text-yellow-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" /> Pending
          </span>
        );
    }
  };

  if (loading) {
    return <div className="text-white text-center py-4">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white mb-3">All User Permissions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-black/20">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">User</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Email</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Permission</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {users
              .filter((u) => u.role !== "superadmin")
              .map((u) => (
                <tr key={u._id}>
                  <td className="px-3 py-2 text-white">{u.firstName} {u.lastName}</td>
                  <td className="px-3 py-2 text-white">{u.email}</td>
                  <td className="px-3 py-2 text-white">{getBadge(u.permission)}</td>
                  <td className="px-3 py-2 text-white">
                    {u.permission === "pending" ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleChangePermission(u, "accept")}
                          className="px-2 py-0.5 bg-green-600/30 text-green-400 rounded text-xs hover:bg-green-600/40"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleChangePermission(u, "reject")}
                          className="px-2 py-0.5 bg-red-600/30 text-red-400 rounded text-xs hover:bg-red-600/40"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleChangePermission(u, "pending")}
                          className="px-2 py-0.5 bg-yellow-600/30 text-yellow-400 rounded text-xs hover:bg-yellow-600/40"
                        >
                          Pending
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-xs">No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {users.filter((u) => u.role !== "superadmin").length === 0 && (
          <p className="text-gray-400 text-center py-3 text-sm">No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllPermissions;
