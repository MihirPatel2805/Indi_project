import React, {useEffect, useState} from 'react'
import axios from "axios";
import AddStock from "../components/AddStock";

function AddStockPage() {
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
    }, []);
    return (
        <AddStock Email={email}/>
    )
}

export default AddStockPage
