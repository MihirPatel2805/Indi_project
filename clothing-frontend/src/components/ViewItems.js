import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "./Product";

const ViewItems = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const userEmail = props.Email;
    const [design_no, setDesign_no] = useState('');
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

    const searchItems = async () => {

        try{
            const response = await axios.post(`http://localhost:8000/stock/searchItems`, {
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
        <div className="container mx-auto mt-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-left text-xl font-bold">Items List</h1>

            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 border-collapse border border-gray-200" >
                    <thead className="bg-gray-800 text-white">
                    <tr className="border-collapse border border-slate-500">
                        <th scope="col" className=" w-2/12 text-center border-collapse border border-slate-500">Image</th>
                        <th scope="col" className="py-2 px-4 text-center border-collapse border border-slate-500">Design No</th>
                        <th scope="col" className="py-2 px-4 text-center border-collapse border border-slate-500">Color</th>
                        <th scope="col" className="py-2 px-4 text-center border-collapse border border-slate-500">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="bg-white hover:bg-gray-100 border-collapse border border-slate-500">
                            <td className="w-2/12 text-center border-collapse border border-slate-500 ">
                                <img
                                    src={`http://localhost:8000${product.image}`}
                                    alt="Product"
                                    className="h-24 w-full ob rounded"
                                />
                            </td>
                            <td className="py-2 px-4 text-center border-collapse border border-slate-500">{product.design_no}</td>
                            <td className="py-2 px-4 text-center border-collapse border border-slate-500">{product.color}</td>
                            <td className="py-2 px-4 text-center border-collapse border border-slate-500">{product.price}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewItems;
