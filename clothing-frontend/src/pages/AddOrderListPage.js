import React, {useEffect, useState} from 'react'
import axios from "axios";
import AddOrderList from "../components/AddOrderList";

function AddOrderListPage() {const [email, setEmail] = useState('');
    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/`, {
                    withCredentials: true,
                });

                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getName();
    }, [!email]);


    return (
        <>
            { email && <AddOrderList Email={email}/>}
        </>
    )
}

export default AddOrderListPage
