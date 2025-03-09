import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminDashboard } from '../../../src/components/organisms/AdminDashboard';
import { AuthContext } from "../../../src/contexts/AuthContext";
import { getUsers, getEvents, deleteUserByAdmin } from '../../../src/api/apiService';
import { MemoryRouter } from 'react-router-dom';


vi.mock('../../../src/api/apiService', () => ({
          getUsers: vi.fn(),
          getEvents: vi.fn(),
          deleteUserByAdmin: vi.fn(),
}));

const mockLogout = vi.fn();

const mockAuthContext = {
          authToken: 'mockToken',
          logout: mockLogout,
          loading: false,
          user: {
                    isAdmin: false,
                    _id: 'user123',
                    interestedEvents: ['67308190d3579cf8bc46a4f9'],
          },
};

const mockedEvents = [
          {
                    id: 'eventId',
                    title: 'Event Name',
                    city: 'City',
                    dateTime: '2021-12-12 12:00:00',
                    category: 'Category',
                    location: 'Location',
                    description: 'Description',
          },
          {
                    id: 'eventId2',
                    title: 'Event Name 2',
                    city: 'City 2',
                    dateTime: '2021-12-12 12:00:00',
                    category: 'Category 2',
                    date: '2021-12-12',
                    location: 'Location',
                    description: 'Description',
          }
];

const mockedUsers = [
          {
                    id: 'userId',
                    firstname: 'Fran',
                    lastname: 'Galo',
                    email: 'frangalo34@gmail.com',
                    isAdministrator: false,
                    organizedEvents: 0,
          },
          {
                    id: 'userId2',
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'email2@gmail.com',
                    isAdministrator: false,
                    organizedEvents: 0,
          },
];

describe('AdminDashboard Tests', () => {
          beforeEach(() => {
                    vi.resetAllMocks();
          });

          it('should render AdminDashboard', async () => {

                    getUsers.mockResolvedValueOnce({ data: { users: mockedUsers } });
                    getEvents.mockResolvedValueOnce({ data: mockedEvents });


                    render(
                              <MemoryRouter>
                                        <AuthContext.Provider value={mockAuthContext}>
                                                  <AdminDashboard />
                                        </AuthContext.Provider>
                              </MemoryRouter>
                    );

                    await waitFor(() => {
                              expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
                              expect(screen.getByText('Analytics')).toBeInTheDocument();
                              expect(screen.getByText('Events')).toBeInTheDocument();
                              expect(screen.getByText('Users')).toBeInTheDocument();
                              expect(screen.getByTestId('users-table')).toBeInTheDocument();
                              expect(screen.getByTestId('events-table')).toBeInTheDocument();
                    });
          });

          it("should render users table with users", async () => {
                    // Mock API responses
                    getUsers.mockResolvedValue({
                              data: {
                                        users: mockedUsers,
                              },
                    });

                    render(
                              <MemoryRouter>
                                        <AuthContext.Provider value={mockAuthContext}>
                                                  <AdminDashboard />
                                        </AuthContext.Provider>
                              </MemoryRouter>
                    );

                    // Wait for the table to be in the document
                    const table = await screen.findByTestId("users-table");
                    expect(table).toBeInTheDocument();

                    for (const user of mockedUsers) {
                              // Allow multiple elements by using getAllByText()
                              const nameElements = await screen.findAllByText(
                                        (content) => content.includes(user.firstname) && content.includes(user.lastname)
                              );
                              expect(nameElements.length).toBeGreaterThan(0);

                              const emailElements = await screen.findAllByText(user.email);
                              expect(emailElements.length).toBeGreaterThan(0);
                    }

                    // Check if users are in the table
                    const rows = await screen.findAllByRole("row");
                    expect(rows.length).toBeGreaterThan(1);
                    expect(rows.length).toBe(mockedUsers.length + 2); // +1 for header row
          });

          it('should render events table with events', async () => {
                    getEvents.mockResolvedValueOnce({
                              data: {
                                        events: mockedEvents
                              }
                    });

                    render(
                              <MemoryRouter>
                                        <AuthContext.Provider value={mockAuthContext}>
                                                  <AdminDashboard />
                                        </AuthContext.Provider>
                              </MemoryRouter>
                    );

                    /* await waitFor(() => expect(getEvents).toHaveBeenCalled()); */

                    const table = await screen.findByTestId('events-table');

                    await waitFor(() => {
                              for (const event of mockedEvents) {
                                        const nameElements = screen.getAllByText(event.title);
                                        expect(nameElements.length).toBeGreaterThan(0);

                                        const cityElements = screen.getAllByText(event.city);
                                        expect(cityElements.length).toBeGreaterThan(0);

                                        const categoryElements = screen.getAllByText(event.category);
                                        expect(categoryElements.length).toBeGreaterThan(0);

                                        const locationElements = screen.getAllByText(event.location);
                                        expect(locationElements.length).toBeGreaterThan(0);

                                        const dateTimeElements = screen.getAllByText(event.dateTime);
                                        expect(dateTimeElements.length).toBeGreaterThan(0);
                              }

                              const rows = screen.getAllByRole('row');
                              expect(rows.length).toBeGreaterThan(1);
                              expect(rows.length).toBe(mockedEvents.length + 2);
                    });
          });
});
