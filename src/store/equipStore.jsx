
// equipStore.js - Equipment API Store
const API_URL = "http://localhost:5000/api/auth"; // Change this to your API URL

class EquipmentStore {
  constructor() {
    this.listeners = [];
    this.state = {
      equipmentList: [],
      isLoading: false,
      error: null,
      message: null
    };
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of state changes
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Update state
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  // Set loading state
  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  // Set error message
  setError(error) {
    this.setState({ error, message: null });
  }

  // Set success message
  setMessage(message) {
    this.setState({ message, error: null });
  }

  // Clear messages
  clearMessages() {
    this.setState({ error: null, message: null });
  }

  // Upload new equipment
  async uploadEquipment(name, category, status, location, value, description, equipmentId) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/upload-equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          name, 
          category, 
          status, 
          location, 
          value, 
          description, 
          equipmentId 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload equipment');
      }
      
      this.setMessage(data.message || 'Equipment uploaded successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "Error uploading equipment");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Fetch all equipment
  async fetchEquipment() {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/get-all`, {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch equipment');
      }
      
      this.setState({ equipmentList: data });
      return data;
    } catch (error) {
      this.setError(error.message || "Failed to fetch equipment");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Update equipment
  async updateEquipment(id, equipmentData) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/update-equipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(equipmentData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      this.setMessage(data.message || 'Equipment updated successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "Update failed");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Delete equipment
  async deleteEquipment(id) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/delete-equipment/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }
      
      this.setMessage("Equipment deleted successfully");
      return data;
    } catch (error) {
      this.setError(error.message || "Delete failed");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Get current state
  getState() {
    return this.state;
  }

  // Get equipment stats
  getEquipmentStats() {
    const { equipmentList } = this.state;
    
    return {
      total: equipmentList.length,
      available: equipmentList.filter(item => item.status === 'available').length,
      booked: equipmentList.filter(item => item.status === 'booked').length,
      maintenance: equipmentList.filter(item => item.status === 'maintenance').length,
      totalValue: equipmentList.reduce((sum, item) => sum + (item.value || 0), 0)
    };
  }

  // Filter equipment
  filterEquipment(searchTerm = "", statusFilter = "All") {
    const { equipmentList } = this.state;
    
    return equipmentList.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.equipmentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

   // Update equipment image key
  async updateEquipmentImageKey(id, imageData) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/equipment-image-key/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(imageData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      this.setMessage(data.message || 'Equipment image key updated successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "mage key update failed");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }



}



// Create and export a singleton instance
const equipmentStore = new EquipmentStore();
export default equipmentStore;