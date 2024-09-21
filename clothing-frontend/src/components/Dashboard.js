import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [showSaleDropdown, setShowSaleDropdown] = useState(false);
    const [showPartiesDropdown, setShowPartiesDropdown] = useState(false);
    const [showItemsDropdown, setShowItemsDropdown] = useState(false);
    const [showStockDropdown, setShowStockDropdown] = useState(false);
    const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/`, {
                    withCredentials: true,
                });
                setUsername(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getName();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/logout/`, {}, {
                withCredentials: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#F4F4F8]">
            {/* Sidebar */}
            <aside className="w-[250px] bg-[#FFFFFF] text-white fixed h-full shadow-lg flex flex-col">
                <div className="flex items-center justify-center py-6 bg-[#181818] w-full">
                    
                    <span className="ml-4 text-xl font-bold">{username}</span>
                </div>

                {/* Navigation Links */}
                <nav className="mt-8 space-y-6 p-4 flex-grow">
                    <Link to="/dashboard" className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E]">
                        <span className="ml-2">Home</span>
                    </Link>

                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPartiesDropdown(!showPartiesDropdown)}
                        >
                            <span className="ml-2">Parties</span>
                            <span className="ml-auto">{showPartiesDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPartiesDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addParty" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add Party</Link>
                                <Link to="/dashboard/viewParties" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Parties</Link>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowItemsDropdown(!showItemsDropdown)}
                        >
                            <span className="ml-2">Items</span>
                            <span className="ml-auto">{showItemsDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showItemsDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addItems" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add Items</Link>
                                <Link to="/dashboard/viewItems" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Items</Link>
                            </div>
                        )}
                    </div>

                    {/* Sale Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowSaleDropdown(!showSaleDropdown)}
                        >
                            <span className="ml-2">Order</span>
                            <span className="ml-auto">{showSaleDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showSaleDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addOrderList" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">New Order</Link>
                                <Link to="/dashboard/orderHistory" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Order History</Link>
                            </div>
                        )}
                    </div>

                    {/* Stock Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowStockDropdown(!showStockDropdown)}
                        >
                            <span className="ml-2">Stock</span>
                            <span className="ml-auto">{showStockDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showStockDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addStock" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add Stock</Link>
                                <Link to="/dashboard/viewStock" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Stock</Link>
                            </div>
                        )}
                    </div>

                    {/* Purchase Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            <span className="ml-2">Purchase</span>
                            <span className="ml-auto">{showPurchaseDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/purchaseitemsList" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">New Purchase</Link>
                                <Link to="/dashboard/purchaseHistory" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Purchase History</Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="p-2 text-center bg-gray-900">
                    <a href="#" className="text-white no-underline text-lg font-bold block p-2 bg-[#181818] rounded-md hover:bg-[#E6859E] transition-colors duration-300" onClick={handleLogout}>Log Out</a>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow bg-[#F8F8FC] ml-[250px] p-6">
                {/* Content Header */}
                <div className="bg-[#FFFFFF] h-[10vh] flex items-center pl-4 border-b border-gray-300 shadow-md">
                    <h1 className="text-2xl font-bold text-[#3A0A3E]">Welcome to <span className="text-[#E6859E]">TeeStockPro</span></h1>
                </div>

                {/* Placeholder for Right Side Content */}
                <div className="mt-6 bg-[#FFFFFF] p-6 h-[85%] rounded-lg shadow-md">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

