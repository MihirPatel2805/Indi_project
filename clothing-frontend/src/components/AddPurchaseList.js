import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function AddPurchaseList(props) {
    const userEmail = props.Email;

    const [partiesDetails, setPartiesDetails] = useState([]);
    const [partyName, setPartyName] = useState('');
    const [partyDetails, setPartyDetails] = useState(null);
    const [purchaseItems, setPurchaseItems] = useState([
        { srNo: 1, purchaseItem: '', quantity: 0, pieces: 0, total_price: 0 },
        { srNo: 2, purchaseItem: '', quantity: 0, pieces: 0, total_price: 0 },
    ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [partiesNameList, setPartiesNameList] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [date, setDate] = useState(new Date().toLocaleString());

    // Fetch party details when the component mounts
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
        fetchParties();
    }, [userEmail]);

    useEffect(() => {
        if (partiesDetails.length > 0) {
            const updatedPartyList = partiesDetails.map(party => ({
                label: party.party_name,
                value: party.party_name
            }));
            setPartiesNameList(updatedPartyList);
        }
    }, [partiesDetails]);

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
        setTotalPrice(purchaseItems.reduce((acc, item) => acc + item.total_price, 0));
    }, [purchaseItems]);

    const handleRowChange = (index, field, value) => {
        const updatedPurchaseItems = [...purchaseItems];
        updatedPurchaseItems[index][field] = value;

        if (field === 'quantity' || field === 'price') {
            updatedPurchaseItems[index].total_price = updatedPurchaseItems[index].price * updatedPurchaseItems[index].quantity;
        }

        setPurchaseItems(updatedPurchaseItems);
    };

    const addNewRow = () => {
        setPurchaseItems([...purchaseItems, { srNo: purchaseItems.length + 1, purchaseItem: '', quantity: 0, pieces: 0, total_price: 0 }]);
    };

    const deleteRow = (index) => {
        const updatedPurchaseItems = purchaseItems.filter((_, i) => i !== index);
        setPurchaseItems(updatedPurchaseItems.map((item, i) => ({ ...item, srNo: i + 1 })));
    };

    const validateOrderItems = () => {
        const party = !(partyName === '');
        const purchaseNumbers = purchaseItems.map(item => item.purchaseItem);
        const hasUniqueDesignNo = new Set(purchaseNumbers).size === purchaseNumbers.length;
        const allDesignNosFilled = purchaseItems.every(item => item.purchaseItem !== '');
        const allQuantitiesValid = purchaseItems.every(item => item.quantity > 0);

        return hasUniqueDesignNo && allDesignNosFilled && allQuantitiesValid && party;
    };

    const handleSave = async () => {
        if (validateOrderItems()) {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}stock/addPurchaseItems/`, {
                    email: props.Email,
                    partyName: partyName,
                    partyDetails: partyDetails,
                    date: date,
                    purchaseList: purchaseItems,
                    total_price: totalPrice
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setSuccessMessage('Purchase saved successfully');
                setError('');
            } catch (error) {
                console.error('Error adding purchaseList:', error);
                setError('Error adding purchaseList: ' + error.message);
            }
        } else {
            setError('Validation failed! Ensure unique Design Nos, valid quantities, and all items are filled.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='h-full w-full flex flex-col items-center justify-center p-6 overflow-y-auto'>
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Add New Purchase</h1>
                <p className="text-gray-600">Fill out the details to add a new purchase.</p>
            </div>

            {/* Party Information Section */}
            <div className='w-full bg-gray-100 p-6 rounded-md shadow-md mb-4'>
                <label htmlFor="party_name" className="block text-lg font-semibold mb-2">Party Name</label>
                <Select options={partiesNameList} onChange={handlePartyNameChange} />
                {partyDetails && (
                    <div className="mt-4">
                        <p><strong>Address:</strong> {partyDetails.address}</p>
                        <p><strong>GST Number:</strong> {partyDetails.gst}</p>
                        <p><strong>Mobile:</strong> {partyDetails.mobile}</p>
                    </div>
                )}
                <div className="mt-4">
                    <strong>Date:</strong> {date}
                </div>
            </div>

            {/* Purchase Items Section */}
            <div className='w-full bg-white p-6 rounded-md shadow-md'>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr>
                        <th className="border bg-gray-200 text-gray-700 p-3">Sr No</th>
                        <th className="border bg-gray-200 text-gray-700 p-3">Purchase Items</th>
                        <th className="border bg-gray-200 text-gray-700 p-3">Quantity</th>
                        <th className="border bg-gray-200 text-gray-700 p-3">Price</th>
                        <th className="border bg-gray-200 text-gray-700 p-3">Total</th>
                        <th className="border bg-gray-200 text-gray-700 p-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {purchaseItems.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-3">{item.srNo}</td>
                            <td className="border p-3">
                                <input
                                    type="text"
                                    value={item.purchaseItem}
                                    onChange={(e) => handleRowChange(index, 'purchaseItem', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="border p-3">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min={0}
                                    onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="border p-3">
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleRowChange(index, 'price', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="border p-3">{item.total_price}</td>
                            <td className="border p-3">
                                <button
                                    type="button"
                                    onClick={() => deleteRow(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Add Row Button */}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={addNewRow}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Add Row
                    </button>
                </div>

                {/* Total Price */}
                <div className="mt-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Amount: ₹{totalPrice}</h2>
                    <button
                        onClick={handleSave}
                        className="py-2 px-6 bg-[#181818] text-white rounded-lg hover:bg-[#E6859E] transition duration-300"
                    >
                        Save
                    </button>
                </div>
            </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {/* Success Message */}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

        </div>
    );
}

export default AddPurchaseList;
