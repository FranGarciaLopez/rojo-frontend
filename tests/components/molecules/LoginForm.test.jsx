import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import LoginForm from '../../../src/components/molecules/LoginFrom';
import { beforeEach, expect, it, vi, describe } from 'vitest';
import { AuthContext } from '../../../src/contexts/AuthContext';
import { loginUser } from '../../../src/api/apiService';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboardSkeleton from '../../../src/components/skeletons/AdminDashboardSkeleton';
import DashboardSkeleton from '../../../src/components/skeletons/DashboardSkeleton';

vi.mock('../../../src/api/apiService', () => {
          return {
                    loginUser: vi.fn(),
                    getEvents: vi.fn(),
                    getGroupsByUserId: vi.fn(),
          }
});

vi.mock('../../../src/contexts/AuthContext', async (importOriginal) => {

          const actual = await importOriginal();
          return {
                    ...actual,
                    logout: vi.fn()
          }
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

vi.mock('../../../src/components/skeletons/DashboardSkeleton', () => ({
          default: () => <div data-testid="dashboard-skeleton">Mock Dashboard Skeleton</div>
}));

vi.mock('../../../src/components/skeletons/AdminDashboardSkeleton', () => ({
          default: () => <div data-testid="admin-dashboard-skeleton">Mock Admin Dashboard Skeleton</div>
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
          const actual = await vi.importActual('react-router-dom');
          return {
                    ...actual,
                    useNavigate: () => mockNavigate,
                    Link: ({ to, children }) => <a href={to}>{children}</a>
          };
});

describe('LoginForm Component', () => {
          const mockLogin = vi.fn();

          beforeEach(() => {
                    vi.clearAllMocks();
          });

          it('renders input fields and login button', () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
                    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
                    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
          });

          it('redirects to login if user is not logged in', async () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/login');
                    });
          });

          it('should show error message on invalid credentials', async () => {
                    loginUser.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
                    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
                    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

                    await waitFor(() => {
                              expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
                    });
          });

          it('handles successful login and redirects', async () => {
                    loginUser.mockResolvedValue({
                              data: {
                                        token: 'mockToken',
                                        requiresOnboarding: false,
                                        user: { isAdmin: false }
                              }
                    });

                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
                    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test1234' } });
                    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

                    await waitFor(() => {
                              expect(mockLogin).toHaveBeenCalledWith('mockToken', { isAdmin: false });
                              expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
                    });
          });

          it('should show loading dashboard skeleton when loading', () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: true, user: null }}>
                                        <MemoryRouter>
                                                  <DashboardSkeleton />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    expect(screen.getByTestId('dashboard-skeleton')).toBeInTheDocument();
          });


          it('redirects to onboarding if user requires onboarding', async () => {
                    loginUser.mockResolvedValue({
                              data: {
                                        token: 'mockToken',
                                        requiresOnboarding: true,
                                        user: { isAdmin: false }
                              }
                    });

                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'example@gmail.com' } });
                    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
                    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

                    waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/onboarding');
                    });
          });

          it('redirects to admin dashboard if user is admin', async () => {
                    loginUser.mockResolvedValue({
                              data: {
                                        token: 'mockToken',
                                        requiresOnboarding: false,
                                        user: { isAdmin: true }
                              }
                    });

                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: null }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'admin@admin.com' } });
                    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin1234' } });
                    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

                    waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/admin');
                    });
          });

          it('should show loading admin dashboard skeleton when loading', () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: true, user: { isAdmin: true } }}>
                                        <MemoryRouter>
                                                  <AdminDashboardSkeleton />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    expect(screen.getByTestId('admin-dashboard-skeleton')).toBeInTheDocument();
          });

          it('redirects to admin dashboard if user is already logged in and is admin', async () => {
                    render(
                              <AuthContext.Provider value={{ login: mockLogin, loading: false, user: { isAdmin: true } }}>
                                        <MemoryRouter>
                                                  <LoginForm />
                                        </MemoryRouter>
                              </AuthContext.Provider>
                    );

                    waitFor(() => {
                              expect(mockNavigate).toHaveBeenCalledWith('/admin');
                    });
          });

});

