import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ShieldCheck, ShieldAlert, Loader2, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const AdminManage = () => {
  const {
    allUsers,
    getAllUsers,
    updateAdmin,
    isLoading,
    message,
    error,
    user: currentUser,
  } = useAuthStore();

  const [updatingId, setUpdatingId] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const openPasswordModal = (id, role) => {
    setSelectedAction({ id, role });
    setPassword("");
    setShowPasswordModal(true);
  };

  const handleConfirmPassword = async () => {
    if (!password) return;

    try {
      setUpdatingId(selectedAction.id);
      setShowPasswordModal(false);
      await updateAdmin(selectedAction.id, selectedAction.role, password);
    } finally {
      setUpdatingId(null);
      setSelectedAction(null);
      setPassword("");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-lg font-semibold text-white mb-3">Admin Manager</h2>

      {message && (
        <div className="p-2 bg-green-600/20 text-green-400 rounded mb-2 text-sm">{message}</div>
      )}
      {error && (
        <div className="p-2 bg-red-600/20 text-red-400 rounded mb-2 text-sm">{error}</div>
      )}

      <div className="overflow-x-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg shadow">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-black/20">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-gray-300 font-medium">User</th>
              <th className="px-3 py-2 text-left text-xs text-gray-300 font-medium">Email</th>
              <th className="px-3 py-2 text-left text-xs text-gray-300 font-medium">Role</th>
              <th className="px-3 py-2 text-right text-xs text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {allUsers?.map((user) => (
              <tr key={user._id} className="hover:bg-white/5">
                <td className="px-3 py-2 flex items-center gap-2 text-white">
                  <div className="w-7 h-7 rounded-full bg-blue-600/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-3 py-2 text-white">{user.email}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      user.role === "admin" ? "text-green-400 bg-green-900/20" : "text-gray-300 bg-gray-700/30"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-3 py-2 text-right flex gap-1 justify-end">
                  {!(user.role === "super-admin" && user._id === currentUser._id) && (
                    <>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => openPasswordModal(user._id, "admin")}
                          disabled={updatingId === user._id || showPasswordModal}
                          className="px-2 py-0.5 text-xs rounded bg-blue-600/30 text-blue-400 hover:bg-blue-600/50"
                        >
                          {updatingId === user._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 inline" />} make Admin
                        </button>
                      )}
                      {user.role === "admin" && (
                        <button
                          onClick={() => openPasswordModal(user._id, "user")}
                          disabled={updatingId === user._id || showPasswordModal}
                          className="px-2 py-0.5 text-xs rounded bg-red-600/30 text-red-400 hover:bg-red-600/50"
                        >
                          {updatingId === user._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4 inline" />} make User
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allUsers?.length === 0 && (
          <p className="text-gray-400 text-center py-3 text-sm">No users found</p>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl shadow-lg p-4 w-80">
            <h3 className="text-white font-semibold mb-3">Enter Your Password</h3>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-2 py-1 rounded text-sm text-white bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1 text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPassword}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManage;
