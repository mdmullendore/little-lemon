import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingPage from './BookingPage';

// Mock the mock API service
jest.mock('../services/bookingApi', () => ({
  getAvailableTimes: jest.fn()
}));

// Helper function to render with router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BookingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders BookingForm component', () => {
    renderWithRouter(<BookingPage />);
    
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  test('passes required props to BookingForm', () => {
    renderWithRouter(<BookingPage />);
    
    // Check that the form renders with initial state
    expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
  });

  test('time select is disabled initially when no date is selected', () => {
    renderWithRouter(<BookingPage />);
    
    const timeSelect = screen.getByLabelText('Choose time');
    expect(timeSelect).toBeDisabled();
  });

  test('shows "Please select a date first" message initially', () => {
    renderWithRouter(<BookingPage />);
    
    const timeSelect = screen.getByLabelText('Choose time');
    expect(timeSelect).toHaveDisplayValue('Please select a date first');
  });
});
