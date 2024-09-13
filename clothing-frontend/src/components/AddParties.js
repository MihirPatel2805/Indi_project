import React, { useState } from 'react';
import axios from 'axios';

const PartiesForm = (prop) => {
    const [partyName, setPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        // FormData for the post request
        const formData = {
            email: prop.Email, // Can be passed from props
            party_name: partyName,
            mobile: mobile,
            gst_number: gstNumber,
            address: address,
        };

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}parties/add`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Party added successfully!');
            setError('');
        } catch (error) {
            console.error('Error adding party:', error);
            setError('Failed to add party. Please try again.');
        }
    };

    return (
        <div className="bg-pri p-6 rounded-lg h-full w-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Add New Party</h1>
                <p className="text-gray-600">Fill out the details to add a new party.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-10 mt-10  flex-col">
                {/* Left side - Form Inputs */}
                <div className="grid grid-cols-2 gap-20 w-full">
                    {/* Party Name Input */}
                    <div className="space-y-5">
                        <label htmlFor="party_name" className="block text-sm font-semibold text-gray-800 mb-1">
                            Party Name
                        </label>
                        <input
                            type="text"
                            id="party_name"
                            name="party_name"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Mobile Input */}
                    <div className="space-y-5">
                        <label htmlFor="mobile" className="block text-sm font-semibold text-gray-800 mb-1">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* GST Number Input */}
                    <div className="space-y-5">
                        <label htmlFor="gst_number" className="block text-sm font-semibold text-gray-800 mb-1">
                            GST Number
                        </label>
                        <input
                            type="text"
                            id="gst_number"
                            name="gst_number"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Address Input */}
                    <div className="space-y-5">
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-800 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Success Message */}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                    {/* Submit Button */}

                </div>
                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className="w-[20%] bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                    >
                        Add Party
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartiesForm;
