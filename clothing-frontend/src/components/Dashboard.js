// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Product from "./Product";
// import ViewStock from "./ViewStock";
// import Content from "./Content";
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
//         <div className="dashboard">
//             <div className="sidebar">
//                 <h2>Admin Dashboard</h2>
//                 <ul>
//                     <li className={`sidebar-item ${isDropdownActive(0) ? 'active' : ''}`}
//                         onClick={() => toggleDropdown(0)}>
//                         <a href="#">Stock Management</a>
//                         <span className={`arrow ${isDropdownActive(0) ? 'up' : 'down'}`}>
//                             &#11167;
//                         </span>
//                         {isDropdownActive(0) && (
//                             <ul className="dropdown">
//                                 <li>
//                                     <button onClick={() => setActiveContent(<Product Email={email} />)}>
//                                         Add Stock
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button onClick={() => setActiveContent(<ViewStock Email={email} />)}>
//                                         View Stock
//                                     </button>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                     <li className={`sidebar-item ${isDropdownActive(2) ? 'active' : ''}`} onClick={() => toggleDropdown(2)}>
//                         <a href="#">Order List</a>
//                         <span
//                             className={`arrow ${isDropdownActive(2) ? 'up' : 'down'}`}
//                         >
//                             &#11167;
//                         </span>
//                         {isDropdownActive(2) && (
//                             <ul className="dropdown">
//                                 <li><button href="#">Pending Orders</button></li>
//                                 <li><button href="#">Completed Orders</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li className={`sidebar-item ${isDropdownActive(3) ? 'active' : ''}`} onClick={() => toggleDropdown(3)}>
//                         <a href="#">Sales Analytics</a>
//                         <span
//                             className={`arrow ${isDropdownActive(3) ? 'up' : 'down'}`}
//                         >
//                             &#11167;
//                         </span>
//                         {isDropdownActive(3) && (
//                             <ul className="dropdown">
//                                 <li><button href="#">Monthly Sales</button></li>
//                                 <li><button href="#">Yearly Sales</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li className={`sidebar-item ${isDropdownActive(4) ? 'active' : ''}`}  onClick={() => toggleDropdown(4)}>
//                         <a href="#">Expenses</a>
//                         <span
//                             className={`arrow ${isDropdownActive(4) ? 'up' : 'down'}`}
//
//                         >
//                             &#11167;
//                         </span>
//                         {isDropdownActive(4) && (
//                             <ul className="dropdown">
//                                 <li><button href="#">View Expenses</button></li>
//                                 <li><button href="#">Add Expense</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li className={`sidebar-item ${isDropdownActive(5) ? 'active' : ''}`} onClick={() => toggleDropdown(5)}>
//                         <a href="#">Settings</a>
//                         <span
//                             className={`arrow ${isDropdownActive(5) ? 'up' : 'down'}`}
//                         >
//                             &#11167;
//                         </span>
//                         {isDropdownActive(5) && (
//                             <ul className="dropdown">
//                                 <li><button href="#">Profile</button></li>
//                                 <li><button href="#">Account Settings</button></li>
//                             </ul>
//                         )}
//                     </li>
//                 </ul>
//                 <div className="logout-link">
//                     <a href="#" onClick={handleLogout}>Log out</a>
//                 </div>
//             </div>
//             <div className="main-content">
//                 <header>
//                     <h1>Welcome, {username}</h1>
//                 </header>
//                 <div className="content">
//                     {activeContent}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from "./Product";
import ViewStock from "./ViewStock";
import Content from "./Content";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [activeDropdowns, setActiveDropdowns] = useState([]); // Track active dropdowns
    const [activeContent, setActiveContent] = useState(<Content />); // Default content
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

    const toggleDropdown = (index) => {
        setActiveDropdowns((prev) =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const isDropdownActive = (index) => {
        return activeDropdowns.includes(index);
    };

    return (
        <div className="flex min-h-screen overflow-hidden font-serif">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white fixed h-full overflow-y-auto flex flex-col justify-between">
                <div className="p-5">
                    <h2 className="text-2xl text-center mb-5">Admin Dashboard</h2>
                    <ul className="space-y-3">
                        <li className={`relative ${isDropdownActive(0) ? 'bg-gray-700' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(0)}
                                className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
                            >
                                Stock Management
                                <span className={`transform ${isDropdownActive(0) ? 'rotate-180' : 'rotate-90'}`}>
                  &#11167;
                </span>
                            </button>
                            {isDropdownActive(0) && (
                                <ul className="pl-5 mt-2 space-y-2">
                                    <li>
                                        <button
                                            onClick={() => setActiveContent(<Product Email={email} />)}
                                            className="text-sm hover:text-gray-300"
                                        >
                                            Add Stock
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveContent(<ViewStock Email={email} />)}
                                            className="text-sm hover:text-gray-300"
                                        >
                                            View Stock
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={`relative ${isDropdownActive(2) ? 'bg-gray-700' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(2)}
                                className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
                            >
                                Order List
                                <span className={`transform ${isDropdownActive(2) ? 'rotate-180' : 'rotate-90'}`}>
                  &#11167;
                </span>
                            </button>
                            {isDropdownActive(2) && (
                                <ul className="pl-5 mt-2 space-y-2">
                                    <li><button className="text-sm hover:text-gray-300">Pending Orders</button></li>
                                    <li><button className="text-sm hover:text-gray-300">Completed Orders</button></li>
                                </ul>
                            )}
                        </li>
                        <li className={`relative ${isDropdownActive(3) ? 'bg-gray-700' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(3)}
                                className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
                            >
                                Sales Analytics
                                <span className={`transform ${isDropdownActive(3) ? 'rotate-180' : 'rotate-90'}`}>
                  &#11167;
                </span>
                            </button>
                            {isDropdownActive(3) && (
                                <ul className="pl-5 mt-2 space-y-2">
                                    <li><button className="text-sm hover:text-gray-300">Monthly Sales</button></li>
                                    <li><button className="text-sm hover:text-gray-300">Yearly Sales</button></li>
                                </ul>
                            )}
                        </li>
                        <li className={`relative ${isDropdownActive(4) ? 'bg-gray-700' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(4)}
                                className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
                            >
                                Expenses
                                <span className={`transform ${isDropdownActive(4) ? 'rotate-180' : 'rotate-90'}`}>
                  &#11167;
                </span>
                            </button>
                            {isDropdownActive(4) && (
                                <ul className="pl-5 mt-2 space-y-2">
                                    <li><button className="text-sm hover:text-gray-300">View Expenses</button></li>
                                    <li><button className="text-sm hover:text-gray-300">Add Expense</button></li>
                                </ul>
                            )}
                        </li>
                        <li className={`relative ${isDropdownActive(5) ? 'bg-gray-700' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(5)}
                                className="flex justify-between w-full px-3 py-2 hover:bg-gray-700 transition duration-200"
                            >
                                Settings
                                <span className={`transform ${isDropdownActive(5) ? 'rotate-180' : 'rotate-90'}`}>
                  &#11167;
                </span>
                            </button>
                            {isDropdownActive(5) && (
                                <ul className="pl-5 mt-2 space-y-2">
                                    <li><button className="text-sm hover:text-gray-300">Profile</button></li>
                                    <li><button className="text-sm hover:text-gray-300">Account Settings</button></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="p-5">
                    <button onClick={handleLogout} className="w-full py-2 text-center bg-gray-700 hover:bg-teal-500 transition duration-300 rounded-lg">
                        Log out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">
                <header className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Welcome, {username}</h1>
                </header>
                <div className="mt-5  h-[80vh] flex justify-center">
                    {activeContent}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
