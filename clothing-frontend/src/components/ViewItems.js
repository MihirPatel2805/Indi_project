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
    }, [userEmail]);

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
        <div className="container mx-auto mt-5 h-full overflow-y-scroll bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-left text-xl font-bold">Stock List</h1>
                <div className="flex items-center">
                    <label htmlFor="designNo" className="mr-2 text-[#3A0A3E]" >Design No:</label>
                    <input
                        type="text"
                        id="designNo"
                        className="form-input h-10 rounded bg-[#F8F8FC]  border border-gray-300"
                        placeholder="Design No"
                        onChange={(e)=>{
                            setDesign_no(e.target.value)
                        }}
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white ">
                    <thead className="bg-[#181818] text-white">
                    <tr>
                        <th scope="col" className="py-2 px-4 text-center">Sr No.</th>
                        <th scope="col" className="py-2 px-4 text-center">Image</th>
                        <th scope="col" className="py-2 px-4 text-center">Design No</th>
                        <th scope="col" className="py-2 px-4 text-center">Color</th>
                        <th scope="col" className="py-2 px-4 text-center">Price</th>

                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index) => (
                        <tr key={product.id} className="border-t-2 border-b-2 hover:bg-[#F8F8FC]">
                            <td className="py-2 px-4 text-center ">{index+1}</td>
                            <td className="py-2 px-4 text-center w-40 border border-gray-300">
                                <img
                                    src={`http://localhost:8000${product.image}`}
                                    alt="Product"
                                    className="h-35 w-full object-fill rounded"
                                />
                            </td>
                            <td className="py-2 px-4 text-center">{product.design_no}</td>
                            <td className="py-2 px-4 text-center">{product.color}</td>
                            <td className="py-2 px-4 text-center">{product.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewItems;
