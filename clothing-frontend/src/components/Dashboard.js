// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Product from "./Product";
// import ViewStock from "./ViewStock";
// import Content from "./Content";
// import ViewItems from "./ViewItems";
//
// const Dashboard = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState('');
//     const [activeDropdowns, setActiveDropdowns] = useState([]); // Track active dropdowns
//     const [activeContent, setActiveContent] = useState(<Content />); // Default content
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const getName = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/user/', {
//                     withCredentials: true,
//                 });
//                 setUsername(response.data.name);
//                 setEmail(response.data.email);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };
//         getName();
//     }, []);
//
//     const handleLogout = async () => {
//         try {
//             await axios.post('http://localhost:8000/api/logout/', {}, {
//                 withCredentials: true,
//             });
//             navigate('/');
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };
//
//     const toggleDropdown = (index) => {
//         setActiveDropdowns((prev) =>
//             prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//         );
//     };
//
//     const isDropdownActive = (index) => {
//         return activeDropdowns.includes(index);
//     };
//
//     return (
//         <div className="flex min-h-screen overflow-hidden font-serif">
//             {/* Sidebar */}
//             <div className="w-64 bg-gray-800 text-white fixed h-full overflow-y-auto flex flex-col justify-between">
//                 <div className="p-5">
//                     <h2 className="text-2xl text-center mb-5">Admin Dashboard</h2>
//                     <ul className="space-y-3">
//                         <li className={`relative ${isDropdownActive(0) ? 'bg-gray-700' : ''}`}>
//                             <button
//                                 onClick={() => {
//                                     toggleDropdown(0)
//                                     setActiveContent(<ViewItems Email={email}/>)
//                                     }
//                                 }
//                                 className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
//                             >
//                                 Items
//                                 <span className={`transform ${isDropdownActive(0) ? 'rotate-180' : 'rotate-90'}`}>
//                   &#11167;
//                 </span>
//                             </button>
//                             {isDropdownActive(0) && (
//                                 <ul className="pl-5 mt-2 space-y-2">
//                                     <li>
//                                         <button
//                                             onClick={() => setActiveContent(<Product Email={email} />)}
//                                             className="text-sm hover:text-gray-300"
//                                         >
//                                             Add Items
//                                         </button>
//                                     </li>
//                                     <li>
//                                         <button
//                                             onClick={() => setActiveContent(<ViewStock Email={email} />)}
//                                             className="text-sm hover:text-gray-300"
//                                         >
//                                             View Stock
//                                         </button>
//                                     </li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li className={`relative ${isDropdownActive(2) ? 'bg-gray-700' : ''}`}>
//                             <button
//                                 onClick={() => toggleDropdown(2)}
//                                 className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
//                             >
//                                 Order List
//                                 <span className={`transform ${isDropdownActive(2) ? 'rotate-180' : 'rotate-90'}`}>
//                   &#11167;
//                 </span>
//                             </button>
//                             {isDropdownActive(2) && (
//                                 <ul className="pl-5 mt-2 space-y-2">
//                                     <li><button className="text-sm hover:text-gray-300">Pending Orders</button></li>
//                                     <li><button className="text-sm hover:text-gray-300">Completed Orders</button></li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li className={`relative ${isDropdownActive(3) ? 'bg-gray-700' : ''}`}>
//                             <button
//                                 onClick={() => toggleDropdown(3)}
//                                 className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
//                             >
//                                 Sales Analytics
//                                 <span className={`transform ${isDropdownActive(3) ? 'rotate-180' : 'rotate-90'}`}>
//                   &#11167;
//                 </span>
//                             </button>
//                             {isDropdownActive(3) && (
//                                 <ul className="pl-5 mt-2 space-y-2">
//                                     <li><button className="text-sm hover:text-gray-300">Monthly Sales</button></li>
//                                     <li><button className="text-sm hover:text-gray-300">Yearly Sales</button></li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li className={`relative ${isDropdownActive(4) ? 'bg-gray-700' : ''}`}>
//                             <button
//                                 onClick={() => toggleDropdown(4)}
//                                 className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
//                             >
//                                 Expenses
//                                 <span className={`transform ${isDropdownActive(4) ? 'rotate-180' : 'rotate-90'}`}>
//                   &#11167;
//                 </span>
//                             </button>
//                             {isDropdownActive(4) && (
//                                 <ul className="pl-5 mt-2 space-y-2">
//                                     <li><button className="text-sm hover:text-gray-300">View Expenses</button></li>
//                                     <li><button className="text-sm hover:text-gray-300">Add Expense</button></li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li className={`relative ${isDropdownActive(5) ? 'bg-gray-700' : ''}`}>
//                             <button
//                                 onClick={() => toggleDropdown(5)}
//                                 className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
//                             >
//                                 Settings
//                                 <span className={`transform ${isDropdownActive(5) ? 'rotate-180' : 'rotate-90'}`}>
//                   &#11167;
//                 </span>
//                             </button>
//                             {isDropdownActive(5) && (
//                                 <ul className="pl-5 mt-2 space-y-2">
//                                     <li><button className="text-sm hover:text-gray-300">Profile</button></li>
//                                     <li><button className="text-sm hover:text-gray-300">Account Settings</button></li>
//                                 </ul>
//                             )}
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="p-5">
//                     <button onClick={handleLogout} className="w-full py-2 text-center bg-gray-700 hover:bg-teal-500 transition duration-300 rounded-lg">
//                         Log out
//                     </button>
//                 </div>
//             </div>
//
//             {/* Main Content */}
//             <div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">
//                 <header className="bg-gray-100 p-4 rounded-lg shadow-md">
//                     <h1 className="text-2xl font-bold text-center text-gray-800">Welcome, {username}</h1>
//                 </header>
//                 <div className="mt-5  h-[80vh] flex justify-center">
//                     {activeContent}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Product from "./Product";
import ViewStock from "./ViewStock";
import Content from "./Content";
import ViewItems from "./ViewItems";
import axios from "axios";

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
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
                <div className="flex items-center justify-center p-4 border-b border-gray-700">
                    {/* Logo or Profile Image */}
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <span className="ml-3 text-xl font-semibold">My Company</span>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-4">
                    {/* Home Link */}
                    <Link to="/dashboard" className="flex items-center text-gray-300 hover:text-white">
                        {/*<span className="material-icons">home</span>*/}
                        <span className="ml-2">Home</span>
                    </Link>

                    {/* Parties Link */}
                    <div className="relative flex w-full space-y-4 ">
                        <Link
                            to="/parties"
                            className="flex w-full items-center text-gray-300 hover:text-white justify-between"
                        >
                            {/*<span className="material-icons">groups</span>*/}
                            <span className="ml-2">Parties</span>
                            <span className='ml-2 text-2xl'>+</span>
                        </Link>
                    </div>

                    {/* Items Link */}
                    <div className="relative">
                        <Link
                            to="/dashboard"
                            className="flex w-full items-center text-gray-300 hover:text-white justify-between"
                            onClick={() => setActiveContent(<Product Email={email} />)}
                        >
                            {/*<span className="material-icons">inventory_2</span>*/}
                            <span className="ml-2">Items</span>
                            <span className='ml-2 text-2xl'>+</span>
                        </Link>
                    </div>

                    {/* Sale Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-gray-300 hover:text-white w-full"
                            onClick={() => setShowSaleDropdown(!showSaleDropdown)}
                        >
                            {/*<span className="material-icons">shopping_cart</span>*/}
                            <span className="ml-2">Sale</span>
                            <span className="ml-auto material-icons">{showSaleDropdown ? '^' : 'V'}</span>
                        </button>
                        {showSaleDropdown && (
                            <div className="pl-8 mt-2 space-y-2">
                                <Link to="/sale/new" className="block text-gray-300 hover:text-white">New Sale</Link>
                                <Link to="/sale/history" className="block text-gray-300 hover:text-white">Sale History</Link>
                            </div>
                        )}
                    </div>

                    {/* Purchase Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-gray-300 hover:text-white w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            {/*<span className="material-icons">receipt_long</span>*/}
                            <span className="ml-2">Purchase</span>
                            <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-8 mt-2 space-y-2">
                                <Link to="/purchase/new" className="block text-gray-300 hover:text-white">New Purchase</Link>
                                <Link to="/purchase/history" className="block text-gray-300 hover:text-white">Purchase History</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-50">
                {/* Content Header */}
                <div className="bg-white h-20 w-full">
                    {/*<h1 className="text-2xl font-bold text-gray-800"><input type="text" placeholder='Enter Business Name'/></h1>*/}
                    {/*<p className="text-gray-600">Enter details to make your first sale...</p>*/}
                </div>

                {/* Placeholder for Right Side Content */}
                <div className="bg-gray-200 p-6 rounded shadow-md h-full">
                    {/*<div className="mt-5  h-[80vh] flex justify-center">*/}
                        {activeContent}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
