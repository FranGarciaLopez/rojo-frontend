
import { UserSettingsForm } from "../molecules/UserSettingsForm";
import NavBar from "../molecules/NavBar";

export const UserSettings = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <UserSettingsForm></UserSettingsForm>
        </div>
    );
};