import React, { useState } from 'react';
import axios from 'axios';

const AddStock = (prop) => {
    const [designNo, setDesignNo] = useState('');
    const [totalSet, setTotalSet] = useState(0);
    const [setM, setSetM] = useState(0);
    const [setL, setSetL] = useState(0);
    const [setXL, setSetXL] = useState(0);
    const [setXXL, setSetXXL] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        // FormData for the post request
        const formData = {
            email: prop.Email, // Can be passed from props
            design_no: designNo,
            total_set: totalSet,
            set_m: setM,
            set_l: setL,
            set_xl: setXL,
            set_xxl: setXXL,
        };

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}stocks/add`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Stock added successfully!');
            setError('');
        } catch (error) {
            console.error('Error adding stock:', error);
            setError('Error adding stock:');
        }
    };

    return (
        <div className="bg-pri p-6 rounded-lg h-full w-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Add New Stock</h1>
                <p className="text-gray-600">Fill out the details to add new stock.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3 mt-5 flex-col">
                {/* Left side - Form Inputs */}
                <div className="grid grid-cols-2 gap-10 w-full">
                    {/* Design No. Input */}
                    <div className="space-y-5">
                        <label htmlFor="design_no" className="block text-sm font-semibold text-gray-800 mb-1">
                            Design No.
                        </label>
                        <input
                            type="text"
                            id="design_no"
                            name="design_no"
                            value={designNo}
                            onChange={(e) => setDesignNo(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Total Set Input */}
                    <div className="space-y-5">
                        <label htmlFor="total_set" className="block text-sm font-semibold text-gray-800 mb-1">
                            Total Set
                        </label>
                        <input
                            type="text"
                            id="total_set"
                            name="total_set"
                            value={totalSet}
                            onChange={(e) => setTotalSet(parseInt(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Set for M Size Input */}
                    <div className="space-y-5">
                        <label htmlFor="set_m" className="block text-sm font-semibold text-gray-800 mb-1">
                            Set for M Size
                        </label>
                        <input
                            type="text"
                            id="set_m"
                            name="set_m"
                            value={setM}
                            onChange={(e) => setSetM(parseInt(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Set for L Size Input */}
                    <div className="space-y-5">
                        <label htmlFor="set_l" className="block text-sm font-semibold text-gray-800 mb-1">
                            Set for L Size
                        </label>
                        <input
                            type="text"
                            id="set_l"
                            name="set_l"
                            value={setL}
                            onChange={(e) => setSetL(parseInt(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Set for XL Size Input */}
                    <div className="space-y-5">
                        <label htmlFor="set_xl" className="block text-sm font-semibold text-gray-800 mb-1">
                            Set for XL Size
                        </label>
                        <input
                            type="text"
                            id="set_xl"
                            name="set_xl"
                            value={setXL}
                            onChange={(e) => setSetXL(parseInt(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Set for XXL Size Input */}
                    <div className="space-y-5">
                        <label htmlFor="set_xxl" className="block text-sm font-semibold text-gray-800 mb-1">
                            Set for XXL Size
                        </label>
                        <input
                            type="text"
                            id="set_xxl"
                            name="set_xxl"
                            value={setXXL}
                            onChange={(e) => setSetXXL(parseInt(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Success Message */}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                </div>
                {/* Submit Button */}
                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className="w-[20%] bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                    >
                        Add Stock
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStock;
