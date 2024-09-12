import React, {useEffect, useState} from 'react'
import axios from "axios";
import ViewItems from "../components/ViewItems";

function ViewItemsPage() {
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
        <ViewItems Email={email}/>
    )
}

export default ViewItemsPage
