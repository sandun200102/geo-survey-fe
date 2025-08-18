import React, { useState, useEffect } from "react";
import { 
  Edit3, Trash2, Plus, MapPin, Activity, Package, 
  AlertTriangle, CheckCircle, Clock, Eye, X, Save, 
  Filter, Search, User, Briefcase, Shield, Upload,
  Camera
} from 'lucide-react';
import equipmentStore from '../store/equipStore.jsx';
import UploadImages from '../components/UploadImages';


export default function EquipManagement() {
  // Local component state
  const [storeState, setStoreState] = useState(equipmentStore.getState());
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    location: "",
    value: "",
    description: "",
    equipmentId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // New state for image upload
  const [uploadingItem, setUploadingItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Confirmation dialog state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    type: 'info' // 'info', 'warning', 'danger'
  });

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = equipmentStore.subscribe(setStoreState);
    // Load initial data
    equipmentStore.fetchEquipment();
    
    return unsubscribe;
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (storeState.message || storeState.error) {
      const timer = setTimeout(() => {
        equipmentStore.clearMessages();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [storeState.message, storeState.error]);

  // Confirmation dialog helper
  const showConfirmDialog = (config) => {
    setConfirmationConfig(config);
    setShowConfirmation(true);
  };

  const closeConfirmDialog = () => {
    setShowConfirmation(false);
    setConfirmationConfig({
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: () => {},
      type: 'info'
    });
  };

  // Form handlers
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "", category: "", status: "", location: "", value: "", description: "", equipmentId: ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    const action = editingId ? 'update' : 'add';
    const title = editingId ? 'Update Equipment' : 'Add Equipment';
    const message = editingId 
      ? `Are you sure you want to update "${formData.name}"?`
      : `Are you sure you want to add "${formData.name}" to the inventory?`;

    showConfirmDialog({
      title,
      message,
      confirmText: editingId ? 'Update' : 'Add',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: async () => {
        try {
          if (editingId) {
            // Update equipment
            await equipmentStore.updateEquipment(editingId, formData);
            console.log("id====", editingId);
            console.log("formdata====", formData);
          } else {
            // Add new equipment
            await equipmentStore.uploadEquipment(
              formData.name,
              formData.category,
              formData.status,
              formData.location,
              parseFloat(formData.value),
              formData.description,
              formData.equipmentId
            );
          }
          
          resetForm();
          // Refresh the equipment list
          await equipmentStore.fetchEquipment();
          closeConfirmDialog();
        } catch (err) {
          console.error("Error submitting form:", err);
          closeConfirmDialog();
        }
      }
    });
  };

  const handleDelete = async (item) => {
    showConfirmDialog({
      title: 'Delete Equipment',
      message: `Are you sure you want to delete "${item.name}" (${item.equipmentId})? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        try {
          await equipmentStore.deleteEquipment(item._id);
          // Refresh the equipment list
          await equipmentStore.fetchEquipment();
          closeConfirmDialog();
        } catch (err) {
          console.error("Error deleting equipment:", err);
          closeConfirmDialog();
        }
      }
    });
  };

  const handleEdit = (item) => {
    showConfirmDialog({
      title: 'Edit Equipment',
      message: `Do you want to edit "${item.name}" (${item.equipmentId})?`,
      confirmText: 'Edit',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: () => {
        setFormData({
          name: item.name,
          category: item.category,
          status: item.status,
          location: item.location,
          value: item.value.toString(),
          description: item.description,
          equipmentId: item.equipmentId,
        });
        setEditingId(item._id);
        setShowForm(true);
        closeConfirmDialog();
      }
    });
  };

  const handleAddNew = () => {
    showConfirmDialog({
      title: 'Add New Equipment',
      message: 'Do you want to add new equipment to the inventory?',
      confirmText: 'Continue',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: () => {
        resetForm();
        setShowForm(true);
        closeConfirmDialog();
      }
    });
  };

  const handleViewDetails = (item) => {
    showConfirmDialog({
      title: 'View Equipment Details',
      message: `Do you want to view details for "${item.name}" (${item.equipmentId})?`,
      confirmText: 'View',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: () => {
        setViewingItem(item);
        closeConfirmDialog();
      }
    });
  };

  // New handler for image upload with confirmation
  const handleUploadImages = (item) => {
    showConfirmDialog({
      title: 'Upload Images',
      message: `Do you want to upload images for "${item.name}" (${item.equipmentId})?`,
      confirmText: 'Upload',
      cancelText: 'Cancel',
      type: 'info',
      onConfirm: () => {
        setUploadingItem(item);
        setShowUploadModal(true);
        closeConfirmDialog();
      }
    });
  };

  const closeUploadModal = () => {
    setUploadingItem(null);
    setShowUploadModal(false);
  };

  // Utility functions
  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'booked': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'maintenance': return <X className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'booked': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'maintenance': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getConfirmationColors = (type) => {
    switch (type) {
      case 'danger':
        return {
          confirmBtn: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
          icon: 'text-red-400',
          border: 'border-red-500/30'
        };
      case 'warning':
        return {
          confirmBtn: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500',
          icon: 'text-yellow-400',
          border: 'border-yellow-500/30'
        };
      default:
        return {
          confirmBtn: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500',
          icon: 'text-emerald-400',
          border: 'border-emerald-500/30'
        };
    }
  };

  // Get filtered data and stats from store
  const filteredEquipment = equipmentStore.filterEquipment(searchTerm, statusFilter);
  const equipmentStats = equipmentStore.getEquipmentStats();

  return (
    <div className="min-h-screen bg-transparent">     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Equipment Management
            </h1>
            <p className="text-white/60 mt-2">Manage geological survey equipment and assets</p>
          </div>
          
          <button
            onClick={handleAddNew}
            className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-blue-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Equipment
          </button>
        </div>

        {/* Messages */}
        {storeState.message && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <p className="text-green-300">{storeState.message}</p>
          </div>
        )}
        
        {storeState.error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-300">{storeState.error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {storeState.isLoading && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-blue-300/20 border-t-blue-300 rounded-full animate-spin mr-3"></div>
              <p className="text-blue-300">Processing...</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-emerald-400 mr-3" />
              <div>
                <p className="text-white/60 text-sm">Total Equipment</p>
                <p className="text-2xl font-bold text-white">{equipmentStats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-white/60 text-sm">Available</p>
                <p className="text-2xl font-bold text-white">{equipmentStats.available}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
              <div>
                <p className="text-white/60 text-sm">Booked</p>
                <p className="text-2xl font-bold text-white">{equipmentStats.booked}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center">
              <X className="w-8 h-8 text-red-400 mr-3" />
              <div>
                <p className="text-white/60 text-sm">Maintenance</p>
                <p className="text-2xl font-bold text-white">{equipmentStats.maintenance}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <p className="text-white/60 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-white">Rs.{(equipmentStats.totalValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search equipment by name, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-12 text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-2 ">
              <Filter className="w-5 h-5 text-white"  />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black/30 border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
              >
                <option value="All">All Status</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
               
              </select>
            </div>
          </div>
        </div>

        {/* Equipment List */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">
              Equipment Inventory ({filteredEquipment.length} items)
            </h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {filteredEquipment.length === 0 ? (
              <div className="p-8 text-center text-white/60">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  {storeState.equipmentList.length === 0 
                    ? "No equipment data found. Add some equipment to get started!" 
                    : "No equipment found matching your criteria."
                  }
                </p>
              </div>
            ) : (
              filteredEquipment.map((item) => (
                <div key={item._id} className="p-6 hover:bg-gray-900 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(item.status)}
                        <h3 className="text-lg font-semibold text-blue-600">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-white/70">
                        <div>
                          <span className="text-red-600">Category:</span> {item.category}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-amber-300" />
                          {item.location}
                        </div>
                        <div>
                          <span className="text-blue-300">ID:</span> {item.equipmentId}
                        </div>
                        <div>
                          <span className="text-blue-400">Value:</span> ${item.value?.toLocaleString() || 'N/A'}
                        </div>
                      </div>
                      
                      <p className="text-white/60 text-sm mt-2">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-all duration-300"
                        title="Edit Equipment"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUploadImages(item)}
                        className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
                        title="Upload Images"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                        title="Delete Equipment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              {confirmationConfig.type === 'danger' && <AlertTriangle className={`w-6 h-6 ${getConfirmationColors(confirmationConfig.type).icon}`} />}
              {confirmationConfig.type === 'warning' && <AlertTriangle className={`w-6 h-6 ${getConfirmationColors(confirmationConfig.type).icon}`} />}
              {confirmationConfig.type === 'info' && <CheckCircle className={`w-6 h-6 ${getConfirmationColors(confirmationConfig.type).icon}`} />}
              <h3 className="text-xl font-bold text-white">{confirmationConfig.title}</h3>
            </div>
            
            <p className="text-white/70 mb-6">{confirmationConfig.message}</p>
            
            <div className="flex space-x-3">
              <button
                onClick={confirmationConfig.onConfirm}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${getConfirmationColors(confirmationConfig.type).confirmBtn}`}
              >
                {confirmationConfig.confirmText}
              </button>
              <button
                onClick={closeConfirmDialog}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
              >
                {confirmationConfig.cancelText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Equipment Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-600">
                {editingId ? 'Update Equipment' : 'Add New Equipment'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Equipment Name *</label>
                  <input
                    name="name"
                    placeholder="Enter equipment name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Equipment ID *</label>
                  <input
                    name="equipmentId"
                    placeholder="Enter equipment ID"
                    value={formData.equipmentId}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  >
                    <option value="">Select category</option>
                    <option value="Seismic Equipment">Seismic Equipment</option>
                    <option value="GPR Equipment">GPR Equipment</option>
                    <option value="Sampling Equipment">Sampling Equipment</option>
                    <option value="Magnetic Equipment">Magnetic Equipment</option>
                    <option value="Survey Tools">Survey Tools</option>
                    <option value="Analysis Equipment">Analysis Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  >
                    <option value="">Select status</option>
                    <option value="available">available</option>
                    <option value="booked">booked</option>
                    <option value="maintenance">maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Location *</label>
                  <input
                    name="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Value (Rs.) *</label>
                  <input
                    name="value"
                    type="number"
                    placeholder="Enter value"
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
               
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Description *</label>
                <textarea
                  name="description"
                  placeholder="Enter equipment description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300 resize-none"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={storeState.isLoading}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                >
                  {storeState.isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {editingId ? 'Update Equipment' : 'Add Equipment'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          
        </div>
        
      )}

      {/* View Equipment Modal */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Equipment Details</h2>
              <button
                onClick={() => setViewingItem(null)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {getStatusIcon(viewingItem.status)}
                <h3 className="text-xl font-semibold text-blue-600">{viewingItem.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(viewingItem.status)}`}>
                  {viewingItem.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/50 text-sm">Equipment ID</p>
                  <p className="text-white font-medium">{viewingItem.equipmentId}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Category</p>
                  <p className="text-white font-medium">{viewingItem.category}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {viewingItem.location}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Value</p>
                  <p className="text-white font-medium">Rs.{viewingItem.value?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>

              <div>
                <p className="text-white/50 text-sm mb-2">Description</p>
                <p className="text-white/80">{viewingItem.description}</p>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setViewingItem(null);
                    handleEdit(viewingItem);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit Equipment
                </button>
                <button
                  onClick={() => {
                    setViewingItem(null);
                    handleUploadImages(viewingItem);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Images
                </button>
                <button
                  onClick={() => setViewingItem(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
                
      )}

      {/* Upload Images Modal */}
      {showUploadModal && uploadingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-4xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Upload Images</h2>
                <p className="text-white/60 mt-1">
                  Equipment: {uploadingItem.name} ({uploadingItem.equipmentId})
                </p>
              </div>
              <button
                onClick={closeUploadModal}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <UploadImages 
                eqId={uploadingItem._id}
                onUploadComplete={() => {  
                  console.log('Images uploaded successfully for:', uploadingItem.name);
                }}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10 mt-6">
              <button
                onClick={closeUploadModal}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}