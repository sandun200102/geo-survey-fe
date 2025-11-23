import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import permissionStore from "../store/permissionStore";

const AllPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(permissionStore.state.isLoading);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = permissionStore.subscribe((state) => {
      setPermissions(state.PermissionList);
      setLoading(state.isLoading);
    });

    fetchPermissionData();

    return unsubscribe;
  }, []);

  const fetchPermissionData = async () => {
    await permissionStore.fetchPermission();
  };

  const handleChangePermission = async (permissionDoc, newStatus) => {
    await permissionStore.updatePermission(permissionDoc._id, {
      permissionStatus: newStatus,
    });

    fetchPermissionData();
  };

  const getBadge = (status) => {
    switch (status) {
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
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Project</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Permission</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {permissions.map((p) => (
              <tr key={p._id}>
                <td className="px-3 py-2 text-white">{p.userName || "Unknown User"}</td>
                <td className="px-3 py-2 text-white">{p.userEmail}</td>
                <td className="px-3 py-2 text-white">{p.projectId || "N/A"}</td>

                <td className="px-3 py-2 text-white">{getBadge(p.permissionStatus)}</td>

                <td className="px-3 py-2 text-white">
                  {p.permissionStatus === "pending" ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleChangePermission(p, "accept")}
                        className="px-2 py-0.5 bg-green-600/30 text-green-400 rounded text-xs hover:bg-green-600/40"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleChangePermission(p, "reject")}
                        className="px-2 py-0.5 bg-red-600/30 text-red-400 rounded text-xs hover:bg-red-600/40"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleChangePermission(p, "pending")}
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

        {permissions.length === 0 && (
          <p className="text-gray-400 text-center py-3 text-sm">No permissions found</p>
        )}
      </div>
    </div>
  );
};

export default AllPermissions;
