// PaymentPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    amount: '',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePayment = async () => {
    try {
      const paymentResult = await processPayment(paymentData);

      if (paymentResult.success) {
        alert('Payment Successful!');
        updateDatabase(paymentData);
        navigate('/');
      } else {
        alert('Payment Failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error.message);
      alert('Payment Failed');
    }
  };

  const updateDatabase = (paymentData) => {
    try {
      // Simulate updating the database
      alert('You have been successfully registered!!');
    } catch (error) {
      console.error('Error updating database:', error.message);
      alert('Failed to simulate database update');
    }
  };

  const processPayment = async (data) => {
    //simulating payment logic
    return { success: true };
  };

  return (
    <div className="payment-container">
      <div className="payment-form">
        <div className="payment-heading">
          <h1>Payment Page</h1>
        </div>
        <form className="payment-body">
          <div className="payment-group">
            <label className="payment__label">Amount:</label>
            <input
              type="number"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="payment__input"
            />
          </div>
          <div className="payment-group">
            <label className="payment__label">Name on Card:</label>
            <input
              type="text"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              placeholder="Enter name on card"
              className="payment__input"
            />
          </div>
          <div className="payment-group">
            <label className="payment__label">Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="Enter card number"
              className="payment__input"
            />
          </div>
          <div className="payment-group">
            <label className="payment__label">Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="Enter expiry date"
              className="payment__input"
            />
          </div>
          <div className="payment-group">
            <label className="payment__label">CVV:</label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="Enter CVV"
              className="payment__input"
            />
          </div>
          <div className="payment-footer">
            <button onClick={handlePayment} className="payment-btn">
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
