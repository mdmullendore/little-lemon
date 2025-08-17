import { Route, Routes } from "react-router-dom";

import Home from "../pages/HomePage";
import Bookingpage from "../pages/BookingPage";
import ConfirmationPage from "../pages/ConfirmationPage";

export default function () {
  return (
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<Bookingpage/>} path="/bookings"/>
      <Route element={<ConfirmationPage/>} path="/confirmation/:confirmationNumber"/>
      <Route element={<div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        padding: '2rem'
      }}>
        <h1 style={{ color: '#dc3545', fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ color: '#495E57', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: '#666', textAlign: 'center', maxWidth: '500px' }}>
          The page you're looking for doesn't exist or the confirmation number is invalid.
        </p>
        <a href="/" style={{ 
          marginTop: '2rem',
          padding: '12px 24px',
          backgroundColor: '#F4CE14',
          color: '#495E57',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '600'
        }}>
          Return to Home
        </a>
      </div>} path="*"/>
    </Routes>
  );
};