import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../../../src/components/organisms/Dashboard";
import NavBar from "../../../src/components/molecules/NavBar";
import LoginForm from '../../../src/components/molecules/LoginFrom';
import { getEvents, getGroupsByUserId, loginUser } from "../../../src/api/apiService";
import { beforeEach, expect, it, vi, describe } from "vitest";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("../../../src/api/apiService", () => ({
          getEvents: vi.fn(),
          getGroupsByUserId: vi.fn(),
          loginUser: vi.fn(),
}));

vi.mock("../../../src/contexts/AuthContext", async (importOriginal) => {
          const actual = await importOriginal();
          return {
                    ...actual,
                    useAuth: () => ({
                              user: { isAdmin: false },
                              authToken: "mockToken",
                              logout: vi.fn(),
                    }),
          };
});

vi.mock("react-router-dom", async () => {
          const actual = await vi.importActual("react-router-dom");
          return {
                    ...actual,
                    useNavigate: () => mockNavigate,
          };
});

vi.mock("../../../src/components/molecules/NavBar", () => ({
          _esModule: true,
          default: () => (
                    <nav data-testid="navbar">
                              Mock NavBar
                              <button data-testid="logout-button">Logout</button>
                    </nav>
          )
}));

vi.mock("../../../src/components/organisms/Dashboard", () => ({
          _esModule: true,
          default: () => (
                    <div data-testid="dashboard">
                              <nav data-testid="navbar">
                                        Mock NavBar
                                        <button data-testid="logout-button">Logout</button>
                              </nav>
                              <div>Mock Dashboard</div>
                    </div>
          ),
}));

const mockedEvents = [
          {
                    _id: "67308190d3579cf8bc46a4f9",
                    title: "Tech Innovators Conference 2024",
                    city: {
                              _id: "670afbfe353d17d61b99cd9b",
                              name: "Valencia",
                              __v: 0
                    },
                    description: "Un evento para explorar las últimas innovaciones en tecnología, con ponentes destacados y talleres interactivos.",
                    dateTime: "2024-11-21T07:32:00.000Z",
                    location: null,
                    category: {
                              _id: "6735dbba46b5e248dca32fb8",
                              categoryName: "Conferences",
                              parentCategory: null,
                              __v: 0
                    },
                    photos: [
                              "https://res.cloudinary.com/dgxcywc2y/image/upload/v1736250166/siiqn5sdlpomt3tjuyxf.jpg"
                    ],
                    __v: 0
          }
];

const mockedGroups = [
          {
                    _id: "67964b467862960ecb0377c9",
                    Users: [
                              {
                                        _id: "675b1084ec7dbcc8492512af",
                                        firstname: "Fran",
                                        lastname: "Garcia Lopez",
                                        email: "frangalo34@gmail.com"
                              },
                              {
                                        _id: "675b10daec7dbcc8492512c5",
                                        firstname: "Helena",
                                        lastname: "Bleda",
                                        email: "helenablever@gmail.com"
                              }
                    ],
                    messages: [],
                    interestedEvents: [
                              "67308307d3579cf8bc46a50d"
                    ],
                    __v: 0
          }
];

describe("Dashboard Component", () => {

          beforeEach(() => {
                    vi.clearAllMocks();
                    getEvents.mockResolvedValue({ data: mockedEvents });
                    getGroupsByUserId.mockResolvedValue({ data: mockedGroups });
          });

          it('redirects to dashboard if user is already logged in', async () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: { isAdmin: false } }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
                    });
          });


          it('should show logout button when user is logged in on the Dashboard', () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({
                              data: mockedEvents,
                    });

                    getGroupsByUserId.mockResolvedValue({
                              data: mockedGroups,
                    });

                    render(
                              <AuthContext.Provider
                                        value={{
                                                  authToken: 'mockToken',
                                                  logout: mockLogout,
                                                  user: {
                                                            isAdmin: false,
                                                            _id: 'user123',
                                                            interestedEvents: ['67308190d3579cf8bc46a4f9']
                                                  }
                                        }}
                              >
                                        <MemoryRouter>
                                                  <NavBar />
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );
                    const dashboard = screen.getByTestId('dashboard');
                    const navbarInsideDashboard = within(dashboard).getByTestId('navbar');
                    const logoutButton = within(navbarInsideDashboard).getByTestId('logout-button');

                    expect(navbarInsideDashboard).toBeInTheDocument();
                    expect(logoutButton).toBeInTheDocument();
          });

          it('should logout user when logout button is clicked and user is loged in', async () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({
                              data: mockedEvents,
                    });

                    getGroupsByUserId.mockResolvedValue({
                              data: mockedGroups,
                    });

                    render(
                              <AuthContext.Provider value={{
                                        authToken: 'mockToken',
                                        loading: false,
                                        logout: mockLogout,
                                        user: {
                                                  isAdmin: false,
                                                  _id: 'user123',
                                                  interestedEvents: ['67308190d3579cf8bc46a4f9']
                                        }
                              }}>
                                        <MemoryRouter>
                                                  <NavBar />
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    const dashboard = screen.getByTestId('dashboard');
                    const navbarInsideDashboard = within(dashboard).getByTestId('navbar');
                    const logoutButton = within(navbarInsideDashboard).getByTestId('logout-button');

                    expect(navbarInsideDashboard).toBeInTheDocument();
                    expect(logoutButton).toBeInTheDocument();

                    fireEvent.click(logoutButton);

                    waitFor(() => {
                              expect(mockLogout).toHaveBeenCalled();
                              expect(mockNavigate).toHaveBeenCalledWith('/login');
                    });
          });


});
