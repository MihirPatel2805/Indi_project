import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function AddOrderList(props) {
    const userEmail = props.Email;

    const [partiesDetails, setPartiesDetails] = useState([]);
    const [partyName, setPartyName] = useState('');
    const [partyDetails, setPartyDetails] = useState(null); // To hold fetched party details
    const [orderItems, setOrderItems] = useState([
        { srNo: 1, designNo: '', quantity: 0, price: 0, total: 0 },
        { srNo: 2, designNo: '', quantity: 0, price: 0, total: 0 }
    ]); // Initial order item row

    const [partiesNameList, setPartiesNameList] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [designNameList, setDesignNameList] = useState([]);
    // Fetch the party details when the component mounts
    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stock/viewParties/?email=${userEmail}`, {
                    withCredentials: true,
                });
                console.log(response.data);
                setPartiesDetails(response.data);  // Set the fetched party details
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        const fetchDesignNo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stock/viewstock?email=${userEmail}`, {
                    withCredentials: true,
                });
                console.log(response.data);
                setProductDetails(response.data);  // Set the fetched party details
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        fetchDesignNo();
        fetchParties();

    }, [userEmail]);

    // Update partiesNameList when partiesDetails is updated
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
            const updatedDesignList = productDetails.map( product=> ({
                label: product.design_no,
                value: product.design_no
            }));
            setDesignNameList(updatedDesignList);
        }
    }, [partiesDetails]);

    // Function to handle party name selection and fetch details
    const handlePartyNameChange = (e) => {
        const selectedPartyName = e.value; // Directly use e.value
        setPartyName(selectedPartyName);   // Update the party name state

        // Fetch details based on the selected party name
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

    // Function to handle row changes
    const handleRowChange = (index, field, value) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index][field] = value;
        if (field === 'designNo') {
            updatedOrderItems[index].price = productDetails.find(product => product.design_no === value).price
            console.log(productDetails.find(product => product.design_no === value).price)
        }
        // If field is quantity or price, calculate total
        if (field === 'quantity' || field === 'price') {
            updatedOrderItems[index].total = updatedOrderItems[index].quantity * updatedOrderItems[index].price;
        }
        setOrderItems(updatedOrderItems);
        console.log(orderItems);
    };

    // Function to add new row
    const addNewRow = () => {
        setOrderItems([...orderItems, { srNo: orderItems.length + 1, designNo: '', quantity: 0, price: 0, total: 0 }]);
    };

    // Function to delete a row
    const deleteRow = (index) => {
        const updatedOrderItems = orderItems.filter((item, i) => i !== index);
        setOrderItems(updatedOrderItems);
    };

    return (
        <>
            <div className='h-full w-full flex flex-col items-center justify-center p-3 overflow-y-scroll'>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Order</h1>
                    <p className="text-gray-600">Fill out the details to add a new order.</p>
                </div>

                {/* Party Information Section */}
                <div className='h-[40%] bg-gray-400 w-full p-6 '>
                    <label htmlFor="party_name" className="block text-sm font-semibold  mb-1">
                        Party Name
                    </label>
                    <Select options={partiesNameList} onChange={handlePartyNameChange} />

                    {partyDetails && (
                        <div className="mt-4">
                            <p><strong>Address:</strong> {partyDetails.address}</p>
                            <p><strong>GST Number:</strong> {partyDetails.gst}</p>
                            <p><strong>Mobile:</strong> {partyDetails.mobile}</p>
                        </div>
                    )}
                </div>

                {/* Order Items Section */}
                <div className=' bg-white w-full p-6'>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                        <tr>
                            <th className="border bg-sec text-pri p-2">Sr No</th>
                            <th className="border bg-sec text-pri p-2">Design No</th>
                            <th className="border bg-sec text-pri p-2">Quantity</th>
                            <th className="border bg-sec text-pri p-2">Price</th>
                            <th className="border bg-sec text-pri p-2">Total</th>
                            <th className="border bg-sec text-pri p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderItems.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{item.srNo}</td>
                                <td className="border p-2">
                                    {/*<input*/}
                                    {/*    type="text"*/}
                                    {/*    value={item.designNo}*/}
                                    {/*    onChange={(e) => handleRowChange(index, 'designNo', e.target.value)}*/}
                                    {/*    className="w-full p-2 border rounded"*/}
                                    {/*/>*/}
                                    <Select options={designNameList} onChange={(e) => handleRowChange(index, 'designNo', e.value)} />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleRowChange(index, 'price', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                </td>
                                <td className="border p-2">{item.total}</td>
                                <td className="border p-2">
                                    <button
                                        type="button"
                                        onClick={() => deleteRow(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* Add Row Button */}
                    <div className="border p-2 mt-2">
                        <button
                            type="button"
                            onClick={addNewRow}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Add Row
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddOrderList;
