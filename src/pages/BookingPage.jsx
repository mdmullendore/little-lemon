import { useReducer, useCallback } from "react";
import BookingForm from "../components/booking/BookingForm";

// Action types for the reducer
const ACTIONS = {
  SET_AVAILABLE_TIMES: 'SET_AVAILABLE_TIMES',
  SET_LOADING: 'SET_LOADING',
  CLEAR_TIMES: 'CLEAR_TIMES'
};

// Initial state for the reducer
const initialState = {
  availableTimes: [],
  isLoading: false
};

// Reducer function
const bookingReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_AVAILABLE_TIMES:
      return { ...state, availableTimes: action.payload, isLoading: false };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.CLEAR_TIMES:
      return { ...state, availableTimes: [], isLoading: false };
    default:
      return state;
  }
};

const BookingPage = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Function to find available times - will be passed to BookingForm
  const findAvailableTimes = useCallback(async (dateString) => {
    if (!dateString) {
      dispatch({ type: ACTIONS.CLEAR_TIMES });
      return;
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Import the API function dynamically
      const { getAvailableTimes } = await import('../services/bookingApi');
      const response = await getAvailableTimes(dateString);
      
      if (response.success) {
        dispatch({ 
          type: ACTIONS.SET_AVAILABLE_TIMES, 
          payload: response.data.availableTimes 
        });
      } else {
        console.error('Failed to fetch available times:', response.error);
        dispatch({ type: ACTIONS.SET_AVAILABLE_TIMES, payload: [] });
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
      dispatch({ type: ACTIONS.SET_AVAILABLE_TIMES, payload: [] });
    }
  }, []);

  return (
    <section>
      <BookingForm 
        availableTimes={state.availableTimes}
        isLoading={state.isLoading}
        findAvailableTimes={findAvailableTimes}
      />
    </section>
  );
};

export default BookingPage;