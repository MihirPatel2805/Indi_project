import React, { useState } from 'react';
import './product.css';
import image1 from'./product.png'

const ProductForm = ({ onSubmit }) => {
  const [designNo, setDesignNo] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      design_no: designNo,
      color,
      price,
      image,
    };
    onSubmit(formData);
  };

  return (
    <div class='main1'>
    <div className="product-form-container">
      <div className="form-section">
        <form onSubmit={handleSubmit} className="product-form">
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

          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
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
