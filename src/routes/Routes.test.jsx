import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

// Helper function to render with router context
const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Routes', () => {
  test('renders HomePage at root route', () => {
    renderWithRouter(<Routes />, { route: '/' });
    
    // Check for actual content on the home page
    expect(screen.getByText('Little Lemon')).toBeInTheDocument();
    expect(screen.getByText('Mediterranean Cuisine')).toBeInTheDocument();
  });

  test('renders BookingPage at /bookings route', () => {
    renderWithRouter(<Routes />, { route: '/bookings' });
    
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  test('renders ConfirmationPage at /confirmation/:confirmationNumber route', () => {
    // Mock localStorage to return valid data
    const mockOrderData = {
      confirmationNumber: 'test123',
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed'
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(mockOrderData)),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    renderWithRouter(<Routes />, { route: '/confirmation/test123' });
    
    expect(screen.getByText('✓ Reservation Confirmed!')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', () => {
    renderWithRouter(<Routes />, { route: '/unknown-route' });
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/The page you're looking for doesn't exist/)).toBeInTheDocument();
  });

  test('404 page has return to home link', () => {
    renderWithRouter(<Routes />, { route: '/unknown-route' });
    
    const homeLink = screen.getByText('Return to Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
