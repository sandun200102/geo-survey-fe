import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	allUsers: [],

	setAuthUser: (user) => set({ user, isAuthenticated: true }),
	setLoading: (loading) => set({ isLoading: loading }),
	setError: (error) => set({ error }),
	setMessage: (message) => set({ message }),

	signup: async (email, password, firstName, lastName, contactNumber, address) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, { 
				email, 
				password, 
				firstName, 
				lastName, 
				contactNumber, 
				address 
			});
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
		console.log(API_URL);
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ 
				user: null, 
				isAuthenticated: false, 
				error: null, 
				isLoading: false,
				allUsers: [] // Clear users on logout
			});
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
			console.error("Authentication check failed:", error);
		}
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending reset password email",
			});
			throw error;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error resetting password",
			});
			throw error;
		}
	},

	removeUser: async (id) => {
		set({ isLoading: true, error: null });
		
		try {
			const response = await axios.delete(`${API_URL}/remove-user/${id}`, {
				withCredentials: true,
			});
			
			if (response.status === 200) {
				// Remove user from local state
				const currentUsers = get().allUsers;
				const updatedUsers = currentUsers.filter(user => user._id !== id);
				set({ 
					allUsers: updatedUsers,
					message: "User removed successfully",
					isLoading: false 
				});
				return response.data;
			}
		} catch (error) {
			const errorMessage = error.response?.data?.message || "User removal failed";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},

	getAllUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/get-users`, {
				withCredentials: true,
			});
			const users = response.data.users;
			set({ allUsers: users, isLoading: false });
			return users;
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Fetch all users failed";
			set({ error: errorMessage, isLoading: false });
			console.error("Fetch all users failed:", error);
			throw error;
		}
	},

	updateUserStatus: async (id, status) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.patch(`${API_URL}/update-user-status/${id}`, 
				{ status },
				{ withCredentials: true }
			);
			
			// Update user in local state
			const currentUsers = get().allUsers;
			const updatedUsers = currentUsers.map(user => 
				user._id === id ? { ...user, status } : user
			);
			
			set({ 
				allUsers: updatedUsers,
				message: `User status updated to ${status}`,
				isLoading: false 
			});
			
			return response.data;
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Failed to update user status";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},

	searchUsers: async (userId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/search-users/${userId}`, {
				withCredentials: true,
			});
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Error retrieving user";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},

	// Filter users locally
	filterUsers: (searchTerm = "", statusFilter = "all") => {
		const { allUsers } = get();
		
		return allUsers.filter(user => {
			const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
							   user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
							   user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
							   `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
			
			const matchesStatus = statusFilter === "all" || user.status === statusFilter;
			
			return matchesSearch && matchesStatus;
		});
	},

	// Clear errors and messages
	clearError: () => set({ error: null }),
	clearMessage: () => set({ message: null }),

	// Reset store
	resetStore: () => set({
		user: null,
		isAuthenticated: false,
		error: null,
		isLoading: false,
		isCheckingAuth: false,
		message: null,
		allUsers: [],
	}),

	updatePermission: async (id, permission) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.patch(`${API_URL}/update-permission/${id}`, 
				{ permission },
				{ withCredentials: true }
			);
			
			// Update user in local state
			const currentUsers = get().allUsers;
			const updatedUsers = currentUsers.map(user => 
				user._id === id ? { ...user, permission } : user
			);
			
			set({ 
				allUsers: updatedUsers,
				message: `Permission is updated to ${permission}`,
				isLoading: false 
			});
			
			return response.data;
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Failed to update permission status";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},

	updateAdmin: async (id, role) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.patch(`${API_URL}/update-role/${id}`, 
				{ role },
				{ withCredentials: true }
			);
			
			// Update user in local state
			const currentUsers = get().allUsers;
			const updatedUsers = currentUsers.map(user => 
				user._id === id ? { ...user, role } : user
			);
			
			set({ 
				allUsers: updatedUsers,
				message: `User status updated to ${role}`,
				isLoading: false 
			});
			
			return response.data;
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Failed to update to admin status";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},


// Sending Emails---------------------------------------------------------

	sendContactEmail: async ( name, email, phone, company, projectType, message ) => {
		set({ isLoading: true, error: null });
				console.log("frontend wda")

		try {
			const response = await axios.post(`${API_URL}/contact-email`, { name, email, phone, company, projectType, message });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending contact email",
			});
			throw error;
		}
	},

	sendBookingEmail: async ( name, email ,phone, startDate, endDate, notes, equipmentId, equipmentName ) => {
		set({ isLoading: true, error: null });
		console.log(name)
		console.log(email)
		console.log(phone)
		console.log(notes)
		try {
			const response = await axios.post(`${API_URL}/booking-email`, { name, email ,phone, startDate, endDate, notes,equipmentId, equipmentName });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending Booking Request email",
			});
			throw error;
		}
	},

	sendPermissionEmail: async ( name, email, projectId, projectName  ) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/permission-email`, { name, email, projectId, projectName });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending Permission Request email",
			});
			throw error;                                                                                                                       


		}
	},

	sendPermissionEmailToUser: async ( name, email, projectName  ) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/permission-email-to-user`, { name, email, projectName });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending Booking Response email to user",
			});
			throw error;
		}
	},

	sendBookingConfirmedEmail: async (  name, email, equipmentName, startDate,endDate ) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/booking-confirmed-email`, { name, email, equipmentName, startDate,endDate  });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error sending Booking response email",
			});
			throw error;
		}
	},

	updateUserBookingStatus: async (id, hasEquipmentBooked) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.patch(
      `${API_URL}/update-user-booking-status/${id}`,
      { hasEquipmentBooked: Boolean(hasEquipmentBooked) }, 
      { 
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update user in local state
    const currentUsers = get().allUsers;
    const updatedUsers = currentUsers.map(user =>
      user._id === id ? { ...user, hasEquipmentBooked: Boolean(hasEquipmentBooked) } : user
    );

    set({
      allUsers: updatedUsers,
      message: `User booking status updated to ${hasEquipmentBooked}`,
      isLoading: false
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update user booking status";
    set({ error: errorMessage, isLoading: false });
    throw error;
  }
    },

	
}));