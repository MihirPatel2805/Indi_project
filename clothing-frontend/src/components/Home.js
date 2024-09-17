// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
//
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//
// const Home = () => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [],
//     });
//
//     // Fetch data from backend API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // const response = await axios.get('YOUR_BACKEND_API_URL/api/monthly-data');
//                 // const data = response.data;
//                 const data = {
//                     "labels": ["January", "February", 'March', "December"],
//                     "profit": [5000, 7000, 5000, 9000],
//                     "purchase": [3000, 4500, 5000, 6000],
//                     "income": [2000, 2500, 5000, 3000]
//             }
//
//
//                 // Setting up the chart data
//                 setChartData({
//                     labels: data.labels,
//                     datasets: [
//                         {
//                             label: 'Total Profit',
//                             data: data.profit,
//                             borderColor: 'black',
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                         },
//                         {
//                             label: 'Total Purchase',
//                             data: data.purchase,
//                             borderColor: 'rgba(255, 99, 132, 1)',
//                             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                         },
//                         {
//                             label: 'Total Income',
//                             data: data.income,
//                             borderColor: 'rgba(54, 162, 235, 1)',
//                             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         },
//                     ],
//                 });
//                 console.log(chartData)
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Monthly Data Overview',
//             },
//         },
//     };
//
//     return (
//         <div className="w-full h-auto p-5">
//             <h2 className="text-center text-xl font-bold mb-5">Monthly Profit, Purchase, and Income</h2>
//             <Line data={chartData} options={options} />
//         </div>
//     );
// };
//
// export default Home;
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Profit',
                data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Revenue',
                data: [1500, 2300, 4000, 5500, 3000, 4000, 5000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Earnings Overview',
            },
        },
    };

    return (
        <div style={styles.container}>
            {/* Stat Boxes */}
            <div style={styles.statContainer}>
                <div style={styles.statBox}>
                    <h3>Revenue</h3>
                    <p>$34.5k</p>
                </div>
                <div style={styles.statBox}>
                    <h3>Orders</h3>
                    <p>811</p>
                </div>
                <div style={styles.statBox}>
                    <h3>Profit</h3>
                    <p>$2.3k</p>
                </div>
            </div>

            {/* Earnings Chart */}
            <div style={styles.chartContainer}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#181818',
        color: '#fff',
        minHeight: '100vh',
    },
    statContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '40px',
    },
    statBox: {
        backgroundColor: '#1f1f1f',
        borderRadius: '12px',
        padding: '20px',
        width: '200px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    chartContainer: {
        width: '80%',
        backgroundColor: '#1f1f1f',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default Home;
