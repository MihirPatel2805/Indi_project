import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStock = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const userEmail = props.Email;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stock/viewstock?email=${userEmail}`, {
                    withCredentials: true,
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
        
        <div className="container mt-50" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            {userEmail}
            <h1 className="text-center mb-4">Stock List</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-center">Design No</th>
                            <th scope="col" className="text-center">Color</th>
                            <th scope="col" className="text-center">Price</th>
                            <th scope="col" className="text-center">Total Pieces</th>
                            <th scope="col" className="text-center">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} 
                                style={{ transition: 'background-color 0.3s ease' }} 
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dee2e6'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <td className="text-center">{product.design_no}</td>
                                <td className="text-center">{product.color}</td>
                                <td className="text-center">{product.price}</td>
                                <td className="text-center">{product.total_pieces}</td>
                                <td className='text-center'>
                                    <img 
                                        src={`http://localhost:8000${product.image}`} 
                                        alt="Product" 
                                        style={{ height: '150px', width: '200px', objectFit:'fill' }} 
                                        className="img-fluid rounded" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewStock;
