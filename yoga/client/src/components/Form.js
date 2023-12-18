// components/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; 

const Form = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    age: '',
  });

  const [selectedBatch, setSelectedBatch] = useState('6-7 AM');

  const handleChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { fullname, email, age } = user;

    if (fullname && email && age) {
      if (age >= 18 && age <= 65) {
        try {
          const res = await axios.post('http://localhost:5000/api/submitForm', {
            email,
            username: fullname,
            age,
            batch: selectedBatch,
          });

          if (res.status === 200) {
            navigate('/payment');
          }
        } catch (error) {
          console.error('Error submitting form:', error.message);
        }
      } else {
        alert('Age must be in the range 18-65');
      }
    } else {
      alert('Fill all the data!');
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <div className="form-heading">
          <h1>YOGA ADMISSION FORM</h1>
        </div>
        <form className="form-body" method="POST">
          <div className="fullname">
            <label className="form__label">Full Name: </label>
            <input
              className="form__input"
              type="text"
              name="fullname"
              id="fullName"
              placeholder="Enter your full name."
              value={user.fullname}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </div>
          <div className="email">
            <label className="form__label">Email Address: </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form__input"
              placeholder="Enter your email address"
              value={user.email}
              onChange={getUserData}
            />
          </div>
          <div className="age">
            <label className="form__label">Age: </label>
            <input
              className="form__input"
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={user.age}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </div>
          <div className="batches">
            <label className="form__label">Batch: </label>
            <select value={selectedBatch} onChange={handleChange}>
              <option value="6-7 AM">6-7 AM</option>
              <option value="7-8 AM">7-8 AM</option>
              <option value="8-9 AM">8-9 AM</option>
              <option value="5-6 PM">5-6 PM</option>
            </select>
          </div>
          <div className="footer">
            <button type="submit" onClick={postData} className="btn">
              Save & Proceed To Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
