
import { RegisterForm } from "../molecules/RegisterForm";
import NavBar from "../molecules/NavBar";

export const Register = () => {
          return (
                    <div className="flex flex-col min-h-screen">
                              <NavBar />
                              <RegisterForm />
                    </div>
          );
};