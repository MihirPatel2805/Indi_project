import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStock = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const userEmail = props.Email;
    const [design_no, setDesign_no] = useState('');
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}stock/viewstock?email=${userEmail}`, {
                    withCredentials: true,
                });
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching stock data');
                console.error('Error fetching stock data:', error);
            }
        };

        fetchProducts();
    }, []);
    useEffect(() => {

            searchItems();

    }, [design_no]);
    const searchItems = async () => {

        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}stock/searchItems`, {
                design_no:design_no,
                email:userEmail,
            },{withCredentials: true})
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching stock data');
            console.error('Error fetching stock data:', error);
        }
    }
    return (
        <div className="container mx-auto mt-5 h-full overflow-y-scroll">
            <div className="flex justify-between items-center ">
                <h1 className="text-left text-xl font-bold">Stock List</h1>
                <div className="flex items-center">
                    <label htmlFor="designNo" className="mr-2" >Design No:</label>
                    <input 
                        type="text" 
                        id="designNo"
                        className="form-input h-10 rounded border border-gray-300" 
                        placeholder="Design No"
                        onChange={(e)=>{
                            setDesign_no(e.target.value)
                        }}
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th scope="col" className="py-2 px-4 text-center">Image</th>
                            <th scope="col" className="py-2 px-4 text-center">Design No</th>
                            <th scope="col" className="py-2 px-4 text-center">Color</th>
                            <th scope="col" className="py-2 px-4 text-center">Price</th>
                            <th scope="col" className="py-2 px-4 text-center">Total Pieces</th>
                            <th scope="col" className="py-2 px-4 text-center">Set Wise Pieces</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="even:bg-gray-100 odd:bg-gray-300">
                                <td className="py-2 px-4 text-center">
                                    <img
                                        src={`http://localhost:8000${product.image}`}
                                        alt="Product"
                                        className="h-24 w-24 object-fill rounded"
                                    />
                                </td>
                                <td className="py-2 px-4 text-center">{product.design_no}</td>
                                <td className="py-2 px-4 text-center">{product.color}</td>
                                <td className="py-2 px-4 text-center">{product.price}</td>
                                <td className="py-2 px-4 text-center">{product.total_pieces}</td>
                                <td className="py-2 px-4 text-center">
                                    <div className="flex justify-around">
                                        <div>M: {product.pieces_set.M}</div>
                                        <div>L: {product.pieces_set.L}</div>
                                        <div>XL: {product.pieces_set.XL}</div>
                                        <div>XXL: {product.pieces_set.XXL}</div>
                                    </div>
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
