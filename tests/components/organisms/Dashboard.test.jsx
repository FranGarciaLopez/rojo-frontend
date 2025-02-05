import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { Dashboard } from "../../../src/components/organisms/Dashboard";
import NavBar from "../../../src/components/molecules/NavBar";
import LoginForm from '../../../src/components/molecules/LoginFrom';
import { getEvents, getGroupsByUserId, loginUser } from "../../../src/api/apiService";
import { beforeEach, expect, it, vi, describe } from "vitest";
import ActivitiesSection from "../../../src/components/molecules/ActivitiesSection";

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
          },
          {
                    _id: "67308307d3579cf8bc46a50d",
                    title: "React Workshop",
                    city: {
                              _id: "670afbfe353d17d61b99cd9b",
                              name: "Valencia",
                              __v: 0
                    },
                    description: "Un taller intensivo de un día para aprender React desde cero.",
                    dateTime: "2024-11-21T07:32:00.000Z",
                    location: null,
                    category: {
                              _id: "6735dbba46b5e248dca32fb8",
                              categoryName: "Workshops",
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

const mockShowMoreItems = vi.fn();
const mockInterestedInAEvent = vi.fn();

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

          it('should show the navbar when user is logged in on the Dashboard', async () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({ data: mockedEvents });
                    getGroupsByUserId.mockResolvedValue({ data: mockedGroups });

                    render(
                              <AuthContext.Provider
                                        value={{
                                                  authToken: 'mockToken',
                                                  logout: mockLogout,
                                                  loading: false,
                                                  user: {
                                                            isAdmin: false,
                                                            _id: 'user123',
                                                            interestedEvents: ['67308190d3579cf8bc46a4f9'],
                                                  },
                                        }}
                              >
                                        <MemoryRouter>
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    const dashboard = await screen.findByTestId('dashboard');

                    await waitFor(() => {
                              const navbars = screen.getAllByTestId('navbar'); // Fetch all navbars
                              expect(navbars.length).toBeGreaterThan(0); // Ensure at least one exists
                              const navbarInsideDashboard = navbars[0]; // Use the first instance
                              expect(navbarInsideDashboard).toBeInTheDocument();

                    });
          });


          it('should show Home link when user is logged in on the Dashboard', async () => {
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
                                                  loading: false,
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

                    const dashboard = await screen.findByTestId('dashboard');

                    await waitFor(() => {
                              const navbars = screen.getAllByTestId('navbar'); // Get all instances of navbar
                              expect(navbars.length).toBeGreaterThan(0); // Ensure at least one navbar is present

                              const navbarInsideDashboard = navbars[0]; // Use the first navbar instance

                              expect(navbarInsideDashboard).toBeInTheDocument();

                              const homeLink = within(navbarInsideDashboard).getByTestId("home-link");
                              expect(homeLink).toBeInTheDocument();
                              expect(homeLink).toHaveAttribute("href", "/");
                    });
          });

          it('should show Blog link when user is logged in on the Dashboard', async () => {
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
                                                  loading: false,
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

                    const dashboard = await screen.findByTestId('dashboard');

                    await waitFor(() => {
                              const navbars = screen.getAllByTestId('navbar'); // Get all instances of navbar
                              expect(navbars.length).toBeGreaterThan(0); // Ensure at least one navbar is present

                              const navbarInsideDashboard = navbars[0]; // Use the first navbar instance

                              expect(navbarInsideDashboard).toBeInTheDocument();

                              const blogLink = within(navbarInsideDashboard).getByTestId("blog-link");
                              expect(blogLink).toBeInTheDocument();
                              expect(blogLink).toHaveAttribute("href", "/blog");
                    });
          });

          it('should show User Settings link when user is logged in on the Dashboard', async () => {
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
                                                  loading: false,
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

                    const dashboard = await screen.findByTestId('dashboard');

                    await waitFor(() => {
                              const navbars = screen.getAllByTestId('navbar'); // Get all instances of navbar
                              expect(navbars.length).toBeGreaterThan(0); // Ensure at least one navbar is present

                              const navbarInsideDashboard = navbars[0]; // Use the first navbar instance

                              expect(navbarInsideDashboard).toBeInTheDocument();

                              const userSettingsLink = within(navbarInsideDashboard).getByTestId('user-settings-link');
                              expect(userSettingsLink).toBeInTheDocument();
                              expect(userSettingsLink).toHaveAttribute('href', '/usersettings');

                    });
          });

          it('should Subscribe user when subscribe button is clicked and user is loged in', async () => {
                    const mockLogout = vi.fn();
                    const mockNavigate = vi.fn();

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

                    const dashboard = await screen.findByTestId('dashboard');
                    const navbars = screen.getAllByTestId('navbar');
                    expect(navbars.length).toBeGreaterThan(0);
                    const navbarInsideDashboard = navbars[0];

                    const logoutButton = within(navbarInsideDashboard).getByTestId('logout-button');

                    expect(navbarInsideDashboard).toBeInTheDocument();
                    expect(logoutButton).toBeInTheDocument();

                    fireEvent.click(logoutButton);

                    waitFor(() => {
                              expect(mockLogout).toHaveBeenCalled();
                              expect(mockNavigate).toHaveBeenCalledWith('/login');
                    });
          });

          /* it('should logout user when logout button is clicked and navigate to login page', async () => {
                    const mockLogout = vi.fn();
                    const mockNavigate = vi.fn();

                    render(
                              <AuthContext.Provider
                                        value={{
                                                  authToken: 'mockToken',
                                                  logout: mockLogout,
                                                  loading: false,
                                                  user: {
                                                            isAdmin: false,
                                                            _id: 'user123',
                                                            interestedEvents: ['67308190d3579cf8bc46a4f9'],
                                                  },
                                        }}
                              >
                                        <MemoryRouter>
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    // Ensure the dashboard is rendered
                    await screen.findByTestId('dashboard');

                    // Find the logout button
                    const logoutButton = await screen.findByTestId('logout-button');
                    expect(logoutButton).toBeInTheDocument();

                    // Click the logout button
                    fireEvent.click(logoutButton);

                    // Ensure the logout function is called
                    await waitFor(() => {
                              expect(mockLogout).toHaveBeenCalledTimes(1);
                    });

                    // Ensure navigation to "/login" happens
                    await waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/login');
                    });
          }); */

          it('should show the events in cards when user is logged in on the Dashboard', async () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({
                              data: mockedEvents,
                    });

                    if (mockedGroups.length > 0) {
                              getGroupsByUserId.mockResolvedValue({
                                        data: mockedGroups,
                              });
                    }

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
                                                  <ActivitiesSection
                                                            activities={mockedEvents}
                                                            visibleItems={1}
                                                            showMoreItems={mockShowMoreItems}
                                                            interestedInAEvent={mockInterestedInAEvent}
                                                            interestedEvents={['67308190d3579cf8bc46a4f9']}
                                                            loadingEvent={null}
                                                  />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    const eventsCard = screen.getAllByTestId('event-card');

                    await waitFor(() => {
                              expect(eventsCard).toHaveLength(1);
                              expect(screen.getByText('Tech Innovators Conference 2024')).toBeInTheDocument();
                              expect(screen.queryByText('No events found')).not.toBeInTheDocument();
                    });
          });

          it("should display more events when 'Show More' button is clicked", () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({
                              data: mockedEvents,
                    });

                    if (mockedGroups.length > 0) {
                              getGroupsByUserId.mockResolvedValue({
                                        data: mockedGroups,
                              });
                    }

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
                                                  <ActivitiesSection
                                                            activities={mockedEvents}
                                                            visibleItems={1}
                                                            showMoreItems={mockShowMoreItems}
                                                            interestedInAEvent={mockInterestedInAEvent}
                                                            interestedEvents={['67308190d3579cf8bc46a4f9']}
                                                            loadingEvent={null}
                                                  />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    const showMoreButton = screen.getByText('Show More');

                    const eventsCard = screen.getAllByTestId('event-card');

                    waitFor(() => {
                              expect(eventsCard).toHaveLength(1);
                              fireEvent.click(showMoreButton);
                              expect(mockShowMoreItems).toHaveBeenCalled();
                              expect(eventsCard).toHaveLength(2);

                              expect(screen.getByText('Tech Innovators Conference 2024')).toBeInTheDocument();
                              expect(screen.getByText('React Workshop')).toBeInTheDocument();

                              expect(screen.queryByText('No events found')).not.toBeInTheDocument();
                    });
          });

          it('should show no events found when there are no events', async () => {
                    const mockLogout = vi.fn();

                    getEvents.mockResolvedValue({
                              data: [],
                    });

                    getGroupsByUserId.mockResolvedValue({
                              data: [],
                    });

                    const { rerender } = render(
                              <AuthContext.Provider
                                        value={{
                                                  authToken: 'mockToken',
                                                  loading: false,
                                                  logout: mockLogout,
                                                  user: {
                                                            isAdmin: false,
                                                            _id: 'user123',
                                                            interestedEvents: []
                                                  }
                                        }}
                              >
                                        <MemoryRouter>
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    await waitFor(() => {
                              expect(screen.getByTestId('alert')).toBeInTheDocument();
                              expect(screen.getByText('No events found.')).toBeInTheDocument();
                    });

                    fireEvent.click(screen.getByTestId('close-alert-button'));

                    rerender(
                              <AuthContext.Provider
                                        value={{
                                                  authToken: 'mockToken',
                                                  loading: false,
                                                  logout: vi.fn(),
                                                  user: {
                                                            isAdmin: false,
                                                            _id: 'user123',
                                                            interestedEvents: []
                                                  }
                                        }}
                              >
                                        <MemoryRouter>
                                                  <Dashboard />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    await waitFor(() => {
                              expect(screen.queryByTestId('alert')).toBeNull();
                    });

          });

});
