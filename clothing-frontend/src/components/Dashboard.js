import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from "./Product";
import {render} from "@testing-library/react";
import ReactDOM from "react-dom/client";
// const UserEmailContext = createContext(); // Export the context properly

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [activeDropdowns, setActiveDropdowns] = useState([]); // Track active dropdowns
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
    const root = ReactDOM.createRoot(document.getElementById('root'));
    return (
        // <UserEmailContext.Provider value={email}> {/* Provide the email context */}
            <div className="dashboard">
                <div className="sidebar">
                    <h2>Admin Dashboard</h2>
                    <ul>
                        <li className={`sidebar-item ${isDropdownActive(0) ? 'active' : ''}`}
                            onClick={() => toggleDropdown(0)}>
                            <a href="#">Dashboard</a>
                            <span className={`arrow ${isDropdownActive(0) ? 'up' : 'down'}`}>
                                &#11167;
                            </span>
                            {isDropdownActive(0) && (
                                <ul className="dropdown">
                                    <li>
                                        <button onClick={() => root.render(<Product Email={email}/>)}>Sub Page 1</button>
                                    </li>
                                    <li><a href="#">Sub Page 2</a></li>
                                </ul>
                            )}
                        </li>
                        {/* Additional Sidebar Items */}
                    </ul>
                    <div className="logout-link">
                        <a href="#" onClick={handleLogout}>Log out</a>
                    </div>
                </div>
                <div className="main-content">
                    <header>
                        <h1>Welcome, {username} {email}</h1>
                    </header>
                    <div className="content">
                        <p>This is the main content area where you can manage your dashboard features.</p>
                    </div>
                </div>
            </div>
        // </UserEmailContext.Provider>
    );
};

export default Dashboard;
// export {UserEmailContext}
