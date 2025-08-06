import React, { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedURL, setUploadedURL] = useState(null);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('No image selected.');
    setUploading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/upload', {
        filename: selectedFile.name,
        filetype: selectedFile.type,
      });

      await axios.put(data.url, selectedFile, {
        headers: { 'Content-Type': selectedFile.type },
      });

      const publicURL = data.url.split('?')[0];
      setUploadedURL(publicURL);
      alert('Upload successful!');
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/30 rounded-2xl shadow-xl space-y-6 transition-all duration-500 hover:shadow-2xl">
      <label className="cursor-pointer block w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleSelectFile}
          className="hidden"
        />
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 text-center text-sm text-white hover:border-blue-500 transition-colors duration-300">
          Click or drag an image to upload
        </div>
      </label>

      {previewURL && (
        <div className="flex flex-col items-center transition-opacity duration-300 animate-fadeIn">
          <p className="text-gray-600 text-sm mb-2">Preview:</p>
          <img
            src={previewURL}
            alt="Preview"
            className="w-64 h-auto rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300
          ${uploading || !selectedFile
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'}
        `}
      >
        {uploading ? 'Uploading...' : 'Upload image'}
      </button>

      {uploadedURL && (
        <div className="text-center mt-4 text-green-600 text-sm break-all animate-fadeIn">
           Uploaded: <a href={uploadedURL} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-800">{uploadedURL}</a>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
