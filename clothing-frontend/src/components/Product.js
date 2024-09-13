import React, { useEffect, useState } from 'react';
import initialImage from '../assets/initial.png';
import axios from 'axios';

const ProductForm = (prop) => {
  const [designNo, setDesignNo] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null); // Store the file object
  const [imageURL, setImageURL] = useState(initialImage);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (imageFile) {
      console.log('Updated imageFile:', imageFile);
    }
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const formData = new FormData();
    formData.append('email', prop.Email);
    formData.append('design_no', designNo);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('image', imageFile);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}stock/additems/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Item added successfully!');
      // Navigate to Product list or other actions here
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };

  return (
      <div className="bg-pri p-6 rounded-lg h-full w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600">Fill out the details to create a new product.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-6 mt-10">
          {/* Left side - Form Inputs */}
          <div className="flex-1 space-y-12">
            {/* Design Number Input */}
            <div className="space-y-5">
              <label htmlFor="design_no" className="block text-sm font-semibold text-gray-800 mb-1">
                Design Number
              </label>
              <input
                  type="text"
                  id="design_no"
                  name="design_no"
                  placeholder="Enter design number"
                  value={designNo}
                  onChange={(e) => setDesignNo(e.target.value)}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>

            {/* Price Input */}
            <div className="space-y-5">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-1">
                Price
              </label>
              <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>

            {/* Number of Colors Input */}
            <div className="space-y-5">
              <label htmlFor="color" className="block text-sm font-semibold text-gray-800 mb-1">
                Number of Colors
              </label>
              <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Enter number of colors"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Right side - Image Upload */}
          <div className="flex-1">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800 mb-1">
              Image
            </label>
            <div className="flex items-center">
              <div
                  className="h-48 w-48 border border-gray-300 bg-gray-100 flex items-center justify-center rounded overflow-hidden mb-4">
                <img src={imageURL} alt="Selected or Initial" className="h-full w-full object-contain"/>
              </div>
              <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    const url = window.URL.createObjectURL(file);
                    setImageURL(url);
                  }}
                  required
                  className="bg-pri rounded-xl ml-4 "
                  placeholder='add Image'
              />
            </div>
          </div>
        </form>

        {/* Success and Error Messages */}
        {successMessage && (
            <div className="text-green-600 font-bold text-center mt-4">{successMessage}</div>
        )}
        {error && (
            <div className="text-red-600 font-bold text-center mt-4">{error}</div>
        )}
        <div className="col-span-2 flex justify-end">
          <button
              type="submit"
              className="py-2 px-6 bg-qua text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
          >
            Save Product
          </button>
        </div>
      </div>
  );

};

export default ProductForm;
