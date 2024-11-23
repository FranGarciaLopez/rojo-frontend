import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AvatarEdit = ({ value , onAvatarChange}) => {
  console.log("value", value);


  const [avatarUrl, setAvatarUrl] = useState(value );
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    if(!file && !previewUrl){

      setAvatarUrl(value );

    }
   
  }, [value]);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
     
    }
  };

  const handleSaveChanges = async () => {
    if (!file) return alert("Please select a file to upload");
  
    const formData = new FormData();
    formData.append("avatar", file);
  
    try {
      setLoading(true); // Indica que el proceso ha comenzado
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      const data = await response.json();
      if (response.ok) {
        setAvatarUrl(data.avatarUrl);
        onAvatarChange(data.avatarUrl);
  
        setFile(null);
        setPreviewUrl(null);
        alert("Avatar updated successfully");
      } else {
        alert(data.message || "Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("An error occurred while uploading the avatar");
    } finally {
      setLoading(false); // Finaliza el indicador de carga
    }
  };

  /* // Eliminar el avatar actual
  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/delete-avatar", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setAvatarUrl("https://via.placeholder.com/150");
        setFile(null);
        setPreviewUrl(null);
        alert("Avatar deleted successfully");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete avatar");
      }
    } catch (error) {
      console.error("Error deleting avatar:", error);
      alert("Error deleting avatar");
    }
  };*/

  return (
    <div className="relative w-200 h-200">
      <div className="flex items-center">
      <img
      src={previewUrl || avatarUrl }
      alt=""
      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
    />

        <div className="flex flex-col space-y-5 sm:ml-8">
          {}
          <label className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            onClick={handleSaveChanges}
            className="py-3 px-5 bg-blue-500 text-white rounded"
            disabled={loading}
          >
             {loading ? "Saving..." : ""}
            Save Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEdit;
