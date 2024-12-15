import { useState } from "react";


function ImageUpload({ setPhotos }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const images = files.filter(file => file.type.startsWith("image/"));
    setUploadedImages((prevImages) => [...prevImages, ...images]);
    setPhotos((prevPhotos) => [...prevPhotos, ...images]);  
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();

    uploadedImages.forEach((file) => formData.append("photos", file));

    try {
      const response = await fetch("http://localhost:3000/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded successfully:", data);
        setUploadedImages([]); 
        setPhotos([]);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setIsUploading(false);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3>Drag an image here</h3>
      {uploadedImages.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt="preview"
          style={{ width: "100px", marginTop: "10px" }}
        />
      ))}
      {isUploading && (
        <div style={{ marginTop: "10px" }}>
          <p>Subiendo... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
      <button
        onClick={handleUpload}
      
        disabled={isUploading || uploadedImages.length === 0}
      >
      
      </button>
      <div>
        <span className="text-caption font-caption text-subtext-color text-center">
          Supported files: jpg, png, svg
        </span>
      </div>
    </div>
  );
}

export default ImageUpload;