import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Alert from "../atoms/Alert";

const AvatarEdit = ({ value, onAvatarChange }) => {
    const [avatarUrl, setAvatarUrl] = useState(value);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [alert, setAlert] = useState(null);
    const { authToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (!file && !previewUrl) {
            setAvatarUrl(value);
        }
    }, [value, file, previewUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSaveChanges = async () => {
        if (!file) {
            setAlert({ message: "Please select a file to upload", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/upload`, {
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
                setAlert({ message: "Avatar updated successfully", type: "success" });
            } else {
                setAlert({ message: data.message || "Failed to upload avatar", type: "error" });
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
            setAlert({ message: "An error occurred while uploading the avatar", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid place-items-center">
            {/* Alert Section */}
            {alert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                {/* Avatar */}
                <div className="grid place-items-center place-items-center">
                    <img
                        src={previewUrl || avatarUrl}
                        alt="Avatar"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-full ring-4 ring-blue-500"
                    />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col items-center justify-center gap-4">
                    <label className="block w-full text-center py-2 px-6 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
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
                        className={`py-2 px-6 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Picture"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarEdit;
