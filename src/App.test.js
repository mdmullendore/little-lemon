import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingForm from './components/booking/BookingForm';

// Helper function to render components with router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

// Mock the mock API service
jest.mock('./services/bookingApi', () => ({
  getAvailableTimes: jest.fn(),
  submitBooking: jest.fn(),
  checkTimeAvailability: jest.fn()
}));

test('renders learn react link', () => {
  // App already has a router, so render it directly
  render(<App />);
  // Check for actual content on the page
  expect(screen.getByText('Little Lemon')).toBeInTheDocument();
  expect(screen.getByText('Mediterranean Cuisine')).toBeInTheDocument();
});

test('Renders the BookingForm heading', () => {
  // Mock the required props
  const mockProps = {
    availableTimes: [],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
});

test('Updates the form date value when a date is selected', () => {
  const mockProps = {
    availableTimes: [],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  const input = screen.getByLabelText("Choose date");
  fireEvent.change(input, { target: { value: "2025-08-17" } });
  expect(input).toHaveValue("2025-08-17");
});

test('Updates the form time value when a time is selected', () => {
  const mockProps = {
    availableTimes: [
      { time: "17:00", available: true },
      { time: "18:00", available: true }
    ],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  
  // First select a date to enable the time select
  const dateInput = screen.getByLabelText("Choose date");
  fireEvent.change(dateInput, { target: { value: "2025-08-17" } });
  
  // Now the time select should be enabled
  const timeInput = screen.getByLabelText("Choose time");
  fireEvent.change(timeInput, { target: { value: "17:00" } });
  expect(timeInput).toHaveValue("17:00");
});

test('Updates the form guests value when a number is selected', () => {
  const mockProps = {
    availableTimes: [],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  const input = screen.getByLabelText("Number of guests");
  fireEvent.change(input, { target: { value: "2" } });
  // Number inputs return numbers, not strings
  expect(input).toHaveValue(2);
});

test('Shows loading state when isLoading is true', () => {
  const mockProps = {
    availableTimes: [],
    isLoading: true,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  const timeSelect = screen.getByLabelText("Choose time");
  expect(timeSelect).toBeDisabled();
  expect(screen.getByText("Loading available times...")).toBeInTheDocument();
});

test('Displays available times when provided', () => {
  const mockProps = {
    availableTimes: [
      { time: "17:00", available: true },
      { time: "18:00", available: true },
      { time: "19:00", available: true }
    ],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  
  // Check if time options are rendered
  expect(screen.getByText("17:00")).toBeInTheDocument();
  expect(screen.getByText("18:00")).toBeInTheDocument();
  expect(screen.getByText("19:00")).toBeInTheDocument();
});

test('Shows no times available message when availableTimes is empty', () => {
  const mockProps = {
    availableTimes: [],
    isLoading: false,
    findAvailableTimes: jest.fn()
  };
  
  renderWithRouter(<BookingForm {...mockProps} />);
  
  // Select a date first to trigger the time dropdown
  const dateInput = screen.getByLabelText("Choose date");
  fireEvent.change(dateInput, { target: { value: "2025-08-17" } });
  
  // Check if the "no times available" message is shown
  expect(screen.getByText("No times available for this date")).toBeInTheDocument();
});