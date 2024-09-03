
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
//
// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [user, setUser] = useState([]);
//     const navigate = useNavigate();
//
//     const fetchUser = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8000/api/login/', {
//                 email: username,
//                 password: password,
//             }, {
//                 withCredentials: true,
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
//                     setError('Invalid email or password.');
//                 });
//
//         } catch (e) {
//             setError(e.message);
//         }
//     };
//
//     return (
//         <div className="relative flex justify-center items-center h-screen w-full bg-[url('images/img1.jpeg')] bg-center  z-10" >
//             <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
//             <div className="relative bg-gray-300 p-10 rounded-lg shadow-xl max-w-sm w-full text-center font-serif">
//                 <form onSubmit={fetchUser}>
//                     <h1 className="text-2xl font-semibold mb-6">Login</h1>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
//                     />
//                     <div className="text-right mb-4">
//                         <Link to="#" className="text-blue-700 hover:text-blue-800 text-sm">Forgot password?</Link>
//                     </div>
//                     <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">Login</button>
//
//                     {error && <p className="text-red-500 mt-4">{error}</p>}
//                     {user && <p className="text-green-600 mt-4">{user}</p>}
//                     <p className="mt-6 text-sm text-gray-700">
//                         Don't have an account? <Link to="/register" className="text-blue-700 hover:text-blue-800">Register now</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('Login error:', error);
                    setError('Invalid username or password.');
                });
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-6">
                    {/* Logo or Icon */}
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox"
                                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember
                                me</label>
                        </div>
                        <div className="text-sm">
                            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your
                                password?</Link>
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                        Sign in
                    </button>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register"
                                                 className="font-medium text-blue-600 hover:text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
