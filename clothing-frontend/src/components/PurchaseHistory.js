import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PurchaseHistory(props) {
    const userEmail = props.Email; // Get the email from props
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState('');

    // Fetch order history when the component mounts
    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}stock/getPurchaseHistory/?email=${userEmail}`, {
                    withCredentials: true,
                });
                setOrderHistory(response.data);  // Set the fetched order history
            } catch (error) {
                console.error('Error fetching order history:', error);
                setError('Error fetching order history.');
            }
        };

        fetchOrderHistory();
    }, [userEmail]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-3 overflow-y-scroll">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Purchase History</h1>
                <p className="text-gray-600">View all previous Purchase.</p>
            </div>

            {/* Order History Table */}
            <div className='bg-white w-full p-6'>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr>
                        <th className="border bg-sec text-pri p-2">Purchase Date</th>
                        <th className="border bg-sec text-pri p-2">Party Name</th>
                        <th className="border bg-sec text-pri p-2">Total Price</th>

                    </tr>
                    </thead>
                    <tbody>
                    {orderHistory.length > 0 ? (
                        orderHistory.map((order, index) => (
                            <tr key={index}>
                                <td className="border p-2">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="border p-2">{order.party_name}</td>
                                <td className="border p-2"> Rs. {order.total_price}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border p-2 text-center">
                                {error ? error : 'No orders found.'}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PurchaseHistory;
