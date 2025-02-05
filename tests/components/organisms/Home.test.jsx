import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../../../src/components/organisms/Home";

vi.mock("../../../src/components/molecules/NavBar", () => ({
          default: () => <nav data-testid="navbar">Mock NavBar</nav>,
}));

vi.mock("../../../src/components/molecules/LoginForm", () => ({
          default: () => <form data-testid="login-form">Mock LoginForm</form>,
}));

describe("Login Component", () => {
          it("should render Hero Section and Footer", () => {
                    render(
                              <MemoryRouter>
                                        <AuthContext.Provider value={{ authToken: null, logout: vi.fn(), user: null }}>
                                                  <Home />
                                        </AuthContext.Provider>
                              </MemoryRouter>
                    );

                    expect(screen.getByTestId("hero")).toBeInTheDocument();
                    expect(screen.getByTestId("footer")).toBeInTheDocument();
          });
});
