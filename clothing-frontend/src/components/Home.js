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
        <div className="flex flex-col  fixed  items-center text-gray-800 min-h-screen ml-20">
            {/* Stat Boxes */}
            <div className="flex justify-around w-full mb-8">
                <div className="bg-gray-800 rounded-lg p-5 w-48 text-center text-white m-8 shadow-lg">
                    <h3 className="text-lg font-semibold">Revenue</h3>
                    <p className="text-xl">$34.5k</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 w-48 text-center text-white m-8 shadow-lg">
                    <h3 className="text-lg font-semibold">Orders</h3>
                    <p className="text-xl">811</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 w-48 text-center text-white m-8 shadow-lg">
                    <h3 className="text-lg font-semibold">Profit</h3>
                    <p className="text-xl">$2.3k</p>
                </div>
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg p-6 w-full md:w-4/5 shadow-lg">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Home;
