import { Activity } from "../types/type";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    activities: Activity[];
};

const RecentActivities = ({ activities }: Props) => {
    
    //Filter for activities startrs here
    const [selectedAccountType, setSelectedAccountType] = useState<string | 'All'>('All');

    // Filter transactions based on selected account type
    const filteredActivities = selectedAccountType === 'All'
        ? activities
        : activities.filter(activity => activity.accountType === selectedAccountType);

    if (!filteredActivities || filteredActivities.length === 0) return <h1>No Activities.</h1>;


    // Predefined categories
    const categories = [
        "General",
        "Food and Groceries",
        "Transportation and Car Gas",
        "Utility Bills",
        "Entertainment",
        "CellPhone and Internet Bills",
    ];
        // Group expenditures by predefined categories
    const categoryExpenditure =  categories.reduce((acc, category) => {
        const totalAmount = filteredActivities
            .filter(activity => activity.category === category)
            .reduce((sum, activity) => (sum + activity.amount), 0);
        acc[category] = totalAmount;
        return acc;
    }, {} as Record<string, number>);

     // Data for the Pie chart
     const pieData: ChartData<'pie'> = {
        labels: categories,
        datasets: [
            {
                data: categories.map(category => categoryExpenditure[category] || 0),
                backgroundColor: ["#EAB200","#4F4F4F", "#DEAC80", "#ADADAD", "#163E78", "#005EA4", ],
                hoverBackgroundColor: ["#EAB200","#4F4F4F", "#DEAC80", "#ADADAD", "#163E78", "#005EA4", ]
            }
        ]
    };

    const pieOptions: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                position: 'right' as const, // Position the legend on the right
                align: 'center',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw as number;
                        return `${label}: $${value.toFixed(2)}`;
                    }
                }
            }
        },
        maintainAspectRatio: false, // Allow control over height and width
    };

    return (
        <div className="mt-4 border border-gray-300  bg-[#EADBC8] p-6 rounded-md">
            <h2 className="text-lg font-bold mb-2">Expenditure by Category</h2>

            {/* Filter buttons */}
            <div className="mb-4">
                <button
                    onClick={() => setSelectedAccountType('All')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                    All Transactions
                </button>
                <button
                    onClick={() => setSelectedAccountType('Checking')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'Checking' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                    Checking
                </button>
                <button
                    onClick={() => setSelectedAccountType('Saving')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'Saving' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                    Saving
                </button>
                <button
                    onClick={() => setSelectedAccountType('Credit')}
                    className={`px-4 py-2 rounded ${selectedAccountType === 'Credit' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                    Credit
                </button>
            </div>
            <div className="mt-4 " style={{ height: '500px', width: '500px' }}>
                    <Pie data={pieData} options={pieOptions} />
            </div>
        </div>
        
    );
};

export default RecentActivities;