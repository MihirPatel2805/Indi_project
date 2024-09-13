const express = require('express');
const axios = require("axios");
const cors = require('cors')
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only your frontend origin
    credentials: true,  // Enable credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use(express.json());

// Utility function to validate mobile
const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
    return mobileRegex.test(mobile);
};

// Utility function to validate GST number
const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    return gstRegex.test(gst);
};

const validateSet = (setNum) =>{
    if (setNum < 0){
        return false
    }else{
        return true
    }
}
const validateTotalset = (set_m,set_l,set_xl,set_xxl,set_total) =>{
    if (set_m + set_l + set_xl + set_xxl == set_total){
        return true
    }else {
        return false
    }
}
// Route to handle adding a new party
app.post('/parties/add', async (req, res) =>  {
    const { email,party_name, mobile, gst_number, address } = req.body;
    console.log(req.body)
    // Validate mobile number
    if (!validateMobile(mobile)) {
        return res.status(400).json({ error: 'Invalid mobile number.' });
    }

    // Validate GST number
    if (!validateGST(gst_number)) {
        return res.status(400).json({ error: 'Invalid GST number.' });
    }

    // Process and save party details (you can integrate a database here)
    const djangoResponse = await axios.post('http://localhost:8000/stock/addParties/', {
        email:email,
        party_name: party_name,
        mobile:mobile,
        gst_number: gst_number,
        address:address,
    }, {
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json',
    },
    });

    console.log('Response from Django API:', djangoResponse.data);

    res.status(200).json({ message: 'Party added successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
