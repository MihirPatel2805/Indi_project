import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function AddOrderList(props) {
    const userEmail = props.Email;

    const [partiesDetails, setPartiesDetails] = useState([]);
    const [partyName, setPartyName] = useState('');
    const [partyDetails, setPartyDetails] = useState(null);
    const [orderItems, setOrderItems] = useState([
        { srNo: 1, designNo: '', quantity: 0, color: 0, total_pieces: 0, total_price: 0, status: '' },
    ]);
    const [totalPrice, setTotalPrice] = useState(0)

    const [partiesNameList, setPartiesNameList] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [designNameList, setDesignNameList] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [date, setDate] = useState(new Date().toLocaleString())

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}stock/viewParties/?email=${userEmail}`, {
                    withCredentials: true,
                });
                setPartiesDetails(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        const fetchDesignNo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}stock/viewstock?email=${userEmail}`, {
                    withCredentials: true,
                });
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        fetchDesignNo();
        fetchParties();
    }, [userEmail]);

    useEffect(() => {
        if (partiesDetails && partiesDetails.length > 0) {
            const updatedPartyList = partiesDetails.map(party => ({
                label: party.party_name,
                value: party.party_name
            }));
            setPartiesNameList(updatedPartyList);
        }
    }, [partiesDetails]);

    useEffect(() => {
        if (productDetails && productDetails.length > 0) {
            const updatedDesignList = productDetails.map(product => ({
                label: product.design_no,
                value: product.design_no
            }));
            setDesignNameList(updatedDesignList);
        }
    }, [productDetails]);

    const handlePartyNameChange = (e) => {
        const selectedPartyName = e.value;
        setPartyName(selectedPartyName);

        const selectedPartyDetails = partiesDetails.find(party => party.party_name === selectedPartyName);
        if (selectedPartyDetails) {
            setPartyDetails({
                address: selectedPartyDetails.address,
                gst: selectedPartyDetails.gst_number,
                mobile: selectedPartyDetails.mobile,
            });
        } else {
            setPartyDetails(null);
        }
    };

    useEffect(() => {
        return () => {
            setTotalPrice(orderItems.reduce((acc, item) => acc + item.total_price, 0))
        };
    }, [orderItems]);

    const handleRowChange = (index, field, value) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index][field] = value;

        if (field === 'designNo') {
            const selectedProduct = productDetails.find(product => product.design_no === value);
            updatedOrderItems[index].price = selectedProduct ? selectedProduct.price : 0;
            updatedOrderItems[index].color = selectedProduct ? selectedProduct.color : 0;
            updatedOrderItems[index].status = updatedOrderItems[index].quantity > selectedProduct?.total_set ? 'Not in Stock' : 'In Stock';
        }

        if (field === 'quantity') {
            const selectedProduct = productDetails.find(product => product.design_no === updatedOrderItems[index].designNo);
            updatedOrderItems[index].total_pieces = updatedOrderItems[index].quantity * updatedOrderItems[index].color * 4;
            updatedOrderItems[index].total_price = updatedOrderItems[index].total_pieces * updatedOrderItems[index].price;
            updatedOrderItems[index].status = updatedOrderItems[index].quantity > selectedProduct?.total_set ? 'Not in Stock' : 'In Stock';
        }

        setOrderItems(updatedOrderItems);
        setTotalPrice(orderItems.reduce((acc, item) => acc + item.total_price, 0))
    };

    const addNewRow = () => {
        setOrderItems([...orderItems, { srNo: orderItems.length + 1, designNo: '', quantity: 0, color: 0, total_pieces: 0, price: 0, total_price: 0, status: '' }]);
    };

    const deleteRow = (index) => {
        const updatedOrderItems = orderItems.filter((item, i) => i !== index);
        setOrderItems(updatedOrderItems.map((item, i) => ({ ...item, srNo: i + 1 })));
    };

    const validateOrderItems = () => {
        const party = !(partyName === '')
        const designNumbers = orderItems.map(item => item.designNo);
        const hasUniqueDesignNo = new Set(designNumbers).size === designNumbers.length;
        const allDesignNosFilled = orderItems.every(item => item.designNo !== '');
        const allQuantitiesValid = orderItems.every(item => item.quantity > 0);
        const allInStock = orderItems.every(item => item.status === 'In Stock');
        return hasUniqueDesignNo && allDesignNosFilled && allQuantitiesValid && allInStock && party;
    };

    const handleSave = async () => {
        if (validateOrderItems()) {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}stock/addOrderItems/`, {
                    email: props.Email,
                    partyName: partyName,
                    partyDetails: partyDetails,
                    date: date,
                    orderList: orderItems,
                    total_price: totalPrice
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setSuccessMessage('Order is saved');
                setError('');
            } catch (error) {
                console.error('Error adding stock:', error);
                setError('Error adding stock:');
            }
        } else {
            setError('Validation failed! Ensure unique Design Nos, valid quantities, and all items in stock.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='h-full w-full flex flex-col items-center justify-center p-3 overflow-y-auto'>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Order</h1>
                <p className="text-gray-600 text-lg">Fill out the details to add a new order.</p>
            </div>

            {/* Party Information Section */}
            <div className='w-full bg-gray-100 p-6 rounded-md shadow-md mb-4'>
                <div className="mb-4">
                    <label htmlFor="party_name" className="block text-lg font-semibold mb-2">Party Name</label>
                    <Select options={partiesNameList} onChange={handlePartyNameChange} className="w-full" />
                </div>

                {partyDetails && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-gray-700"><strong>Address:</strong> {partyDetails.address}</p>
                        <p className="text-gray-700"><strong>GST Number:</strong> {partyDetails.gst}</p>
                        <p className="text-gray-700"><strong>Mobile:</strong> {partyDetails.mobile}</p>
                    </div>
                )}
                <p className="mt-4 text-gray-600"><strong>Date:</strong> {date}</p>
            </div>

            {/* Order Items Section */}
            <div className='w-full bg-white p-6 rounded-md shadow-md'>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border p-3">Sr No</th>
                        <th className="border p-3">Design No</th>
                        <th className="border p-3">Quantity (Set)</th>
                        <th className="border p-3">Color</th>
                        <th className="border p-3">Total Pieces</th>
                        <th className="border p-3">Price</th>
                        <th className="border p-3">Total</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderItems.map((row, index) => (
                        <tr key={index}>
                            <td className="border p-3">{row.srNo}</td>
                            <td className="border p-3">
                                <Select options={designNameList} onChange={e => handleRowChange(index, 'designNo', e.value)} />
                            </td>
                            <td className="border p-3">
                                <input
                                    type="number"
                                    value={row.quantity}
                                    min={0}
                                    className="w-full border rounded px-3 py-1"
                                    onChange={e => handleRowChange(index, 'quantity', e.target.value)}
                                />
                            </td>
                            <td className="border p-3">{row.color}</td>
                            <td className="border p-3">{row.total_pieces}</td>
                            <td className="border p-3">{row.price}</td>
                            <td className="border p-3">{row.total_price}</td>
                            <td className="border p-3">
                                    <span className={row.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}>
                                        {row.status}
                                    </span>
                            </td>
                            <td className="border p-3">
                                <button onClick={() => deleteRow(index)} className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button onClick={addNewRow} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Add Row
                </button>

                <div className="mt-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Price: ₹{totalPrice}</h2>
                    <button
                        onClick={handleSave}
                        className="py-2 px-6 bg-[#181818] text-white rounded-lg hover:bg-[#E6859E] transition duration-300"
                    >
                        Save Order
                    </button>
                </div>
            </div>

            {/* Messages Section */}
            {error && <div className="mt-4 bg-red-100 text-red-600 p-3 rounded">{error}</div>}
            {successMessage && <div className="mt-4 bg-green-100 text-green-600 p-3 rounded">{successMessage}</div>}
        </div>
    );
}

export default AddOrderList;
