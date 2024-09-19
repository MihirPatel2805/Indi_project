import React, {useEffect, useState} from 'react'
import axios from "axios";
import OrderHistoryDetails from "../components/OrderHistoryDetails";
import PurchaseHistoryDetails from "../components/PurchaseHistoryDetails";

function PurchaseDetailPage() {
    const [email, setEmail] = useState('');
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
    }, [email]);
    return (
        <>
            {email && <PurchaseHistoryDetails Email={email}/>}
        </>
    )
}

export default PurchaseDetailPage
