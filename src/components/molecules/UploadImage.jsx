import { useState } from "react";

function ImageUpload({ setPhotos }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setUploadedImages((prevImages) => [...prevImages, ...images]);
    setPhotos((prevPhotos) => [...prevPhotos, ...images]);
  };
  
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center justify-center w-full h-[50vh]"
    >
      {uploadedImages.length === 0 ? (
        <h3>Drag an image here</h3>
      ) : (
        uploadedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-[50%] object-contain"
          />
        ))
      )}
      {uploadProgress > 0 && isUploading && (
        <div className="mt-2">
          <p>Uploading... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
      {uploadedImages.length === 0 && (
        <div>
          <span className="text-caption font-caption text-subtext-color text-center">
            Supported files: jpg, png, svg
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
