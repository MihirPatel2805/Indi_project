import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewParties = (props) => {
    const [parties, setParties] = useState([]);
    const [error, setError] = useState('');
    const userEmail = props.Email;
    const [design_no, setDesign_no] = useState('');
    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stock/viewParties/?email=${userEmail}`, {
                    withCredentials: true,
                });
                setParties(response.data);
            } catch (error) {
                // setError('Error fetching stock data');
                console.error('Error fetching stock data:', error);
            }
        };

        fetchParties();
    }, [userEmail]);
    // useEffect(() => {
    //
    //     searchItems();
    //
    // }, [design_no]);
    // const searchItems = async () => {
    //
    //     try{
    //         const response = await axios.post(`http://localhost:8000/stock/searchItems`, {
    //             design_no:design_no,
    //             email:userEmail,
    //         },{withCredentials: true})
    //         setParties(response.data);
    //     } catch (error) {
    //         setError('Error fetching stock data');
    //         console.error('Error fetching stock data:', error);
    //     }
    // }
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
            <div className="overflow-x-auto mt-5">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th scope="col" className="py-2 px-4 text-center">Partie Name</th>
                        <th scope="col" className="py-2 px-4 text-center">Mobile</th>
                        <th scope="col" className="py-2 px-4 text-center">GST NUMBER</th>
                        <th scope="col" className="py-2 px-4 text-center">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {parties.map(party => (
                        <tr key={party.id} className="even:bg-gray-100 odd:bg-gray-300">
                            <td className="py-2 px-4 text-center">{party.party_name}</td>
                            <td className="py-2 px-4 text-center">{party.mobile}</td>
                            <td className="py-2 px-4 text-center">{party.gst_number}</td>
                            <td className="py-2 px-4 text-center">{party.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewParties;
