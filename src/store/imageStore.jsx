import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Adjust as needed

const useImageStore = create((set ) => ({
    // State
  images: [],
  currentImage: null,
  loading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  uploadImageTosite: async (imageKey, bucketName) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/upload-images-website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageKey, bucketName})
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image details');
      }

      // Add new booking to the list
      set((state) => ({
        images: [data.image, ...state.images],
        loading: false,
        error: null,
      }));

      return { success: true, image: data.image };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  }
}

))

export default useImageStore;