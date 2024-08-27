import React, { useState } from 'react';
import './product.css';
import image1 from './product.png';
import initialImage from './initial.png';
import axios from "axios";
import { Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import ReactDOM from "react-dom/client";
import Product from './Product'

const ProductForm = (prop) => {
  const [designNo, setDesignNo] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:8000/stock/additems/', {
        email: prop.Email,
        design_no: designNo,
        color: color,
        price: price,
        image: image
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setSuccessMessage('Item added successfully!');
      root.render(<Product/>)

    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };
  const root = ReactDOM.createRoot(document.getElementById('root'));
  return (
    <div className='main1'>
      <div className="product-form-container">
        <div className='form-section'>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="image-upload-container">
            <div className="image-preview-frame">
              <img src={image} alt="Selected or Initial" className="image-preview" />
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const url = window.URL.createObjectURL(file);
                setImage(url);
              }}
              required
              className="image-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="design_no">Design No:</label>
            <input
              type="text"
              id="design_no"
              name="design_no"
              value={designNo}
              onChange={(e) => setDesignNo(e.target.value)}
              required
            />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <p>{successMessage && <div className="success-message">{successMessage}</div>}</p>
          <div className="button-group">
          
            <button type="submit" className="submit-btn">Save and Next</button>
            <button type="button" className="submit-btn">Save</button>
          </div>
        </form>
        </div>
        <div className="image-section">
          <div className="tshirt-animation">
            <img src={image1} alt="T-shirt" className="tshirt-image" />
            <div className="tshirt-text">Create Your Own T-shirt Design!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
