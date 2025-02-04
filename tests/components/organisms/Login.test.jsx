import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../../src/components/organisms/Login";

vi.mock("../../../src/components/molecules/NavBar", () => ({
          default: () => <nav data-testid="navbar">Mock NavBar</nav>,
}));

vi.mock("../../../src/components/molecules/LoginForm", () => ({
          default: () => <form data-testid="login-form">Mock LoginForm</form>,
}));

describe("Login Component", () => {
          it("should render NavBar and LoginForm", () => {
                    render(
                              <MemoryRouter>
                                        <AuthContext.Provider value={{ authToken: null, logout: vi.fn(), user: null }}>
                                                  <Login />
                                        </AuthContext.Provider>
                              </MemoryRouter>
                    );

                    expect(screen.getByTestId("navbar")).toBeInTheDocument();
                    expect(screen.getByTestId("login-form")).toBeInTheDocument();
          });
});
