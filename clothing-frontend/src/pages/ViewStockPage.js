import React, {useEffect, useState} from 'react'
import axios from "axios";
import ViewStock from "../components/Item";
import Product from "../components/Product";

function ViewStockPage() {
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
        <>
            { email && <ViewStock Email={email} />}
        </>
    )
}

export default ViewStockPage
