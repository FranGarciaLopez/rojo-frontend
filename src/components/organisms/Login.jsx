
import { LoginFrom } from "../molecules/LoginFrom";
import NavBar from "../molecules/NavBar";

export const Login = () => {
          return (
                    <div className="flex flex-col min-h-screen">
                              <NavBar />
                              <LoginFrom />
                    </div>
          );
};
