import Buttons from "../atoms/Buttons";
import Label from "../atoms/Label";
import InputText from "../atoms/InputText";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "../atoms/CustomAlert";
import SettingsMenu from "../atoms/SettingsMenu";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "./NavBar";
import AvatarEdit from "../atoms/AvatarEdit";
import Alert from "../atoms/Alert";
import { deleteUser, patchUser } from "../../api/apiService";

export const UserSettingsForm = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [preferedCategory, setPreferedCategory] = useState("");
    const [preferedCity, setPreferedCity] = useState("");
    const [avatar, setAvatar] = useState("");
    const [alert, setAlert] = useState(null); // Unified alert management
    const { user, authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Populate form fields from the user context
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
        };

        try {
            const response = await patchUser(authToken, updatedFields);

            if (response.ok) {
                const data = await response.json(); // Parse JSON if response is okay
                setAlert({ message: data.message, type: "success" });
            } else {
                const errorData = await response.json(); // Parse JSON error response
                setAlert({ message: errorData.message || "Failed to update settings.", type: "error" });
            }
        } catch (error) {
            console.error("Error in handleSaveSettings:", error);
            setAlert({ message: "Error updating settings. Please try again.", type: "error" });
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (confirmation) {
            try {
                const response = await deleteUser(authToken);

                if (response.ok) {
                    // Parse the response for a success message
                    const data = await response.json(); // Correctly parse JSON from the response
                    setAlert({
                        message: data.message || "Account successfully deleted.",
                        type: "success",
                    });

                    // Redirect after showing success message
                    setTimeout(() => {
                        logout();
                        navigate("/login");
                    }, 1000);
                } else {
                    // Parse the response for an error message
                    const errorData = await response.json();
                    setAlert({
                        message: errorData.message || "Failed to delete account. Please try again.",
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
        }
    };


    return (
        <>
            <NavBar />
            <div className="relative">
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

                <div className="centered-elements">
                    <div className="flex flex-col h-full p-6 gap-6 xl:flex-row">
                        {/* Sidebar - Settings Menu */}
                        <SettingsMenu>
                            <i
                                className="fas fa-arrow-left cursor-pointer"
                                onClick={() => navigate(-1)}
                            ></i>
                            <span>Settings</span>
                            <SettingsMenu.Item selected={true} label="Account" />
                            {user?.isAdministrator && (
                                <Link to="/create-event" className="w-full">
                                    <SettingsMenu.Item selected={false} label="Create new event" />
                                </Link>
                            )}
                        </SettingsMenu>

                        {/* Form */}
                        <form>
                            <h2>Account</h2>
                            <p>Update your profile and personal details here</p>

                            <AvatarEdit value={avatar} onAvatarChange={setAvatar}></AvatarEdit>

                            <div className="flex flex-col gap-4 w-full">
                                <Label>First Name</Label>
                                <InputText
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />

                                <Label>Last Name</Label>
                                <InputText
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />

                                <Label>Email</Label>
                                <InputText
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Label>Day of the week</Label>
                                <InputText
                                    type="text"
                                    value={dayOfTheWeek}
                                    onChange={(e) => setDayOfTheWeek(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Preferences */}
                            <h3>Preferences</h3>
                            <div className="flex flex-col gap-4 w-full">
                                <Label>Preferred City</Label>
                                <InputText
                                    type="text"
                                    value={preferedCity}
                                    onChange={(e) => setPreferedCity(e.target.value)}
                                    required
                                />

                                <Label>Preferred Category</Label>
                                <InputText
                                    type="text"
                                    value={preferedCategory}
                                    onChange={(e) => setPreferedCategory(e.target.value)}
                                    required
                                />
                            </div>

                            <Buttons
                                type="submit"
                                value="Save Settings"
                                className="mt-4 bg-blue-600 hover:bg-blue-800"
                                onClick={handleSaveSettings}
                            />
                            <div className="mt-10">
                                <h3>Danger zone</h3>
                                <CustomAlert
                                    variant="error"
                                    title="Delete account"
                                    description=" Permanently remove your account. This action is not reversible."
                                    actions={
                                        <Buttons
                                            type="button"
                                            value="Delete account"
                                            className="bg-red-600 hover:bg-red-800"
                                            onClick={handleDeleteAccount}
                                        />
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
