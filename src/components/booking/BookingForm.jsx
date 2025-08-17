import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { submitBooking } from '../../services/bookingApi';

const BookingForm = ({ availableTimes, isLoading, findAvailableTimes }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = yup.object({
    date: yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
    time: yup.string().required('Time is required'),
    guests: yup.number()
      .required('Number of guests is required')
      .min(1, 'Minimum 1 guest')
      .max(10, 'Maximum 10 guests')
      .integer('Must be a whole number'),
    occasion: yup.string().optional()
  });

  // Fetch available times when date changes
  useEffect(() => {
    if (formData.date) {
      findAvailableTimes(formData.date);
    } else {
      // Clear time selection when date is cleared
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.date, findAvailableTimes]);

  // Clear time selection if the previously selected time is no longer available
  useEffect(() => {
    if (formData.time && availableTimes.length > 0 && !availableTimes.find(t => t.time === formData.time)) {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [availableTimes, formData.time]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleBlur = (fieldId) => {
    setTouched(prev => ({
      ...prev,
      [fieldId]: true
    }));
  };

  const validateField = async (fieldId, value) => {
    try {
      await validationSchema.validateAt(fieldId, { [fieldId]: value });
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: error.message
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsSubmitting(true);
      
      const response = await submitBooking(formData);
      if (response.success) {
        console.log('Booking submitted successfully:', response.data);
        // Store order data in local storage
        localStorage.setItem('orderData', JSON.stringify(response.data));
        // Navigate to ConfirmationPage
        navigate(`/confirmation/${response.data.confirmationNumber}`);
      } else {
        alert(`Booking failed: ${response.error}`);
      }
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldId) => {
    return touched[fieldId] && errors[fieldId] ? errors[fieldId] : '';
  };

  return (
    <div style={{ padding: "2rem 2rem 4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#495E57", 
        marginTop: 0,
        marginBottom: "2rem",
        fontSize: "2.5rem",
        fontWeight: "600",
        fontFamily: 'Markazi Text'
      }}>
        Book Now
      </h1>
      <form onSubmit={handleSubmit} style={{ 
        display: "grid", 
        gap: "1rem",
        padding: "2rem",
        backgroundColor: "#f1f1f1",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <label 
          htmlFor="date" 
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
            color: "#495E57",
            fontSize: "0.9rem",
            letterSpacing: "0.5px"
          }}
        >
          Choose date
        </label>
        <input 
          type="date" 
          id="date" 
          value={formData.date}
          onChange={handleChange}
          onBlur={() => handleBlur('date')}
          min={(() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split('T')[0];
          })()}
          style={{
            marginBottom: '0.5rem',
            padding: "12px",
            border: `2px solid ${getFieldError('date') ? '#e74c3c' : '#495E57'}`,
            borderRadius: "8px",
            fontSize: "1rem",
            backgroundColor: "white",
            color: "#495E57"
          }}
        />
        {getFieldError('date') && (
          <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            {getFieldError('date')}
          </div>
        )}
        
        <label 
          htmlFor="time" 
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
            color: "#495E57",
            fontSize: "0.9rem",
            letterSpacing: "0.5px"
          }}
        >
          Choose time
        </label>
        <div className="custom-select" style={{ position: "relative", width: "100%" }}>
          <select 
            id="time"
            value={formData.time}
            onChange={handleChange}
            onBlur={() => handleBlur('time')}
            disabled={!formData.date || isLoading}
            style={{
              marginBottom: '0.5rem',
              padding: "12px 40px 12px 12px", // extra right padding for arrow
              border: `2px solid ${getFieldError('time') ? '#e74c3c' : '#495E57'}`,
              borderRadius: "8px",
              fontSize: "1.1rem",
              backgroundColor: formData.date && !isLoading ? "white" : "#f5f5f5",
              color: formData.date && !isLoading ? "#495E57" : "#999",
              cursor: formData.date && !isLoading ? "pointer" : "not-allowed",
              width: "100%",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              boxSizing: "border-box"
            }}
          >
            <option value="">
              {!formData.date 
                ? "Please select a date first" 
                : isLoading 
                  ? "Loading available times..." 
                  : availableTimes.length === 0 
                    ? "No times available for this date" 
                    : "Select a time"
              }
            </option>
            {availableTimes.map(timeSlot => (
              <option key={timeSlot.time} value={timeSlot.time}>
                {timeSlot.time}
              </option>
            ))}
          </select>
          <span 
            style={{
              content: '"▼"',
              position: "absolute",
              top: "calc(50% - 0.26rem)",
              right: "16px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: formData.date && !isLoading ? "#495E57" : "#999",
              fontSize: "1.2rem"
            }}
          >▼</span>
        </div>
        {isLoading && (
          <div style={{ color: '#495E57', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
            Loading available times...
          </div>
        )}
        {getFieldError('time') && (
          <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            {getFieldError('time')}
          </div>
        )}
        
        <label 
          htmlFor="guests" 
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
            color: "#495E57",
            fontSize: "0.9rem",
            letterSpacing: "0.5px"
          }}
        >
          Number of guests
        </label>
        <input 
          type="number" 
          placeholder="1" 
          min="1" 
          max="10" 
          id="guests"
          value={formData.guests}
          onChange={handleChange}
          onBlur={() => handleBlur('guests')}
          style={{
            marginBottom: '0.5rem',
            padding: "12px",
            border: `2px solid ${getFieldError('guests') ? '#e74c3c' : '#495E57'}`,
            borderRadius: "8px",
            fontSize: "1rem",
            backgroundColor: "white",
            color: "#495E57"
          }}
        />
        {getFieldError('guests') && (
          <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
            {getFieldError('guests')}
          </div>
        )}
        
        <label 
          htmlFor="occasion" 
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
            color: "#495E57",
            fontSize: "0.9rem",
            letterSpacing: "0.5px"
          }}
        >
          Occasion (Optional)
        </label>
        <div className="custom-select" style={{ position: "relative", width: "100%" }}>
          <select 
            id="occasion"
            value={formData.occasion}
            onChange={handleChange}
            onBlur={() => handleBlur('occasion')}
            style={{
              marginBottom: '0.5rem',
              padding: "12px 40px 12px 12px", // extra right padding for arrow
              border: "2px solid #495E57",
              borderRadius: "8px",
              fontSize: "1.1rem",
              backgroundColor: "white",
              color: "#495E57",
              cursor: "pointer",
              width: "100%",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              boxSizing: "border-box"
            }}
          >
            <option value="">Select an occasion (optional)</option>
            <option value="Birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          <span 
            style={{
              content: '"▼"',
              position: "absolute",
              top: "calc(50% - 0.26rem)",
              right: "16px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#495E57",
              fontSize: "1.2rem"
            }}
          >▼</span>
        </div>
        
        <input 
          type="submit" 
          value={isSubmitting ? "Submitting..." : "Make Your Reservation"}
          disabled={isSubmitting}
          style={{
            marginBottom: '0.5rem',
            padding: "16px 24px",
            backgroundColor: (isSubmitting) ? "#ccc" : "#F4CE14",
            color: (isSubmitting) ? "#666" : "#495E57",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "900",
            cursor: (isSubmitting) ? "not-allowed" : "pointer",
            letterSpacing: "0.5px",
            transition: "background-color 0.3s ease",
            marginTop: "1rem"
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = "#495E57";
              e.target.style.color = "#fff";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = "#F4CE14";
              e.target.style.color = "#495E57";
            }
          }}
        />
      </form>
    </div>
  );
};

export default BookingForm;
