import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { patchUser, deleteUser } from "../../api/apiService";
import CustomAlert from "@/components/atoms/CustomAlert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import AvatarEdit from "@/components/molecules/AvatarEdit";
import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export const UserSettingsForm = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [preferedCategory, setPreferedCategory] = useState("");
    const [preferedCity, setPreferedCity] = useState("");
    const [avatar, setAvatar] = useState("");
    const [alert, setAlert] = useState(null);

    const { user, authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname || "");
            setLastname(user.lastname || "");
            setEmail(user.email || "");
            setDayOfTheWeek(user.dayOfTheWeek || "");
            setPreferedCategory(user.categoryName?.categoryName || "");
            setPreferedCity(user.preferedCity?.name || "");
            setAvatar(user.avatar || "");
        }
    }, [user]);

    const handleSaveSettings = async (e) => {
        e.preventDefault();

        const updatedFields = {
            firstname,
            lastname,
            email,
            dayOfTheWeek,
            preferedCategory,
            preferedCity,
            avatar,
        };

        try {
            const response = await patchUser(authToken, updatedFields);

            if (response.ok) {
                const data = await response.json();
                setAlert({ message: data.message, type: "success" });
            } else {
                const errorData = await response.json();
                setAlert({
                    message: errorData.message || "Failed to update settings.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error in handleSaveSettings:", error);
            setAlert({
                message: "Error updating settings. Please try again.",
                type: "error",
            });
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await deleteUser(authToken);

            if (response.ok) {
                const data = await response.json();
                setAlert({
                    message: data.message || "Account successfully deleted.",
                    type: "success",
                });

                setTimeout(() => {
                    logout();
                    navigate("/login");
                }, 1000);
            } else {
                const errorData = await response.json();
                setAlert({
                    message: errorData.message || "Failed to delete account.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error in handleDeleteAccount:", error);
            setAlert({
                message: "Error deleting your account. Please try again later.",
                type: "error",
            });
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setAvatar(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-7xl w-full mx-auto flex-shrink-0 py-10">
            {alert && (
                <Alert
                    variant={
                        alert.type === "success"
                            ? "success"
                            : alert.type === "error"
                                ? "destructive"
                                : "default"
                    }
                    className="mb-4"
                    onClose={() => setAlert(null)}
                >
                    {alert.message}
                </Alert>
            )}

            {/* Back Button */}
            <div className="flex items-center gap-2 mb-6">
                <Link
                    to="/dashboard"
                    className="text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200 ease-in-out px-4 py-2"
                >
                    {/* SVG Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </Link>
            </div>

            {/* Settings Form */}
            <Card className="border-none shadow-none max-w-7xl px-6 xl:px-2 py-8">
                <CardContent className="space-y-6 px-0">
                    <form onSubmit={handleSaveSettings} className="space-y-3">
                        <h2 className="text-2xl font-bold">Account Settings</h2>
                        <p className="text-gray-500">
                            Update your profile and personal details.
                        </p>

                        {/* Avatar */}
                        <div className="flex items-center gap-4 justify-center w-full">
                            <AvatarEdit value={avatar} onAvatarChange={setAvatar} />
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                                id="upload-avatar"
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Day of the Week */}
                        <div>
                            <Label>Day of the Week</Label>
                            <Input
                                type="text"
                                value={dayOfTheWeek}
                                onChange={(e) => setDayOfTheWeek(e.target.value)}
                            />
                        </div>

                        {/* Prefered Category */}
                        <div>
                            <Label>Prefered Category</Label>
                            <Input
                                type="text"
                                value={preferedCategory}
                                onChange={(e) => setPreferedCategory(e.target.value)}
                            />
                        </div>

                        {/* Prefered City */}
                        <div>
                            <Label>Prefered City</Label>
                            <Input
                                type="text"
                                value={preferedCity}
                                onChange={(e) => setPreferedCity(e.target.value)}
                            />
                        </div>

                        {/* Save Button */}
                        <Button type="submit" className="w-full">
                            Save Settings
                        </Button>

                    </form>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <div className="px-6 xl:px-2 py-2">
                <h3 className="mb-2">Danger zone</h3>
                <CustomAlert
                    variant="error"
                    description="Permanently remove your account. This action is not reversible."
                    actions={
                        <Dialog>
                            <DialogTitle className="mb-2">Delete Account</DialogTitle>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Delete Account</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                                <DialogFooter>
                                    <Button
                                        onClick={handleDeleteAccount}
                                        variant="destructive"
                                    >
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                />
            </div>
        </div >
    );
};
