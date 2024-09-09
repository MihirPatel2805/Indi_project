import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Product from "./Product";
import ViewStock from "./ViewStock";
import Content from "./Content";
import ViewItems from "./ViewItems";
import axios from "axios";
import AddParties from "./AddParties";
import ViewParties from "./ViewParties";
import AddOrderList from "./AddOrderList";
import AddStock from "./AddStock";
const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [showSaleDropdown, setShowSaleDropdown] = useState(false);
    const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false);
    const [activeContent, setActiveContent] = useState(<Content />);
    const navigate = useNavigate();


    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/', {
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
            await axios.post('http://localhost:8000/api/logout/', {}, {
                withCredentials: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className="flex bg-sec h-[100vh] w-[100vw] ">
            {/* Sidebar */}
            <aside className="w-[20%] bg-sec text-tri font-bold flex-shrink-0 rounded-2xl fixed h-full">
                <div className="flex items-center justify-center p-4 border-b border-gray-700">
                    {/* Logo or Profile Image */}
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <span className="ml-3 text-xl font-bold font-semibold">My Company</span>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-4">
                    {/* Home Link */}
                    {/*<FontAwesomeIcon icon="fa-solid fa-house" style={{color: "#808080",}} />*/}
                    <Link to="/dashboard" className="flex items-center text-tri font-bold hover:text-white">
                        {/*<span className="material-icons">home</span>*/}
                        <span className="ml-2">Home</span>
                    </Link>

                    {/* Parties Link */}
                    <div className="relative flex w-full space-y-4 ">
                        <Link
                            className="flex w-full items-center text-tri font-bold hover:text-white justify-between">
                            {/*<span className="material-icons">groups</span>*/}
                            <span className="ml-2"
                                  onClick={()=>setActiveContent(<ViewParties Email={email} />)}
                            >Parties</span>
                            <span className='ml-2 text-2xl' onClick={()=>setActiveContent(<AddParties Email={email} />)}>+</span>
                        </Link>
                    </div>

                    {/* Items Link */}
                    <div className="relative">
                        <Link
                            to="/dashboard"
                            className="flex w-full items-center text-tri font-bold hover:text-white justify-between">
                            {/*<span className="material-icons">inventory_2</span>*/}
                            <span className="ml-2"
                                  onClick={()=>setActiveContent(<ViewItems Email={email} />)}
                            >Items</span>
                            <span className='ml-2 text-2xl'
                                  onClick={() => setActiveContent(<Product Email={email} />)}
                            >+</span>
                        </Link>
                    </div>

                    {/* Sale Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-tri font-bold hover:text-white w-full"
                            onClick={() => setShowSaleDropdown(!showSaleDropdown)}
                        >
                            {/*<span className="material-icons">shopping_cart</span>*/}
                            <span className="ml-2">Sale</span>
                            <span className="ml-auto material-icons">{showSaleDropdown ? '^' : 'V'}</span>
                        </button>
                        {showSaleDropdown && (
                            <div className="pl-8 mt-2 space-y-2">
                                <Link className="block text-tri font-bold hover:text-white"
                                      onClick={()=>setActiveContent(<AddOrderList Email={email} />)}
                                >New Order</Link>
                                <Link className="block text-gray-300 font-bold hover:text-white">Sale History</Link>
                            </div>
                        )}
                    </div>

                    {/* Purchase Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-tri font-bold hover:text-white w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            {/*<span className="material-icons">receipt_long</span>*/}
                            <span className="ml-2">Purchase</span>
                            <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-8 mt-2 space-y-2">
                                <Link onClick={()=>setActiveContent(<AddStock Email={email} />)} className="block text-tri hover:text-white">New Purchase</Link>
                                <Link to="/purchase/history" className="block text-pri font-bold hover:text-white">Purchase History</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className=" flex-auto ml-5 bg-sec ml-[21%] w-[80%] mr-[2%]">
                {/* Content Header */}
                <div className="bg-sec h-[10vh] text-tri flex justify-start pl-5 items-center fixed w-full">
                    <h1 className="text-2xl font-bold text-tri">Welcome to <span className='text-tri font-bold-2'>TeeStockPro</span></h1>
                    {/*<p className="text-gray-600">Enter details to make your first sale...</p>*/}

                </div>

                {/* Placeholder for Right Side Content */}
                <div className="bg-pri p-6  h-[83vh] rounded-3xl mt-[7%] overflow-y-hidden">
                    {/*<div className="mt-5  h-[80vh] flex justify-center">*/}
                        {activeContent}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
