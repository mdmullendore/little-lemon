import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock useParams
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

// Helper function to render with router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ConfirmationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    mockNavigate.mockClear();
  });

  test('shows loading state initially', () => {
    mockUseParams.mockReturnValue({ confirmationNumber: 'test123' });
    
    const mockOrderData = {
      confirmationNumber: 'test123',
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed'
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrderData));

    renderWithRouter(<ConfirmationPage />);

    expect(screen.getByText('Loading confirmation...')).toBeInTheDocument();
  });

  test('redirects to 404 when no confirmation number in URL', () => {
    mockUseParams.mockReturnValue({});
    
    renderWithRouter(<ConfirmationPage />);
    
    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  test('redirects to 404 when no order data in localStorage', () => {
    mockUseParams.mockReturnValue({ confirmationNumber: 'test123' });
    localStorageMock.getItem.mockReturnValue(null);

    renderWithRouter(<ConfirmationPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  test('redirects to 404 when confirmation number does not match', () => {
    mockUseParams.mockReturnValue({ confirmationNumber: 'test123' });
    
    const mockOrderData = {
      confirmationNumber: 'different123',
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed'
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrderData));

    renderWithRouter(<ConfirmationPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  test('redirects to 404 when localStorage data is invalid JSON', () => {
    mockUseParams.mockReturnValue({ confirmationNumber: 'test123' });
    localStorageMock.getItem.mockReturnValue('invalid json');

    renderWithRouter(<ConfirmationPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });
});
