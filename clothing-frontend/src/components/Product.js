import React, { useState,useContext } from 'react';
import './product.css';
import image1 from'./product.png'
import axios from "axios";
import {UserEmailContext} from './Dashboard'
const ProductForm = () => {
  const [designNo, setDesignNo] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error,setError]=useState('')
  const Uemail = useContext(UserEmailContext);
  const handleSubmit = (e) => {
    console.log(Uemail)
    console.log(image)
    e.preventDefault();
    try{

      axios.post('http://localhost:8000/stock/additems/', {
        email:Uemail,
        design_no: designNo,
        color:color,
        price:price,
        image:image
      }, {
        withCredentials: true,  // This ensures cookies are included in requests
        headers: {
          'Content-Type': 'application/json',
        }
      })
          .then(response => {
            console.log('item added..', response.data);

          })
          .catch(error => {
            console.error('error -->', error);
          });


    }catch (e){
      setError(e.message)
    }
  };

  return (
    <div className='main1'>
    <div className="product-form-container">
      <div className="form-section">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="design_no">Design No:{Uemail}</label>
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
              onChange={(e) =>{
                const file=e.target.files[0]
                let url = window.URL.createObjectURL(file);
                setImage(url)
              }
            }
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
