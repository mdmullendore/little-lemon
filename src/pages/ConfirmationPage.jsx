import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const { confirmationNumber } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if confirmation number exists
    if (!confirmationNumber) {
      navigate('/404');
      return;
    }

    // Get order data from local storage
    const storedOrderData = localStorage.getItem('orderData');
    
    if (!storedOrderData) {
      navigate('/404');
      return;
    }

    try {
      const parsedOrderData = JSON.parse(storedOrderData);
      
      // Check if the stored confirmation number matches the URL parameter
      if (parsedOrderData.confirmationNumber !== confirmationNumber) {
        navigate('/404');
        return;
      }

      setOrderData(parsedOrderData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      navigate('/404');
      return;
    } finally {
      setIsLoading(false);
    }
  }, [confirmationNumber, navigate]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#495E57'
      }}>
        Loading confirmation...
      </div>
    );
  }

  if (!orderData) {
    return null; // Will redirect to 404
  }

  return (
    <div style={{ 
      padding: "2rem", 
      maxWidth: "800px", 
      margin: "0 auto",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      marginTop: "2rem"
    }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem"
      }}>
        <h1 style={{ 
          color: "#495e57", 
          fontSize: "2.5rem",
          marginBottom: "0.5rem"
        }}>
          ✓ Reservation Confirmed!
        </h1>
        <p style={{ 
          color: "#666", 
          fontSize: "1.1rem",
          margin: 0
        }}>
          Your reservation has been successfully confirmed
        </p>
      </div>

      <div style={{ 
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ 
          color: "#495E57", 
          marginTop: 0,
          marginBottom: "1.5rem",
          borderBottom: "2px solid #F4CE14",
          paddingBottom: "0.5rem"
        }}>
          Reservation Details
        </h2>

        <div style={{ 
          display: "grid", 
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee"
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Confirmation Number:</span>
            <span style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#495e57" }}>
              {orderData.confirmationNumber}
            </span>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Date:</span>
            <span>{new Date(orderData.date).toLocaleDateString()}</span>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Time:</span>
            <span>{orderData.time}</span>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Number of Guests:</span>
            <span>{orderData.guests}</span>
          </div>

          {orderData.occasion && (
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              padding: "0.75rem 0",
              borderBottom: "1px solid #eee",
              fontWeight: '700',
              fontFamily: 'Karla, sans-serif'
            }}>
              <span style={{ fontWeight: "600", color: "#495E57" }}>Occasion:</span>
              <span style={{ textTransform: 'capitalize' }}>{orderData.occasion}</span>
            </div>
          )}

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Status:</span>
            <span style={{ 
              color: "#495e57", 
              fontWeight: "600",
              textTransform: "uppercase"
            }}>
              {orderData.status}
            </span>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "0.75rem 0",
            borderBottom: "1px solid #eee",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <span style={{ fontWeight: "600", color: "#495E57" }}>Booking ID:</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
              {orderData.bookingId}
            </span>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "#e8f5e8",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #495e57"
        }}>
          <p style={{ 
            margin: 0, 
            color: "#155724",
            fontSize: "0.9rem",
            fontWeight: '700',
            fontFamily: 'Karla, sans-serif'
          }}>
            <strong>Important:</strong> Please save your confirmation number for future reference. 
            You can use this number to modify or cancel your reservation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;