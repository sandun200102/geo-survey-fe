
// equipStore.js - Equipment API Store
const API_URL = "http://localhost:5000/api/auth"; // Change this to your API URL

class ProjectStore {
  constructor() {
    this.listeners = [];
    this.state = {
      ProjectList: [],
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
  async uploadProject(projectName, projectId,  location, longitude, latitude) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/upload-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
           projectName, 
            projectId, 
            location, 
            longitude, 
            latitude
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to Upload project');
      }
      
      this.setMessage(data.message || 'project uploaded successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "Error uploading project");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Fetch all projects
  async fetchProject() {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/get-project`, {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch project');
      }
      
      this.setState({ ProjectList: data });
      return data;
    } catch (error) {
      this.setError(error.message || "Failed to fetch project");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }


  // Update project
  async updateProject(id, projectData) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(`${API_URL}/update-project/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projectData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      this.setMessage(data.message || 'project updated successfully');
      return data;
    } catch (error) {
      this.setError(error.message || "Update failed");
      throw error;
    } finally {
      this.setLoading(false);
    }
  }


  // Delete project
async deleteProject(id) {
  this.setLoading(true);
  this.setError(null);

  try {
    const response = await fetch(`${API_URL}/delete-project/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete project');
    }

    // Remove deleted project from local state
    this.setState({
      ProjectList: this.state.ProjectList.filter(project => project._id !== id)
    });

    this.setMessage(data.message || 'Project deleted successfully');
    return data;

  } catch (error) {
    this.setError(error.message || "Failed to delete project");
    throw error;
  } finally {
    this.setLoading(false);
  }
}

  // Get project by ID// Get a single project by ID
async getProjectById(id) {
  this.setLoading(true);
  this.setError(null);

  try {
    const response = await fetch(`${API_URL}/get-project-by-id/${id}`, {
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch project");
    }

    return data; // <-- return project data to frontend component
  } catch (error) {
    this.setError(error.message || "Failed to fetch project");
    throw error;
  } finally {
    this.setLoading(false);
  }
}



}



// Create and export a singleton instance
const projectStore = new ProjectStore();
export default projectStore;