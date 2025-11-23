
// equipStore.js - Equipment API Store
const API_URL = "http://localhost:5000/api/auth"; // Change this to your API URL

class PermissionStore {
  constructor() {
    this.listeners = [];
    this.state = {
      PermissionList: [],
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

  // Upload new Permission
async createPermission({ userId, permissionId, userEmail, projectId, permissionStatus }) {
  this.setLoading(true);
  this.setError(null);

  try {
    const response = await fetch(`${API_URL}/create-permission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId,
        permissionId,
        userEmail,
        projectId,
        permissionStatus
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create permission');
    }

    this.setMessage(data.message || 'permission uploaded successfully');
    return data;
  } catch (error) {
    this.setError(error.message || "Error uploading permission");
    throw error;
  } finally {
    this.setLoading(false);
  }
}


  // Fetch all permission
  async fetchPermission() {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/get-permission`, {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch permission');
      }
      
      this.setState({ PermissionList: data });
      return data;
    } catch (error) {
      this.setError(error.message || "Failed to fetch Permission");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Update Permission
  async updatePermissionProj(id, permissiontData) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/update-permission-proj/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(permissiontData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      this.setMessage(data.message || 'permission updated successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "Update failed");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }


}



// Create and export a singleton instance
const permissionStore = new PermissionStore();
export default permissionStore;