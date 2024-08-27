import React, {useEffect, useState} from 'react';
import './product.css';
import initialImage from './initial.png';
import axios from "axios";
import ReactDOM from "react-dom/client";
import Product from './Product'

const ProductForm = (prop) => {
  const [designNo, setDesignNo] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);  // Store the file object
  const [imageURL, setImageURL] = useState(initialImage);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    if (imageFile) {
      console.log('Updated imageFile:', imageFile);// Now this will log the updated file
    }
  }, [imageFile]);

  // Create FormData and append the necessary fields
  const formData = new FormData();
  formData.append('email', prop.Email);
  formData.append('design_no', designNo);
  formData.append('color', color);
  formData.append('price', price);
  formData.append('image', imageFile);

  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    try {
      await axios.post('http://localhost:8000/stock/additems/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
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
              <img src={imageURL} alt="Selected or Initial" className="image-preview" />
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file);  // You can see the file object here
                setImageFile(file);  // Save the file object itself
                console.log(imageFile)
                const url = window.URL.createObjectURL(file);
                setImageURL(url);  // Use the URL for image preview
                console.log(url);  // Log the URL to see it
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
          <p>{error && <div className="success-message">{error}</div>}</p>
          <div className="button-group">
          
            <button type="submit" className="submit-btn">Save and Next</button>
            <button type="button" className="submit-btn">Save</button>
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default ProductForm;
