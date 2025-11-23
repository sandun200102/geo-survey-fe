import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Adjust as needed

const useBookingStore = create((set, get) => ({
  // State
  bookings: [],
  currentBooking: null,
  userBookings: [],
  loading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Create new booking
  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      // Add new booking to the list
      set((state) => ({
        bookings: [data.booking, ...state.bookings],
        loading: false,
        error: null,
      }));

      return { success: true, booking: data.booking };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Get all bookings
  getAllBookings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/get-all-bookings`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
      }

      set({
        bookings: data.bookings || [],
        loading: false,
        error: null,
      });

      return { success: true, bookings: data.bookings };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/get-booking-id/${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch booking');
      }

      set({
        currentBooking: data.booking,
        loading: false,
        error: null,
      });

      return { success: true, booking: data.booking };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Get bookings by user ID
  getBookingsByUserId: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/get-booking-user/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user bookings');
      }

      set({
        userBookings: data.bookings || [],
        loading: false,
        error: null,
      });

      return { success: true, bookings: data.bookings };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/update-booking-status/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update booking');
      }

      // Update booking in the state
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === bookingId ? data.booking : booking
        ),
        userBookings: state.userBookings.map((booking) =>
          booking._id === bookingId ? data.booking : booking
        ),
        currentBooking: state.currentBooking && state.currentBooking._id === bookingId 
          ? data.booking 
          : state.currentBooking,
        loading: false,
        error: null,
      }));

      return { success: true, booking: data.booking };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Delete booking (if you want to add this functionality)
  deleteBooking: async (bookingId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete booking');
      }

      // Remove booking from state
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== bookingId),
        userBookings: state.userBookings.filter((booking) => booking._id !== bookingId),
        currentBooking: state.currentBooking && state.currentBooking._id === bookingId 
          ? null 
          : state.currentBooking,
        loading: false,
        error: null,
      }));

      return { success: true };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Filter bookings by status
  getBookingsByStatus: (status) => {
    const { bookings } = get();
    return bookings.filter((booking) => 
      booking.status.toLowerCase() === status.toLowerCase()
    );
  },

  // Get booking statistics
  getBookingStats: () => {
    const { bookings } = get();
    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
    };
  },

  // Reset store
  resetStore: () => set({
    bookings: [],
    currentBooking: null,
    userBookings: [],
    loading: false,
    error: null,
  }),
}));

export default useBookingStore;