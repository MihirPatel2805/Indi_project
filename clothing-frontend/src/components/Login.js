import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

import {Link, useNavigate} from "react-router-dom";
import Register from "./Register";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const fetchUser = async (e) => {
        e.preventDefault();
        try{

            axios.post('http://localhost:8000/api/login/', {
                email: username,
                password:password,
            }, {
                withCredentials: true,  // This ensures cookies are included in requests
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log('Login successful:', response.data);
                    setUser(response.data.token);
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('Login error:', error);
                });


        }catch (e){
            setError(e.message)
        }
    }

    return ( 
        <div className='main'>
        <div className='blur'></div>
        <div className="login-container">
            <form onSubmit={fetchUser}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Link to="#" className='forgot-pass'>forgot password?</Link>
                <button type="submit">Login</button>

                {error && <p>{error}</p>}
                {user && <p>{user}</p>}
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </p>
            </form>
        </div>
    </div>
        
    );
};

export default Login;
