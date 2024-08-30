// import React, {Fragment, useEffect, useState} from 'react';
// import axios from 'axios';
//
// import {Link, useNavigate} from "react-router-dom";
// import Register from "./Register";
//
// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [user, setUser] = useState([])
//     const navigate = useNavigate();
//     const fetchUser = async (e) => {
//         e.preventDefault();
//         try{
//
//             axios.post('http://localhost:8000/api/login/', {
//                 email: username,
//                 password:password,
//             }, {
//                 withCredentials: true,  // This ensures cookies are included in requests
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//                 .then(response => {
//                     console.log('Login successful:', response.data);
//                     setUser(response.data.token);
//                     navigate('/dashboard');
//                 })
//                 .catch(error => {
//                     console.error('Login error:', error);
//                 });
//
//
//         }catch (e){
//             setError(e.message)
//         }
//     }
//
//     return (
//         <div className='main'>
//         <div className='blur'></div>
//         <div className="login-container">
//             <form onSubmit={fetchUser}>
//                 <h1>Login</h1>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Link to="#" className='forgot-pass'>forgot password?</Link>
//                 <button type="submit">Login</button>
//
//                 {error && <p>{error}</p>}
//                 {user && <p>{user}</p>}
//                 <p className="register-link">
//                     Don't have an account? <Link to="/register">Register now</Link>
//                 </p>
//             </form>
//         </div>
//     </div>
//
//     );
// };
//
// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const fetchUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/login/', {
                email: username,
                password: password,
            }, {
                withCredentials: true,
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
                    setError('Invalid email or password.');
                });

        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen w-full bg-[url('images/img1.jpeg')] bg-center  z-10" >
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
            <div className="relative bg-gray-300 p-10 rounded-lg shadow-xl max-w-sm w-full text-center font-serif">
                <form onSubmit={fetchUser}>
                    <h1 className="text-2xl font-semibold mb-6">Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    />
                    <div className="text-right mb-4">
                        <Link to="#" className="text-blue-700 hover:text-blue-800 text-sm">Forgot password?</Link>
                    </div>
                    <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">Login</button>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {user && <p className="text-green-600 mt-4">{user}</p>}
                    <p className="mt-6 text-sm text-gray-700">
                        Don't have an account? <Link to="/register" className="text-blue-700 hover:text-blue-800">Register now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
