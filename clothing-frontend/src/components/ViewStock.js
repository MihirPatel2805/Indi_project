import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStock = (props) => {
    // State to store the fetched products
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    // Example user email, replace with actual logic to get user's email
    const userEmail = props.Email;

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stock/viewstock?email=${userEmail}`, {
                    withCredentials: true,  // Ensure cookies are included
                });
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching stock data');
                console.error('Error fetching stock data:', error);
            }
        };

        fetchProducts();
    }, [userEmail]);

    return (
        <div>
            {userEmail}
            <h1>Stock List</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <img src='' alt="Selected or Initial" className="image-preview"/>
            <table>
                <thead>
                <tr>
                    <th>Design No</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Total Pieces</th>
                    <th>Image</th>
                    {/* Add more columns as needed */}
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.design_no}</td>
                        <td>{product.color}</td>
                        <td>{product.price}</td>
                        <td>{product.total_pieces}</td>
                        <td><img src={`http://localhost:8000${product.image}`} alt="sdfvsv" height='200px' width='200px'/></td>
                        <td>{product.image}</td>
                        {/* Add more fields as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStock;
