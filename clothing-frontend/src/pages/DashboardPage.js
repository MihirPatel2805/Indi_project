import React, {useEffect, useState} from 'react'
import Dashboard from "../components/Dashboard";
import axios from "axios";

function DashboardPage() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/', {
                    withCredentials: true,
                });

                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getName();
    }, [email]);
    return (
        <>
            { email && <Dashboard/>}
        </>
    )
}

export default DashboardPage
