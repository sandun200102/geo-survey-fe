import React, { useState } from 'react';

function ImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {selectedImage && (
        <div>
          <p>Selected Image:</p>
          <img
            src={selectedImage}
            alt="Preview"
            className="w-64 h-auto rounded shadow"
          />
        </div>
      )}
    </div>
  );
}

export default ImageSelector;
