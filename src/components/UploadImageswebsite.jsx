import { useState } from "react";
import useImageStore from '../store/imageStore.jsx';


export default function UploadImageswebsite() {
  const {uploadImageTosite} = useImageStore()
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleFiles = (selectedFiles) => {
    if (selectedFiles.length + files.length > 2) {
      alert("You can upload a maximum of 2 files");
      return;
    }

    const filteredFiles = Array.from(selectedFiles).filter((file) =>
      validTypes.includes(file.type)
    );

    if (filteredFiles.length !== selectedFiles.length) {
      alert("Only PNG, JPG, and JPEG files are allowed");
      return;
    }

    setFiles((prev) => [...prev, ...filteredFiles]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      setUploading(true);
      setError(null);
      setResults(null);

      const res = await fetch("http://localhost:5000/api/auth/upload", {
        method: "POST",
        body: formData,
      });


      const data = await res.json();
      if (res.ok) {
        setResults(data.results);
        console.log("Uploaded image keys:", data.results.map(file => file.Key)[0]);
        const imkey = data.results.map(file => file.Key)[0]
        const bucketName = data.results.map(file => file.Bucket)[0]
        await uploadImageTosite(imkey,bucketName)
        setFiles([]);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-white/30 shadow-lg rounded-xl p-8 ">
        <h1 className="text-2xl font-bold mb-4">Upload Images</h1>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleDrop}
        >
          <p className="text-gray-500">Drag & drop your images here</p>
          <p className="text-gray-400 text-sm">or click to browse</p>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Browse Files
          </label>
        </div>

        {/* Previews */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {files.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  onClick={() => handleRemoveFile(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-4 px-4 py-2 rounded-md text-white w-full ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Uploaded Results
        {results && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Files:</h2>
            <ul className="list-disc pl-5">
              {results.map((file, idx) => (
                <li key={idx}>
                  <a
                    href={file.Location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {file.Key}
                  </a>
                  <br />
                  <img
                    src={file.Location}
                    alt={file.Key}
                    className="mt-2 max-w-xs rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}