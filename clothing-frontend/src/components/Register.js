// . Please try again.');
//         }
//     };
//
//     return (
//         <div
//             style={{
//                 backgroundImage: "url('img1.jpeg')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//             className="min-h-screen flex items-center justify-center relative "
//         >
//             <div className="absolute inset-0 bg-gray-800 opacity-40 z-0"></div>
//             <div className="relative bg-gray-300 p-10 rounded-lg shadow-lg max-w-md w-full z-10">
//                 <form onSubmit={handleRegister}>
//                     <h1 className="text-2xl font-semibold text-gray-800 mb-6">Register</h1>
//                     <inputimport React, { useState } from 'react';
//                     import axios from 'axios';
//                     import { Link, useNavigate } from 'react-router-dom';
//                     import bgimage from './img1.jpeg'
//
//
//                     const Register = () => {
//                     const [name, setName] = useState('');
//                     const [email, setEmail] = useState('');
//                     const [password, setPassword] = useState('');
//                     const [password2, setPassword2] = useState('');
//                     const [error, setError] = useState('');
//                     const [success, setSuccess] = useState('');
//                     const navigate = useNavigate();
//
//                     const handleRegister = async (e) => {
//                     e.preventDefault();
//                     if (password !== password2) {
//                     setError("Passwords don't match");
//                     return;
//                 }
//
//                     try {
//                     await axios.post('http://localhost:8000/api/register/', {
//                     name,
//                     email,
//                     password,
//                 });
//                     setSuccess('Registration successful! Please log in.');
//                     setName('');
//                     setEmail('');
//                     setPassword('');
//                     setPassword2('');
//                     setError('');
//                     navigate('/');
//                 } catch (error) {
//                     setError('Registration failed
//                         type="text"
//                         placeholder="Username"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         value={password2}
//                         onChange={(e) => setPassword2(e.target.value)}
//                         required
//                         className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
//                     />
//                     <button
//                         type="submit"
//                         className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mt-4"
//                     >
//                         Register
//                     </button>
//                     {error && <p className="text-red-600 mt-4">{error}</p>}
//                     {success && <p className="text-green-600 mt-4">{success}</p>}
//                     <center>
//                         <p className="text-gray-700 mt-6">
//                             Already have an account? <Link to="/"
//                                                            className="text-blue-600 hover:text-blue-700">Login</Link>
//                         </p>
//                     </center>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default Register;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/register/', {
                username: username,
                email: email,
                password: password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log('Registration successful:', response.data);
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('Registration error:', error);
                    setError('Registration failed. Please try again.');
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    </div>
                    <button type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                        Register
                    </button>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">Sign
                    in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
