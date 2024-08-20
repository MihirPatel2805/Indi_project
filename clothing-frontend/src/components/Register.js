import React, { useState } from 'react';
import axios from 'axios';
import Login from "./Login";
import {Link, useNavigate} from "react-router-dom";

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
            const response = await axios.post('http://localhost:8000/api/register/', {
                name: name,
                email: email,
                password: password,
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
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <center><p>Already have Account? <Link to="/">Login</Link></p></center>

            </form>
        </div>
    );
};

export default Register;
