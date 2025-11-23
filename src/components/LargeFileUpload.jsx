import React, { useState } from "react";
import axios from "axios";
import  projectStore  from '../store/projectStore';

const MultipleFileUpload = () => {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [location, setProjectLocation] = useState("");
  const [longitude, setProjectLong] = useState("");
  const [latitude, setProjectLt] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setStatus(" Please enter a project name.");
      return;
    }

    if (files.length === 0) {
      setStatus(" Please select at least one file.");
      return;
    }

    const formData = new FormData();
    const formData2 = new FormData();
    formData.append("projectName", projectName);
    formData2.append("projectId", projectId);
    formData2.append("location", location);
    formData2.append("longitude", longitude);
    formData2.append("latitude", latitude);

    files.forEach((file) => formData.append("file", file));

    setIsUploading(true);
    setStatus("Uploading...");

    try {

      await projectStore.uploadProject(
        projectName,
        projectId,
        location,
        longitude,
        latitude
      )
      const response = await axios.post(
        "http://localhost:5000/api/auth/upload-large-files-website",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(percent);
          },
        }
      );

      setStatus("✅ Uploaded successfully.");
      console.log(response.data);
    } catch (err) {
      setStatus(" Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-xl font-bold text-center mb-4">
        Upload Files to Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* PROJECT NAME */}
        <div>
          <label className="block font-medium mb-1">Project Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="ex: my-project-01"
            value={projectName}
            required
            onChange={(e) => setProjectName(e.target.value)}
          />
          <label className="block font-medium mb-1">Project ID</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="0001"
            value={projectId}
            required
            onChange={(e) => setProjectId(e.target.value)}
          />
          <label className="block font-medium mb-1">Project Location</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="kandy"
            value={location}
            required
            onChange={(e) => setProjectLocation(e.target.value)}
          />
          <label className="block font-medium mb-1">Project Longitude</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="1.23"
            value={longitude}
            required
            onChange={(e) => setProjectLong(e.target.value)}
          />
          <label className="block font-medium mb-1">Project Latitude</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="1.23"
            value={latitude}
            required
            onChange={(e) => setProjectLt(e.target.value)}
          />
        </div>

        {/* FILE INPUT */}
        <label className="block p-6 border-2 border-dashed rounded-xl text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
          <span className="text-gray-600">Click to select files</span>
          <input type="file" multiple className="hidden" onChange={handleFileChange} />
        </label>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl hover:opacity-90"
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </button>
      </form>

      {/* STATUS */}
      {status && <p className="mt-4 font-semibold text-gray-700">{status}</p>}

      {/* PROGRESS BAR */}
      {isUploading && (
        <div className="mt-4">
          <div className="h-3 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

          <p className="text-center mt-1 text-sm">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default MultipleFileUpload;
