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
                                    <button onClick={() => setActiveContent(<Product Email={email} />)}>
                                        Sub Page 1
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveContent(<ViewStock Email={email} />)}>
                                        Sub Page 2
                                    </button>
                                </li>
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
                    <h1>Welcome, {username}</h1>
                </header>
                <div className="content">
                    {activeContent}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
