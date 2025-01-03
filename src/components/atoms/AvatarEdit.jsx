import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Alert from "../atoms/Alert";

const AvatarEdit = ({ value, onAvatarChange }) => {
    const [avatarUrl, setAvatarUrl] = useState(value);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [alert, setAlert] = useState(null); // Unified alert management
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
        <div className="relative w-200 h-200">
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

            <div className="flex items-center">
                <img
                    src={previewUrl || avatarUrl}
                    alt=""
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                />

                <div className="flex flex-col space-y-5 sm:ml-8">
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
                        {loading ? "Saving..." : "Save Picture"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarEdit;
