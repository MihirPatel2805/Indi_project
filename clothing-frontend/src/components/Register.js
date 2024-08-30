// import React, { useState } from 'react';
// import axios from 'axios';
// import Login from "./Login";
// import {Link, useNavigate} from "react-router-dom";
//
// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [password2, setPassword2] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         if (password !== password2) {
//             setError("Passwords don't match");
//             return;
//         }
//
//         try {
//             const response = await axios.post('http://localhost:8000/api/register/', {
//                 name: name,
//                 email: email,
//                 password: password,
//             });
//             setSuccess('Registration successful! Please log in.');
//             setName('');
//             setEmail('');
//             setPassword('');
//             setPassword2('');
//             setError('');
//             navigate('/');
//         } catch (error) {
//             setError('Registration failed. Please try again.');
//         }
//     };
//
//     return (
//         <div className='main'>
//         <div className='blur'></div>
//         <div className="register-container">
//             <form onSubmit={handleRegister}>
//                 <h1>Register</h1>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={password2}
//                     onChange={(e) => setPassword2(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Register</button>
//                 {error && <p className="error">{error}</p>}
//                 {success && <p className="success">{success}</p>}
//                 <center><p>Already have an account? <Link to="/">Login</Link></p></center>
//
//             </form>
//         </div>
//     </div>
//     );
// };
//
// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bgimage from './img1.jpeg'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords don't match");
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/register/', {
                name,
                email,
                password,
            });
            setSuccess('Registration successful! Please log in.');
            setName('');
            setEmail('');
            setPassword('');
            setPassword2('');
            setError('');
            navigate('/');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('img1.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="min-h-screen flex items-center justify-center relative "
        >
            <div className="absolute inset-0 bg-gray-800 opacity-40 z-0"></div>
            <div className="relative bg-gray-300 p-10 rounded-lg shadow-lg max-w-md w-full z-10">
                <form onSubmit={handleRegister}>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Register</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-green-600 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mt-4"
                    >
                        Register
                    </button>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                    {success && <p className="text-green-600 mt-4">{success}</p>}
                    <center>
                        <p className="text-gray-700 mt-6">
                            Already have an account? <Link to="/"
                                                           className="text-blue-600 hover:text-blue-700">Login</Link>
                        </p>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default Register;
