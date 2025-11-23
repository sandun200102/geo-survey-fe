import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import permissionStore from "../store/permissionStore";
import { useAuthStore } from "../store/authStore";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  type = "default",
}) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="text-red-600 w-5 h-5" />
          <h2 className="text-md font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600 mt-2 text-sm">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-3 py-1 rounded text-sm ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "default",
    title: "",
    message: "",
    confirmText: "",
    permissionId: null,
    newStatus: null,
  });
  const { updatePermission } = useAuthStore();

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = permissionStore.subscribe((state) => {
      setPermissions(state.PermissionList);
      setLoading(state.isLoading);
    });

    // Initial fetch
    permissionStore.fetchPermission().catch(console.error);

    return unsubscribe;
  }, []);

  const pendingUsers = permissions.filter((p) => p.permissionStatus === "pending");

  const openDialog = (user, newStatus) => {
    setDialog({
      isOpen: true,
      permissionId: user._id,
      newStatus,
      type: newStatus === "accept" ? "success" : "danger",
      title: newStatus === "accept" ? "Accept Permission Request" : "Reject Permission Request",
      message: `Are you sure you want to ${newStatus} ${user.userName}'s permission request?`,
      confirmText: newStatus === "accept" ? "Accept" : "Reject",
    });
  };

  const closeDialog = () => setDialog({ isOpen: false });

  const handleConfirm = async () => {
    try {
      await permissionStore.updatePermissionProj(dialog.permissionId, {
        permissionStatus: dialog.newStatus === "accept" ? "accept" : "rejected",
      });
      await updatePermission(
        permissions.find((p) => p._id === dialog.permissionId).userId,
        dialog.newStatus === "accept" ? "accept" : "rejected"
      );
      closeDialog();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-full mx-auto">
      <h2 className="text-lg font-semibold text-white mb-3">Permission Management</h2>

      {loading ? (
        <p className="text-gray-400 text-center py-2">Loading permissions...</p>
      ) : pendingUsers.length === 0 ? (
        <p className="text-gray-400 text-center py-2">No pending permission requests</p>
      ) : (
        <div className="overflow-x-auto max-h-80">
          <table className="w-full divide-y divide-white/10 text-sm">
            <thead className="bg-black/20">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">User</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Email</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {pendingUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-3 py-2 text-white">{user.userName}</td>
                  <td className="px-3 py-2 text-white">{user.userEmail}</td>
                  <td className="px-3 py-2 flex space-x-2">
                    <button
                      onClick={() => openDialog(user, "accept")}
                      className="bg-green-600/30 text-green-400 px-2 py-1 rounded hover:bg-green-600/40 flex items-center text-xs"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" /> Accept
                    </button>
                    <button
                      onClick={() => openDialog(user, "reject")}
                      className="bg-red-600/30 text-red-400 px-2 py-1 rounded hover:bg-red-600/40 flex items-center text-xs"
                    >
                      <XCircle className="w-3 h-3 mr-1" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationDialog {...dialog} onClose={closeDialog} onConfirm={handleConfirm} />
    </div>
  );
};

export default PermissionManagement;
