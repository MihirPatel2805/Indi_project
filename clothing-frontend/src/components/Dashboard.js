import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [activeDropdowns, setActiveDropdowns] = useState([]); // Track active dropdowns
    const navigate = useNavigate();

    useEffect(() => {
        const getName = async () => {
            axios.get('http://localhost:8000/api/user/', {
                withCredentials: true,
            })
                .then(response => {
                    setUsername(response.data.name);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        };
        getName();
    }, []);

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout/', {}, {
            withCredentials: true,
        })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    const toggleDropdown = (index) => {
        if (activeDropdowns.includes(index)) {
            setActiveDropdowns(activeDropdowns.filter(i => i !== index));
        } else {
            setActiveDropdowns([...activeDropdowns, index]);
        }
    };

    const isDropdownActive = (index) => {
        return activeDropdowns.includes(index);
    };

    return (
        <div class="dashboard">
            <div class="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li class={`sidebar-item ${isDropdownActive(0) ? 'active' : ''}`}
                        onClick={() => toggleDropdown(0)}
                    >
                        <a href="#">Dashboard</a>
                        <span class={`arrow ${isDropdownActive(0) ? 'up' : 'down'}`}>
                            &#11167;
                        </span>
                        {isDropdownActive(0) && (
                            <ul class="dropdown">
                                <li><a href="#">Sub Page 1</a></li>
                                <li><a href="#">Sub Page 2</a></li>
                            </ul>
                        )}
                    </li>
                    <li class={`sidebar-item ${isDropdownActive(1) ? 'active' : ''}`}
                        onClick={() => toggleDropdown(1)}
                    >
                        <a href="#">Stock Management</a>
                        <span
                            class={`arrow ${isDropdownActive(1) ? 'up' : 'down'}`}
                        >
                            &#11167;
                        </span>
                        {isDropdownActive(1) && (
                            <ul class="dropdown">
                                <li><a href="#">View Stock</a></li>
                                <li><a href="#">Add Stock</a></li>
                            </ul>
                        )}
                    </li>
                    <li class={`sidebar-item ${isDropdownActive(2) ? 'active' : ''}`} onClick={() => toggleDropdown(2)}>
                        <a href="#">Order List</a>
                        <span
                            class={`arrow ${isDropdownActive(2) ? 'up' : 'down'}`}
                        >
                            &#11167;
                        </span>
                        {isDropdownActive(2) && (
                            <ul class="dropdown">
                                <li><a href="#">Pending Orders</a></li>
                                <li><a href="#">Completed Orders</a></li>
                            </ul>
                        )}
                    </li>
                    <li class={`sidebar-item ${isDropdownActive(3) ? 'active' : ''}`} onClick={() => toggleDropdown(3)}>
                        <a href="#">Sales Analytics</a>
                        <span
                            class={`arrow ${isDropdownActive(3) ? 'up' : 'down'}`}
                        >
                            &#11167;
                        </span>
                        {isDropdownActive(3) && (
                            <ul class="dropdown">
                                <li><a href="#">Monthly Sales</a></li>
                                <li><a href="#">Yearly Sales</a></li>
                            </ul>
                        )}
                    </li>
                    <li class={`sidebar-item ${isDropdownActive(4) ? 'active' : ''}`}  onClick={() => toggleDropdown(4)}>
                        <a href="#">Expenses</a>
                        <span
                            class={`arrow ${isDropdownActive(4) ? 'up' : 'down'}`}

                        >
                            &#11167;
                        </span>
                        {isDropdownActive(4) && (
                            <ul class="dropdown">
                                <li><a href="#">View Expenses</a></li>
                                <li><a href="#">Add Expense</a></li>
                            </ul>
                        )}
                    </li>
                    <li class={`sidebar-item ${isDropdownActive(5) ? 'active' : ''}`} onClick={() => toggleDropdown(5)}>
                        <a href="#">Settings</a>
                        <span
                            class={`arrow ${isDropdownActive(5) ? 'up' : 'down'}`}
                        >
                            &#11167;
                        </span>
                        {isDropdownActive(5) && (
                            <ul class="dropdown">
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Account Settings</a></li>
                            </ul>
                        )}
                    </li>
                </ul>
                <div class="logout-link">
                    <a href="#" onClick={handleLogout}>Log out</a>
                </div>
            </div>
            <div class="main-content">
                <header>
                    <h1>Welcome, {username}</h1>
                </header>
                <div class="content">
                    <p>This is the main content area where you can manage your dashboard features.</p>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
