sendBookingEmail: async ( name, email ,phone, startDate, endDate, notes, equipmentId, equipmentName ) => {
        set({ isLoading: true, error: null });
        console.log("frontend wda")
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
    }

    const name="sample"
    const email="sandun2001ms@gmail.com"
await sendBookingEmail(name, email)   