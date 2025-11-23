import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectFiles = ({ projectName }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectName) {
      console.warn("Project name prop is missing!");
      return;
    }

    const fetchProjectFiles = async () => {
      console.log("Fetching files for project:", projectName);
      setLoading(true);
      setError("");
      setFiles([]);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/projects/${encodeURIComponent(projectName)}`
        );

        console.log("Backend response:", response.data);

        if (response.data.status === "success") {
          setFiles(response.data.files);
        } else {
          setError(response.data.message || "Failed to fetch project files");
        }
      } catch (err) {
        console.error("Axios error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch project files"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjectFiles();
  }, [projectName]);

  const renderFile = (file) => {
    const extension = file.key.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return (
        <img
          src={file.url}
          alt={file.key}
          className="max-w-full max-h-64 object-contain rounded border mb-2"
        />
      );
    }

    if (["mp4", "webm", "ogg"].includes(extension)) {
      return (
        <video controls className="max-w-full max-h-64 rounded border mb-2">
          <source src={file.url} type={`video/${extension}`} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (["mp3", "wav", "ogg"].includes(extension)) {
      return (
        <audio controls className="mb-2 w-full">
          <source src={file.url} type={`audio/${extension}`} />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (["pdf"].includes(extension)) {
      return (
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-2 block"
        >
          {file.key.split("/").pop()} (PDF)
        </a>
      );
    }

    // Default for other file types
    return (
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mb-2 block"
      >
        {file.key.split("/").pop()}
      </a>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Files for: {projectName || "N/A"}
      </h1>

      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file.key} className="border p-2 rounded">
              
              {renderFile(file)}
              
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No files found for this project.</p>
      )}
    </div>
  );
};

export default ProjectFiles;
