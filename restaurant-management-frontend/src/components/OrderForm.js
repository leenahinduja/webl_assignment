import './OrderForm.css';

import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css';
import { FaUser, FaPhone, FaUtensils, FaHashtag, FaRupeeSign } from 'react-icons/fa';

const dishes = [
  { name: 'Pasta', price: 200 },
  { name: 'Pizza', price: 300 },
  { name: 'Burger', price: 150 },
  { name: 'Salad', price: 120 },
];

function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    dish: '',
    quantity: 1,
  });
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const selectedDish = dishes.find((d) => d.name === formData.dish);
    if (selectedDish) {
      const totalAmount = selectedDish.price * formData.quantity;
      setTotal(totalAmount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTotal();
    try {
      await axios.post('http://localhost:5000/api/orders', {
        ...formData,
        total,
      });
      setMessage('✅ Order placed successfully!');
    } catch (error) {
      setMessage('❌ Failed to place order');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>🍽️ Place Your Order</h2>

      <div className="input-group">
        <FaUser className="icon" />
        <input type="text" name="customerName" placeholder="Customer Name" required onChange={handleChange} />
      </div>

      <div className="input-group">
        <FaPhone className="icon" />
        <input type="text" name="contact" placeholder="Contact Number" required onChange={handleChange} />
      </div>

      <div className="input-group">
        <FaUtensils className="icon" />
        <select name="dish" required onChange={handleChange}>
          <option value="">Select Dish</option>
          {dishes.map((dish, index) => (
            <option key={index} value={dish.name}>
              {dish.name} - ₹{dish.price}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <FaHashtag className="icon" />
        <input type="number" name="quantity" min="1" value={formData.quantity} required onChange={handleChange} />
      </div>

      <button type="button" onClick={calculateTotal}>💰 Calculate Total</button>

      <div className="total">
        <FaRupeeSign /> {total}
      </div>

      <button type="submit">✅ Submit Order</button>
      <p className="message">{message}</p>
    </form>
  );
}

export default OrderForm;
