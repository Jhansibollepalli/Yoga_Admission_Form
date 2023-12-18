import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const formData = location.state || {};
  const effectExecuted = useRef(false);

  useEffect(() => {
    const processPaymentAndAddToDatabase = async () => {
      try {
        if (formData && !paymentProcessed) {
          console.log('Simulating payment...');

          // Adding data to Database
          await axios.post('http://localhost:5000/api/submitForm', formData);
          console.log('Payment successful! User created');

          setPaymentProcessed(true);
        }
      } catch (error) {
        console.error('Error processing payment and adding to database:', error.message);
      } finally {
        navigate('/success');
      }
    };

    if (formData && !paymentProcessed && !effectExecuted.current) {
      processPaymentAndAddToDatabase();
      effectExecuted.current = true; // Set the ref to true after execution
    }
  }, [formData, location.state, navigate, paymentProcessed]);

  return (
    <div>
      <h2>User Registered Successfully</h2>
      <p>Payment Successful! User has been added to their batch</p>
    </div>
  );
};

export default Success;
