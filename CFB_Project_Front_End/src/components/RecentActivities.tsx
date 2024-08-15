import { Activity } from "../types/type";
import { useState } from "react";

type Props = {
    activities: Activity[];
};

const RecentActivities = ({ activities }: Props) => {
    
    // display only 10 latest activities
    const [visibleCount, setVisibleCount] = useState(10);

    //Filter for activities startrs here
    const [selectedAccountType, setSelectedAccountType] = useState<string | 'All'>('All');

    // Filter transactions based on selected account type
    const filteredActivities = selectedAccountType === 'All'
        ? activities
        : activities.filter(activity => activity.accountType === selectedAccountType);

    if (!filteredActivities || filteredActivities.length === 0) return <h1>No Activities.</h1>;
   
    // sort the filtedred activities based on date in descending order so latest activities will be visible on top
    const sortedActivities = [...filteredActivities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    //show the first 10 activities
    const visibleActivities = sortedActivities.slice(0, visibleCount);

    // load more function
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    return (
        <div className="mt-4 border border-gray-300  bg-[#EADBC8] p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Recent Activities</h2>

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

            <ul className="divide-y divide-gray-400">
                {visibleActivities.map((activity) => (
                <li key={activity.id} className="py-2">
                    <p className="text-sm">
                    <span className="font-semibold">Date:</span> {activity.date}
                    </p>
                    <p className="text-sm">
                    <span className="font-semibold">Description:</span> {activity.description}
                    </p>
                    <p className="text-sm">
                            <span className="font-semibold">Category:</span> {activity.category}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Amount:</span> ${activity.amount}
                        </p>   
                </li>
                ))}
            </ul>
            {visibleCount < sortedActivities.length && (
                <button 
                    onClick={loadMore} 
                    className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md"
                >
                    Load More
                </button>
            )}
        </div>
        
    );
};

export default RecentActivities;